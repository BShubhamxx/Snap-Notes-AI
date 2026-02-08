import { useState, useRef } from 'react'
import { DocumentPlusIcon, XMarkIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

function PDFUploader({ onFileSelect, onFileRemove }) {
    const [file, setFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

    const validateFile = (file) => {
        // Check file type
        if (file.type !== 'application/pdf') {
            setError('Only PDF files are allowed')
            return false
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            setError('File size must be less than 10MB')
            return false
        }

        setError(null)
        return true
    }

    const handleFileSelect = (selectedFile) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile)
            onFileSelect(selectedFile)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            handleFileSelect(droppedFile)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleInputChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            handleFileSelect(selectedFile)
        }
    }

    const handleRemove = () => {
        setFile(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        onFileRemove()
    }

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleInputChange}
                className="hidden"
            />

            {!file ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                        isDragging
                            ? 'border-primary-500 bg-primary-100'
                            : error
                            ? 'border-red-300 bg-red-50'
                            : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50/50'
                    }`}
                >
                    <DocumentPlusIcon className={`w-12 h-12 mx-auto mb-2 ${error ? 'text-red-400' : 'text-neutral-400'}`} />
                    <p className="text-sm font-medium text-neutral-700 mb-1">
                        {isDragging ? 'Drop PDF here' : 'Drop PDF here or click to upload'}
                    </p>
                    <p className="text-xs text-neutral-500">Max 10MB • PDF only</p>
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </div>
            ) : (
                <div className="border-2 border-primary-300 bg-primary-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <DocumentTextIcon className="w-8 h-8 text-primary-600" />
                            <div>
                                <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                                <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleRemove}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                            title="Remove file"
                        >
                            <XMarkIcon className="w-5 h-5 text-neutral-500 group-hover:text-red-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PDFUploader
