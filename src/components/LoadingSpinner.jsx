function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
    const sizeClasses = {
        sm: 'h-6 w-6 border-2',
        md: 'h-12 w-12 border-4',
        lg: 'h-16 w-16 border-4',
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`animate-spin rounded-full border-primary-500 border-t-transparent ${sizeClasses[size]}`}
            ></div>
            {message && <p className="text-sm text-neutral-600 font-medium">{message}</p>}
        </div>
    )
}

export default LoadingSpinner
