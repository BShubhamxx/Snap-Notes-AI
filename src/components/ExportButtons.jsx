import { useState } from 'react'
import {
    ClipboardDocumentIcon,
    ArrowDownTrayIcon,
    DocumentArrowDownIcon,
    CheckIcon,
} from '@heroicons/react/24/outline'
import { copyToClipboard, downloadTXT, downloadPDF, formatTextForExport } from '../utils/exportNotes'

function ExportButtons({ notes, format = 'bullet', disabled = false }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const formattedText = formatTextForExport(notes, format)
        const success = await copyToClipboard(formattedText)

        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } else {
            alert('Failed to copy to clipboard')
        }
    }

    const handleDownloadTXT = () => {
        const formattedText = formatTextForExport(notes, format)
        downloadTXT(formattedText)
    }

    const handleDownloadPDF = () => {
        downloadPDF(notes, format)
    }

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={handleCopy}
                disabled={disabled}
                className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed group relative"
                title="Copy to clipboard"
            >
                {copied ? (
                    <>
                        <CheckIcon className="w-5 h-5 text-green-600" />
                        <span className="text-xs font-medium text-green-600 hidden md:inline">Copied!</span>
                    </>
                ) : (
                    <>
                        <ClipboardDocumentIcon className="w-5 h-5" />
                        <span className="text-xs font-medium hidden md:inline">Copy</span>
                    </>
                )}
                
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    Copy
                </span>
            </button>

            <button
                onClick={handleDownloadTXT}
                disabled={disabled}
                className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed group relative"
                title="Download as TXT"
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span className="text-xs font-medium hidden md:inline">TXT</span>
                
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    TXT
                </span>
            </button>

            <button
                onClick={handleDownloadPDF}
                disabled={disabled}
                className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed group relative"
                title="Download as PDF"
            >
                <DocumentArrowDownIcon className="w-5 h-5" />
                <span className="text-xs font-medium hidden md:inline">PDF</span>
                
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    PDF
                </span>
            </button>
        </div>
    )
}

export default ExportButtons
