import express, { Router, Response } from 'express';
import Conversation from '../models/Conversation';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import axios from 'axios';

const router: Router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Chat endpoint - send message and get AI response
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { message, conversationId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check for API key (prioritize OpenRouter, fallback to Google if configured)
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    
    if (!OPENROUTER_API_KEY && (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE')) {
      console.error('AI API key not configured!');
      return res.status(503).json({
        error: 'AI service is temporarily unavailable',
        response: "⚠️ The AI service is not configured. Please contact the administrator."
      });
    }

    let conversation;

    // Find or create conversation
    if (conversationId) {
      conversation = await Conversation.findOne({ _id: conversationId, userId });
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      // Create new conversation
      conversation = new Conversation({
        userId,
        messages: [],
      });
    }

    // Add user message to conversation
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });
    
    // Get recent chat history to provide context (last 5 messages)
    const history = conversation.messages.slice(-5).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Generate AI response
    let aiResponse: string;
    
    try {
      if (OPENROUTER_API_KEY) {
        console.log(`🔑 Using OpenRouter API Key: ${OPENROUTER_API_KEY.substring(0, 10)}...`);

        // Use OpenRouter's intelligent routing - it automatically picks available free models
        const models = [
          'openrouter/free', // Auto-routes to best available free model
          'qwen/qwen3-4b:free',
          'qwen/qwen3-coder:free',
        ];
        
        const MODEL_TIMEOUT = 25000; 

        let aiResponseFound = false;
        let lastError = null;

        for (const model of models) {
          try {
            console.log(`🤖 Attempting to use model: ${model}`);
            
            // Prepare messages - for some models, combine system message with user message
            let messages;
            if (model.includes('gemma-3')) {
              // Gemma 3 doesn't support system messages
              messages = [
                { 
                  role: 'user', 
                  content: `You are AssureAI, a professional and helpful insurance assistant. Answer this question: ${message}` 
                }
              ];
            } else {
              messages = [
                {
                  role: 'system',
                  content: `You are AssureAI, a professional and helpful insurance assistant. Your role is to answer questions about insurance policies, coverage, claims, and provide insurance-related advice. Be friendly, informative, and accurate. If you're not sure about something, be honest and suggest consulting with an insurance professional. Keep your answers concise.`
                },
                ...history,
                { role: 'user', content: message }
              ];
            }
            
            const response = await axios.post(
              'https://openrouter.ai/api/v1/chat/completions',
              {
                model: model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 500,
              },
              {
                headers: {
                  'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                  'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
                  'X-Title': 'AssureAI',
                  'Content-Type': 'application/json',
                },
                timeout: MODEL_TIMEOUT, 
              }
            );

            if (response.data?.choices?.[0]?.message?.content) {
              aiResponse = response.data.choices[0].message.content;
              aiResponseFound = true;
              console.log(`✅ Successfully generated response with model: ${model}`);
              break;
            }
          } catch (error: any) {
            console.warn(`⚠️ Failed with model ${model}:`, error.response?.data || error.message);
            lastError = error;
          }
        }

        if (!aiResponseFound) {
          throw lastError || new Error('All OpenRouter models failed or timed out');
        }

      } else {
        // Fallback to Google Gemini API
        if (!GOOGLE_API_KEY) throw new Error('Google API key not configured');

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`,
          {
            contents: [{
              parts: [{
                text: `You are AssureAI, a professional and helpful insurance assistant. Your role is to answer questions about insurance policies, coverage, claims, and provide insurance-related advice.

Be friendly, informative, and accurate. If you're not sure about something, be honest and suggest consulting with an insurance professional.

User Question: ${message}

Assistant Response:`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
          }
        );

        if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          aiResponse = response.data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('Invalid response format from Google AI');
        }
      }

    } catch (aiError: any) {
      console.error('AI generation error:', aiError.response?.data || aiError.message);
      
      // Fallback responses for common questions
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('claim') || lowerMessage.includes('file')) {
        aiResponse = "To file a claim, you typically need to: 1) Contact your insurance company immediately, 2) Gather all relevant documentation (receipts, photos, police reports if applicable), 3) Fill out the claim form provided by your insurer, and 4) Follow up regularly on your claim status. For specific guidance, please contact your insurance provider directly.";
      } else if (lowerMessage.includes('coverage') || lowerMessage.includes('policy')) {
        aiResponse = "Insurance coverage varies by policy type and provider. Common types include auto, home, health, and life insurance. Each policy has specific terms, deductibles, and coverage limits. I recommend reviewing your policy documents or contacting your insurance agent for detailed information about your specific coverage.";
      } else {
        aiResponse = "I apologize, but I'm having trouble generating a response right now. This might be due to high demand or a temporary service issue. Please try asking your question again in a moment, or contact your insurance provider directly for immediate assistance.";
      }
    }

    // Add AI response to conversation
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    });

    await conversation.save();

    res.json({
      response: aiResponse,
      conversationId: conversation._id,
      timestamp: new Date(),
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message', 
      details: error.message,
      response: "I apologize, but I encountered an error processing your request. Please try again."
    });
  }
});

// Get conversation history
router.get('/history', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    // Get the most recent conversation
    const conversation = await Conversation.findOne({ userId })
      .sort({ updatedAt: -1 });

    if (!conversation) {
      return res.json({ conversation: null });
    }

    res.json({
      conversation: {
        id: conversation._id,
        userId: conversation.userId,
        messages: conversation.messages,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history', details: error.message });
  }
});

// Delete conversation
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const result = await Conversation.deleteOne({ _id: id, userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error: any) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Failed to delete conversation', details: error.message });
  }
});

export default router;
