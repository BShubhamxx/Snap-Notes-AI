import {
    ScissorsIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    RectangleStackIcon,
} from '@heroicons/react/24/outline'

function ActionButtons({ onAction, disabled = false, currentFormat }) {
    const actions = [
        {
            id: 'shorter',
            label: 'Shorter',
            icon: ScissorsIcon,
            description: 'Make notes more concise',
        },
        {
            id: 'detailed',
            label: 'Detailed',
            icon: BookOpenIcon,
            description: 'Add more details and examples',
        },
        {
            id: 'qa',
            label: 'To Q&A',
            icon: QuestionMarkCircleIcon,
            description: 'Convert to Q&A format',
            hidden: currentFormat === 'qa',
        },
        {
            id: 'flashcard',
            label: 'Flashcards',
            icon: RectangleStackIcon,
            description: 'Convert to flashcard format',
            hidden: currentFormat === 'flashcard',
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {actions
                .filter((action) => !action.hidden)
                .map((action) => {
                    const Icon = action.icon
                    return (
                        <button
                            key={action.id}
                            onClick={() => onAction(action.id)}
                            disabled={disabled}
                            className="btn-secondary flex items-center justify-center gap-2"
                            title={action.description}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{action.label}</span>
                        </button>
                    )
                })}
        </div>
    )
}

export default ActionButtons
