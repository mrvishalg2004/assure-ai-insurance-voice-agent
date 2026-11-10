import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';

// Load from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BOLNA_API_KEY = process.env.BOLNA_API_KEY;
const BOLNA_AGENT_ID = process.env.BOLNA_AGENT_ID;

console.log('API Key config:', BOLNA_API_KEY ? 'Present' : 'Missing');
console.log('Agent ID config:', BOLNA_AGENT_ID);

async function testBolna() {
  try {
    const formattedPhone = process.env.TEST_PHONE_NUMBER || '+919876543210'; // Replace with your test number
    
    console.log(`Triggering Bolna call to ${formattedPhone}...`);
    
    const payload = {
      agent_id: BOLNA_AGENT_ID,
      recipient_phone_number: formattedPhone,
      user_data: {
        contactName: 'Test Name'
      }
    };
    
    console.log('Payload:', JSON.stringify(payload, null, 2));
    
    const response = await axios.post(
      'https://api.bolna.ai/call',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${BOLNA_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    const callId = response.data.execution_id || response.data.call_id;
    if (callId) {
      console.log(`\nWaiting 10 seconds before checking status for ${callId}...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      const statusRes = await axios.get(
        `https://api.bolna.ai/executions/${callId}`,
        {
          headers: {
            'Authorization': `Bearer ${BOLNA_API_KEY}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log('Status Response data:', JSON.stringify(statusRes.data, null, 2));
    }
  } catch (error) {
    console.error('API call failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

testBolna();
