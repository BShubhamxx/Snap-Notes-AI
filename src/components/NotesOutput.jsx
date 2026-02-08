import { SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function NotesOutput({ notes, format, isLoading }) {
    if (isLoading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
                <p className="text-neutral-600 font-medium">Generating your notes...</p>
                <p className="text-sm text-neutral-500 mt-2">This may take a few seconds</p>
            </div>
        )
    }

    if (!notes) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200">
                <SparklesIcon className="w-16 h-16 mb-4 text-primary-400 animate-pulse-slow" />
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">Ready to Generate Notes</h3>
                <p className="text-neutral-500 max-w-sm">
                    Paste your content or upload a PDF, select a format, and click "Generate Notes" to get started!
                </p>

                {/* Feature List */}
                <div className="mt-6 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span>AI-powered summarization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span>Exam-focused content</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span>Multiple format options</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[400px] p-6 bg-white rounded-xl border border-neutral-200">
            <div className="prose prose-sm max-w-none">
                {format === 'bullet' && <BulletNotesFormat notes={notes} />}
                {format === 'qa' && <QAFormat notes={notes} />}
                {format === 'flashcard' && <FlashcardFormat notes={notes} />}
            </div>
        </div>
    )
}

// Bullet Notes Format
function BulletNotesFormat({ notes }) {
    return (
        <div className="space-y-3">
            {notes.split('\n').map((line, index) => {
                const trimmedLine = line.trim()
                if (!trimmedLine) return null

                // Check if it's a bullet point
                if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                    return (
                        <div key={index} className="flex gap-2">
                            <span className="text-primary-600 font-bold">•</span>
                            <span className="text-neutral-700">{trimmedLine.substring(1).trim()}</span>
                        </div>
                    )
                }

                // Regular line (heading or paragraph)
                return (
                    <p key={index} className="text-neutral-800 font-medium">
                        {trimmedLine}
                    </p>
                )
            })}
        </div>
    )
}

// Q&A Format
function QAFormat({ notes }) {
    const qaItems = notes.split(/Q:|A:/).filter((item) => item.trim())
    const pairs = []

    for (let i = 0; i < qaItems.length; i += 2) {
        if (qaItems[i] && qaItems[i + 1]) {
            pairs.push({
                question: qaItems[i].trim(),
                answer: qaItems[i + 1].trim(),
            })
        }
    }

    return (
        <div className="space-y-4">
            {pairs.map((pair, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                    <p className="font-semibold text-neutral-800 mb-2">
                        <span className="text-primary-600">Q:</span> {pair.question}
                    </p>
                    <p className="text-neutral-700">
                        <span className="text-green-600 font-semibold">A:</span> {pair.answer}
                    </p>
                </div>
            ))}
        </div>
    )
}

// Flashcard Format
function FlashcardFormat({ notes }) {
    const flashcards = notes.split('---').filter((card) => card.trim())

    return (
        <div className="grid gap-4">
            {flashcards.map((card, index) => {
                const [front, back] = card.split(/FRONT:|BACK:/).filter((item) => item.trim())

                return (
                    <div key={index} className="border border-neutral-300 rounded-lg overflow-hidden">
                        <div className="bg-primary-50 p-4 border-b border-neutral-300">
                            <p className="text-xs font-semibold text-primary-700 mb-1">FRONT</p>
                            <p className="text-neutral-800 font-medium">{front?.trim() || 'N/A'}</p>
                        </div>
                        <div className="bg-white p-4">
                            <p className="text-xs font-semibold text-green-700 mb-1">BACK</p>
                            <p className="text-neutral-700">{back?.trim() || 'N/A'}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NotesOutput
