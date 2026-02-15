import { useState, useCallback } from 'react';
import { generateAIResponse } from '../services/ai';
import { notePrompts, refinementPrompts } from '../config/tambo';

export function useTamboAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Generate notes from content
     */
    const generateNotes = useCallback(async (content, format = 'bullet') => {
        setIsLoading(true);
        setError(null);

        try {
            const promptConfig = notePrompts[format];
            if (!promptConfig) throw new Error(`Invalid format: ${format}`);
            
            const systemPrompt = promptConfig.system;
            const userPrompt = promptConfig.template(content);
            const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

            const result = await generateAIResponse(fullPrompt);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Refine existing notes
     */
    const refineNotes = useCallback(async (notes, refinementType) => {
        setIsLoading(true);
        setError(null);

        try {
            const promptConfig = refinementPrompts[refinementType];
            if (!promptConfig) throw new Error(`Invalid refinement type: ${refinementType}`);

            const fullPrompt = `${promptConfig.system}\n\n${promptConfig.template(notes)}`;
            const result = await generateAIResponse(fullPrompt);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Convert format
     */
    const convertFormat = useCallback(async (notes, targetFormat) => {
        setIsLoading(true);
        setError(null);

        try {
            const promptConfig = notePrompts[targetFormat];
            if (!promptConfig) throw new Error(`Invalid target format: ${targetFormat}`);

            const fullPrompt = `${promptConfig.system}\n\n${promptConfig.template(notes)}`;
            const result = await generateAIResponse(fullPrompt);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Compatibility shim for Home.jsx if it still uses the old interface
    // but we updated Home.jsx to use requestGeneration? 
    // Wait, I should revert Home.jsx to use this clean interface too, it's much better.
    // For now, I'll export these clean functions.
    // I will check Home.jsx again to make sure it matches.

    return {
        generateNotes,
        refineNotes,
        convertFormat,
        isLoading,
        error,
    };
}

export default useTamboAI;
