/**
 * Test Tambo AI Connection
 * Run this to verify the API key and connection work
 */

import { tamboConfig } from './config/tambo.js';

async function testTamboConnection() {
    console.log('🔍 Testing Tambo AI connection...');
    console.log('API Key:', tamboConfig.apiKey ? '✓ Configured' : '✗ Missing');

    if (!tamboConfig.apiKey) {
        console.error('❌ API key not found. Please check .env.local file.');
        return;
    }

    try {
        const response = await fetch(`${tamboConfig.baseURL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tamboConfig.apiKey}`,
            },
            body: JSON.stringify({
                model: tamboConfig.defaultModel,
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: 'Say "Hello from SnapNotes AI!" if you can read this.' },
                ],
                max_tokens: 50,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Connection successful!');
        console.log('Response:', data.choices[0].message.content);
        return true;
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        return false;
    }
}

// Run test if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testTamboConnection();
}

export default testTamboConnection;
