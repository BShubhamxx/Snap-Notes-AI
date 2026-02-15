import { PencilSquareIcon, QuestionMarkCircleIcon, RectangleStackIcon } from '@heroicons/react/24/outline'

const formats = [
    {
        id: 'bullet',
        name: 'Bullet',
        icon: PencilSquareIcon,
        description: 'Concise bullet-point notes',
    },
    {
        id: 'qa',
        name: 'Q&A',
        icon: QuestionMarkCircleIcon,
        description: 'Question and answer format',
    },
    {
        id: 'flashcard',
        name: 'Flashcards',
        icon: RectangleStackIcon,
        description: 'Front/back flashcard format',
    },
]

function FormatSelector({ selectedFormat, onFormatChange }) {
    return (
        <div className="flex gap-2">
            {formats.map((format) => {
                const Icon = format.icon
                const isSelected = selectedFormat === format.id

                return (
                    <button
                        key={format.id}
                        onClick={() => onFormatChange(format.id)}
                        className={`flex-1 py-2 px-1 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            isSelected
                                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                : 'border-neutral-200 bg-white text-neutral-500 hover:border-primary-300 hover:bg-neutral-50'
                        }`}
                        title={format.description}
                    >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-neutral-400'}`} />
                        <span className="text-xs font-medium">{format.name}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default FormatSelector
