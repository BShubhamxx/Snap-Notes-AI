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
        <div className="flex items-center gap-1">
            {actions
                .filter((action) => !action.hidden)
                .map((action) => {
                    const Icon = action.icon
                    return (
                        <button
                            key={action.id}
                            onClick={() => onAction(action.id)}
                            disabled={disabled}
                            className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed group relative"
                            title={action.description}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-medium hidden md:inline">{action.label}</span>
                            
                            {/* Tooltip */}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                {action.description}
                            </span>
                        </button>
                    )
                })}
        </div>
    )
}

export default ActionButtons
