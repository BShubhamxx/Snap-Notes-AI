import { useState } from 'react'
import { BoltIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

function TextInput({ value, onChange, maxLength = 50000 }) {
    const [charCount, setCharCount] = useState(0)

    const handleChange = (e) => {
        const text = e.target.value
        if (text.length <= maxLength) {
            setCharCount(text.length)
            onChange(text)
        }
    }

    const handleClear = () => {
        setCharCount(0)
        onChange('')
    }

    return (
        <div className="space-y-4">
            {/* Text Area */}
            <div className="relative">
                <textarea
                    className="input-field min-h-[300px] resize-none"
                    placeholder="Paste your text here or upload a PDF below...

Example: Copy lecture notes, articles, or study materials
Max 50,000 characters
Focus on exam-relevant content"
                    value={value}
                    onChange={handleChange}
                    maxLength={maxLength}
                />
                
                {/* Character Counter */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    {charCount > 0 && (
                        <button
                            onClick={handleClear}
                            className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    <span className={`text-xs ${charCount > maxLength * 0.9 ? 'text-amber-500 font-semibold' : 'text-neutral-400'}`}>
                        {charCount.toLocaleString()} / {maxLength.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Helper Text with Icons */}
            <div className="space-y-2 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4 text-primary-500" />
                    <span>Example: Copy lecture notes, articles, or study materials</span>
                </div>
                <div className="flex items-center gap-2">
                    <BoltIcon className="w-4 h-4 text-amber-500" />
                    <span>Max {maxLength.toLocaleString()} characters</span>
                </div>
                <div className="flex items-center gap-2">
                    <AcademicCapIcon className="w-4 h-4 text-purple-500" />
                    <span>Focus on exam-relevant content</span>
                </div>
            </div>
        </div>
    )
}

export default TextInput
