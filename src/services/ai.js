
import { tamboConfig } from '../config/tambo';

/**
 * Direct call to Google Gemini API
 */
export async function generateAIResponse(prompt) {
    if (!tamboConfig.apiKey) {
        throw new Error('Gemini API Key is missing');
    }

    try {
        const url = `${tamboConfig.baseURL}/${tamboConfig.defaultModel}:generateContent?key=${tamboConfig.apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No content generated');
        }
    } catch (error) {
        console.error('AI Generation Failed:', error);
        throw error;
    }
}
