import { useState, useCallback } from 'react';
import { tamboConfig, notePrompts, refinementPrompts } from '../config/tambo';

/**
 * Custom hook for Tambo AI integration
 * Handles note generation, format conversion, and refinement
 */
export function useTamboAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Call Tambo AI API
     */
    const callTamboAPI = useCallback(async (systemPrompt, userPrompt) => {
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
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt },
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (err) {
            console.error('Tambo API Error:', err);
            throw err;
        }
    }, []);

    /**
     * Generate notes from content
     */
    const generateNotes = useCallback(async (content, format = 'bullet') => {
        setIsLoading(true);
        setError(null);

        try {
            const prompt = notePrompts[format];
            if (!prompt) {
                throw new Error(`Invalid format: ${format}`);
            }

            const result = await callTamboAPI(
                prompt.system,
                prompt.template(content)
            );

            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, [callTamboAPI]);

    /**
     * Refine existing notes (make shorter or more detailed)
     */
    const refineNotes = useCallback(async (notes, refinementType) => {
        setIsLoading(true);
        setError(null);

        try {
            const prompt = refinementPrompts[refinementType];
            if (!prompt) {
                throw new Error(`Invalid refinement type: ${refinementType}`);
            }

            const result = await callTamboAPI(
                prompt.system,
                prompt.template(notes)
            );

            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, [callTamboAPI]);

    /**
     * Convert notes to different format
     */
    const convertFormat = useCallback(async (notes, targetFormat) => {
        setIsLoading(true);
        setError(null);

        try {
            const prompt = notePrompts[targetFormat];
            if (!prompt) {
                throw new Error(`Invalid target format: ${targetFormat}`);
            }

            // Use the notes as content for conversion
            const result = await callTamboAPI(
                prompt.system,
                prompt.template(notes)
            );

            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, [callTamboAPI]);

    return {
        generateNotes,
        refineNotes,
        convertFormat,
        isLoading,
        error,
    };
}

export default useTamboAI;
