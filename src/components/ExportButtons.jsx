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
        <div className="grid grid-cols-3 gap-3">
            <button
                onClick={handleCopy}
                disabled={disabled}
                className="btn-secondary flex items-center justify-center gap-2"
                title="Copy to clipboard"
            >
                {copied ? (
                    <>
                        <CheckIcon className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                    </>
                ) : (
                    <>
                        <ClipboardDocumentIcon className="w-4 h-4" />
                        <span>Copy</span>
                    </>
                )}
            </button>

            <button
                onClick={handleDownloadTXT}
                disabled={disabled}
                className="btn-secondary flex items-center justify-center gap-2"
                title="Download as TXT"
            >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>TXT</span>
            </button>

            <button
                onClick={handleDownloadPDF}
                disabled={disabled}
                className="btn-secondary flex items-center justify-center gap-2"
                title="Download as PDF"
            >
                <DocumentArrowDownIcon className="w-4 h-4" />
                <span>PDF</span>
            </button>
        </div>
    )
}

export default ExportButtons
