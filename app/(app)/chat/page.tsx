'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load conversation history
    loadConversationHistory();
  }, []);

  const loadConversationHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

      const response = await fetch(`${apiUrl}/api/chat/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.conversation) {
          setConversationId(data.conversation.id);
          setMessages(data.conversation.messages.map((msg: any) => ({
            id: `${msg.timestamp}-${msg.role}`,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.timestamp),
          })));
        }
      }
    } catch (error) {
      console.error('Failed to load conversation history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Update conversation ID if new
      if (!conversationId && data.conversationId) {
        setConversationId(data.conversationId);
      }

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });

      // Add error message
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = async () => {
    if (!confirm('Are you sure you want to clear this conversation?')) return;

    try {
      if (conversationId) {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

        await fetch(`${apiUrl}/api/chat/${conversationId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      setMessages([]);
      setConversationId(null);

      toast({
        title: 'Success',
        description: 'Conversation cleared successfully',
      });
    } catch (error) {
      console.error('Error clearing conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear conversation',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <Card className="flex flex-col flex-1 shadow-xl border-0 m-2 sm:m-4 md:m-6 max-w-7xl mx-auto w-full overflow-hidden backdrop-blur-sm bg-white/95">
        <CardHeader className="border-b bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-3 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-md"></div>
                <div className="relative p-2 sm:p-2.5 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0 border border-white/20">
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl truncate text-white font-bold">
                  Chat Assistant
                </CardTitle>
                <p className="text-xs sm:text-sm text-white/80 mt-1 truncate font-medium">
                  ✨ Ask me anything about insurance
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              disabled={messages.length === 0}
              className="gap-2 flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Clear Chat</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-gradient-to-b from-slate-50/50 to-white">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 sm:space-y-6 px-2 animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative p-6 sm:p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                  <Bot className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-white" />
                </div>
              </div>
              <div className="space-y-3 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to AssureAI
                </h3>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Your intelligent insurance assistant powered by AI. Get instant answers to all your insurance questions!
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 sm:mt-8 w-full max-w-2xl">
                {[
                  { icon: "🏥", text: "What types of insurance do you offer?", prompt: "What types of insurance do you offer?" },
                  { icon: "📋", text: "How do I file a claim?", prompt: "How do I file a claim?" },
                  { icon: "💰", text: "Term vs whole life insurance?", prompt: "What is the difference between term and whole life insurance?" },
                  { icon: "🎯", text: "How much coverage do I need?", prompt: "How much coverage do I need?" },
                ].map((item, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="text-left justify-start h-auto p-4 sm:p-5 text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-purple-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 group"
                    onClick={() => setInput(item.prompt)}
                  >
                    <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="text-slate-700 group-hover:text-purple-700 font-medium">{item.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-3 sm:gap-4 animate-in slide-in-from-bottom-4 duration-300',
                    msg.role === 'user' && 'flex-row-reverse'
                  )}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Avatar className={cn(
                    'h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 border-2 flex-shrink-0 shadow-lg',
                    msg.role === 'assistant' 
                      ? 'border-purple-200 bg-gradient-to-br from-blue-600 to-purple-600' 
                      : 'border-blue-200 bg-gradient-to-br from-blue-500 to-cyan-500'
                  )}>
                    <AvatarFallback className="bg-transparent">
                      {msg.role === 'assistant' ? (
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      ) : (
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className={cn(
                    'flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[75%] space-y-2',
                    msg.role === 'user' && 'items-end'
                  )}>
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-md break-words transition-all hover:shadow-xl',
                        msg.role === 'assistant'
                          ? 'bg-white border-2 border-slate-100'
                          : 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-blue-500/50'
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 px-2 font-medium">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-3 sm:gap-4 animate-in slide-in-from-bottom-4 duration-300">
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 border-2 border-purple-200 flex-shrink-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border-2 border-slate-100 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-slate-600 font-medium">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </CardContent>

        <div className="border-t bg-white p-3 sm:p-4 md:p-5 shadow-2xl">
          <div className="flex gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                className="min-h-[56px] sm:min-h-[65px] max-h-[150px] sm:max-h-[200px] resize-none text-sm sm:text-base border-2 focus:border-purple-400 rounded-2xl shadow-sm pr-16 transition-all"
                disabled={loading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                size="lg"
                className="absolute right-2 bottom-2 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 sm:mt-3 text-center px-2">
            🔒 AI-powered responses • Please verify important information
          </p>
        </div>
      </Card>
    </div>
  );
}
