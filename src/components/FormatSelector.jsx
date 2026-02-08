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
        <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Choose Format
            </label>
            <div className="grid grid-cols-3 gap-3">
                {formats.map((format) => {
                    const Icon = format.icon
                    const isSelected = selectedFormat === format.id

                    return (
                        <button
                            key={format.id}
                            onClick={() => onFormatChange(format.id)}
                            className={`p-5 rounded-xl border-2 font-medium transition-all ${
                                isSelected
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50'
                            }`}
                            title={format.description}
                        >
                            <Icon className="w-8 h-8 mx-auto mb-2" />
                            <div className="text-sm font-semibold">{format.name}</div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default FormatSelector
