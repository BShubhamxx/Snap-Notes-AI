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
        <div className="h-full flex flex-col relative">
            <textarea
                className="input-field flex-1 min-h-[150px] resize-none p-4 text-sm bg-neutral-50 border-neutral-200 focus:bg-white transition-colors"
                placeholder="Paste your text here..."
                value={value}
                onChange={handleChange}
                maxLength={maxLength}
            />
            
            {/* Character Counter & Clear */}
            <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-neutral-100">
                {charCount > 0 && (
                    <button
                        onClick={handleClear}
                        className="text-xs text-neutral-400 hover:text-red-500 transition-colors font-medium"
                    >
                        Clear
                    </button>
                )}
                <span className={`text-xs ${charCount > maxLength * 0.9 ? 'text-amber-500 font-semibold' : 'text-neutral-400'}`}>
                    {charCount.toLocaleString()} / {maxLength.toLocaleString()}
                </span>
            </div>
        </div>
    )
}

export default TextInput
