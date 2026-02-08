// Tambo AI Configuration
const TAMBO_API_KEY = import.meta.env.VITE_TAMBO_API_KEY;

if (!TAMBO_API_KEY) {
    console.error('⚠️ VITE_TAMBO_API_KEY is not set in .env.local');
}

export const tamboConfig = {
    apiKey: TAMBO_API_KEY,
    baseURL: 'https://api.tambo.co',
    defaultModel: 'gpt-5.2',
    timeout: 30000, // 30 seconds
};

// Note generation prompts
export const notePrompts = {
    bullet: {
        system: 'You are an expert at creating concise, exam-focused bullet-point notes from academic content.',
        template: (content) => `
Convert the following content into concise bullet-point notes suitable for exam revision.
Focus on:
- Key definitions and concepts
- Important formulas or principles
- Critical examples
- Exam-relevant information

Keep it brief and scannable. Use clear, simple language.

Content:
${content}

Generate bullet-point notes:
    `.trim(),
    },

    qa: {
        system: 'You are an expert at creating Q&A study materials from academic content.',
        template: (content) => `
Convert the following content into Q&A format for exam preparation.
Create questions that:
- Test understanding of key concepts
- Cover important definitions
- Include application-based questions
- Are exam-style questions

Format each as:
Q: [Question]
A: [Detailed Answer]

Content:
${content}

Generate Q&A pairs:
    `.trim(),
    },

    flashcard: {
        system: 'You are an expert at creating flashcards for effective memorization.',
        template: (content) => `
Convert the following content into flashcard format.
Each flashcard should have:
- FRONT: A question, term, or concept
- BACK: The answer, definition, or explanation

Keep answers concise but complete. Focus on memorization-friendly content.

Format as:
FRONT: [Question/Term]
BACK: [Answer/Definition]
---

Content:
${content}

Generate flashcards:
    `.trim(),
    },
};

// Refinement prompts
export const refinementPrompts = {
    shorter: {
        system: 'You are an expert at condensing information while preserving key points.',
        template: (notes) => `
Make the following notes shorter and more concise (reduce by ~30%).
Keep only the most essential information.
Maintain clarity and exam-relevance.

Current notes:
${notes}

Condensed version:
    `.trim(),
    },

    detailed: {
        system: 'You are an expert at expanding notes with helpful context and examples.',
        template: (notes) => `
Expand the following notes with more detail, context, and examples.
Add explanations that aid understanding.
Keep it exam-focused and clear.

Current notes:
${notes}

Detailed version:
    `.trim(),
    },
};

export default tamboConfig;
