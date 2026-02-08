import { useState } from 'react'
import {
    ClipboardDocumentIcon,
    ArrowDownTrayIcon,
    DocumentArrowDownIcon,
    CheckIcon,
} from '@heroicons/react/24/outline'

function ExportButtons({ notes, disabled = false }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(notes)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.error('Failed to copy:', error)
            alert('Failed to copy to clipboard')
        }
    }

    const handleDownloadTXT = () => {
        const blob = new Blob([notes], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `snapnotes-${Date.now()}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handleDownloadPDF = () => {
        // Placeholder for PDF export - will implement with jsPDF later
        alert('PDF export coming soon! For now, use Copy or TXT download.')
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
