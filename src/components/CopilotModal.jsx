import { useState, useRef, useEffect } from 'react'
import { generateAIResponse } from '../services/ai'
import { 
    PaperAirplaneIcon, 
    XMarkIcon, 
    SparklesIcon,
    PaperClipIcon
} from '@heroicons/react/24/outline'
import { SparklesIcon as SparklesSolid } from '@heroicons/react/24/solid'

function CopilotModal({ isOpen, onClose, onGenerate, inputText }) {
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim() || isLoading) return
        
        setIsLoading(true)
        
        try {
            // Append context if available
            const fullPrompt = inputText 
                ? `${prompt}\n\nContext:\n${inputText}`
                : prompt;

            const text = await generateAIResponse(fullPrompt);
            
            onGenerate(text) 
            setPrompt('')
            setIsLoading(false)
            onClose()
        } catch (error) {
            console.error('Copilot Error:', error);
            alert('Failed to generate response');
            setIsLoading(false);
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity" 
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
                    {/* Header Bar */}
                    <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary-600 font-semibold">
                            <SparklesSolid className="w-5 h-5" />
                            <span>SnapNotes Copilot</span>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="relative">
                                <textarea
                                    ref={inputRef}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder={inputText ? "Ask me to reorganize, summarize, or quiz you on this content..." : "Describe what you want to learn or paste content here..."}
                                    className="w-full min-h-[100px] p-4 text-lg border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none bg-neutral-50 focus:bg-white transition-all placeholder:text-neutral-400"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSubmit(e)
                                        }
                                    }}
                                />
                                
                                {/* Toolbar inside input */}
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button type="button" className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Attach file">
                                            <PaperClipIcon className="w-5 h-5" />
                                        </button>
                                        <button type="button" className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="AI Tone">
                                            <SparklesIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={!prompt.trim() || isLoading}
                                        className="btn-primary p-2 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                    >
                                        {isLoading ? 'Thinking...' : (
                                            <>
                                                <span>Run</span>
                                                <PaperAirplaneIcon className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Suggestions */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <SuggestionBadge onClick={() => setPrompt("Create a summary of the uploaded text")} text="📝 Create Summary" />
                            <SuggestionBadge onClick={() => setPrompt("Generate 5 practice questions")} text="❓ Generate Quiz" />
                            <SuggestionBadge onClick={() => setPrompt("Explain the key concepts simply")} text="💡 Explain Concepts" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function SuggestionBadge({ text, onClick }) {
    return (
        <button 
            onClick={onClick}
            className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all shadow-sm"
        >
            {text}
        </button>
    )
}

export default CopilotModal
