import { useState, useRef } from 'react'
import { DocumentPlusIcon, XMarkIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { extractTextFromPDF } from '../utils/pdfParser'

function PDFUploader({ onFileSelect, onFileRemove, onTextExtracted, onExtractionStart, onExtractionEnd }) {
    const [file, setFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState(null)
    const [isExtracting, setIsExtracting] = useState(false)
    const [extractionProgress, setExtractionProgress] = useState(0)
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

    const handleFileSelect = async (selectedFile) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile)
            setIsExtracting(true)
            if (onExtractionStart) onExtractionStart()
            setExtractionProgress(0)

            try {
                // Extract text from PDF
                const text = await extractTextFromPDF(selectedFile, (page, total) => {
                    setExtractionProgress(Math.round((page / total) * 100))
                })

                onFileSelect(selectedFile)
                if (onTextExtracted) {
                    onTextExtracted(text)
                }
                setIsExtracting(false)
                if (onExtractionEnd) onExtractionEnd()
            } catch (err) {
                setError(err.message || 'Failed to extract text from PDF')
                setFile(null)
                setIsExtracting(false)
                if (onExtractionEnd) onExtractionEnd()
            }
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
                    onClick={!isExtracting ? handleClick : undefined}
                    className={`border border-dashed rounded-lg p-4 text-center transition-all ${
                        isExtracting ? 'cursor-wait bg-neutral-50' : 'cursor-pointer'
                    } ${
                        isDragging
                            ? 'border-primary-500 bg-primary-50'
                            : error
                            ? 'border-red-300 bg-red-50'
                            : 'border-neutral-200 hover:border-primary-400 hover:bg-neutral-50'
                    }`}
                >
                    {isExtracting ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
                            <span className="text-xs font-medium text-neutral-600">Extracting... {extractionProgress}%</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className={`p-2 rounded-full ${isDragging ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-400'}`}>
                                <DocumentPlusIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-600">
                                    {isDragging ? 'Drop PDF' : 'Upload PDF'}
                                </p>
                                <p className="text-[10px] text-neutral-400 mt-0.5">Max 10MB</p>
                            </div>
                            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                        </div>
                    )}
                </div>
            ) : (
                <div className="border border-primary-200 bg-primary-50/50 rounded-lg p-3 flex items-center justify-between group">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-white rounded-md shadow-sm text-primary-600">
                            <DocumentTextIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-neutral-800 truncate">{file.name}</p>
                            <p className="text-[10px] text-neutral-500">{formatFileSize(file.size)}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="p-1.5 hover:bg-red-100 text-neutral-400 hover:text-red-500 rounded-md transition-colors"
                        title="Remove file"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default PDFUploader
