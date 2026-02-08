import { useState } from 'react'
import {
    SparklesIcon,
    DocumentTextIcon,
    BoltIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline'
import {
    SparklesIcon as SparklesSolid,
    BoltIcon as BoltSolid,
} from '@heroicons/react/24/solid'

// Components
import TextInput from '../components/TextInput'
import PDFUploader from '../components/PDFUploader'
import FormatSelector from '../components/FormatSelector'
import NotesOutput from '../components/NotesOutput'
import ActionButtons from '../components/ActionButtons'
import ExportButtons from '../components/ExportButtons'

function Home() {
    const [inputText, setInputText] = useState('')
    const [pdfFile, setPdfFile] = useState(null)
    const [selectedFormat, setSelectedFormat] = useState('bullet')
    const [generatedNotes, setGeneratedNotes] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerate = async () => {
        if (!inputText && !pdfFile) {
            alert('Please enter text or upload a PDF')
            return
        }

        setIsLoading(true)
        // Placeholder for Tambo AI integration
        setTimeout(() => {
            setGeneratedNotes('Sample generated notes will appear here...')
            setIsLoading(false)
        }, 2000)
    }

    const handleAction = async (actionType) => {
        if (!generatedNotes) return

        setIsLoading(true)
        // Placeholder for refinement actions
        setTimeout(() => {
            setGeneratedNotes(`[${actionType}] ${generatedNotes}`)
            setIsLoading(false)
        }, 1500)
    }

    const handleFileSelect = (file) => {
        setPdfFile(file)
    }

    const handleFileRemove = () => {
        setPdfFile(null)
        setInputText('') // Clear input text when PDF is removed
    }

    const handleTextExtracted = (text) => {
        setInputText(text) // Populate input with extracted PDF text
    }

    return (
        <div className="min-h-screen">
            {/* Animated Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10"></div>

            {/* Header Section */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
                <div className="container mx-auto px-4 py-12 relative">
                    <div className="text-center max-w-4xl mx-auto animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6 border border-primary-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            <span className="text-sm font-medium text-neutral-700">Powered by Tambo AI</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
                            <span className="gradient-text">SnapNotes AI</span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-xl md:text-2xl text-neutral-600 mb-8 font-medium">
                            Turn Long Content into Exam-Ready Micro-Notes
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            <span className="badge">
                                <DocumentTextIcon className="w-4 h-4 mr-1" />
                                Bullet Notes
                            </span>
                            <span className="badge">
                                <SparklesIcon className="w-4 h-4 mr-1" />
                                Q&A Format
                            </span>
                            <span className="badge">
                                <AcademicCapIcon className="w-4 h-4 mr-1" />
                                Flashcards
                            </span>
                            <span className="badge">
                                <BoltSolid className="w-4 h-4 mr-1" />
                                AI-Powered
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Panel - Input */}
                    <div className="card-glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                                <DocumentTextIcon className="w-7 h-7 text-primary-600" />
                                Input
                            </h2>
                            <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                                Step 1
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Text Input Component */}
                            <TextInput value={inputText} onChange={setInputText} />

                            {/* PDF Uploader Component */}
                            <PDFUploader 
                                onFileSelect={handleFileSelect} 
                                onFileRemove={handleFileRemove}
                                onTextExtracted={handleTextExtracted}
                            />

                            {/* Format Selector Component */}
                            <FormatSelector selectedFormat={selectedFormat} onFormatChange={setSelectedFormat} />

                            {/* Generate Button */}
                            <button
                                onClick={handleGenerate}
                                disabled={isLoading || (!inputText && !pdfFile)}
                                className="btn-primary w-full text-lg flex items-center justify-center gap-2"
                            >
                                <SparklesSolid className="w-5 h-5" />
                                {isLoading ? 'Generating...' : 'Generate Notes'}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Output */}
                    <div className="card-glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                                <AcademicCapIcon className="w-7 h-7 text-primary-600" />
                                Your Notes
                            </h2>
                            <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                                Step 2
                            </span>
                        </div>

                        {/* Notes Output Component */}
                        <NotesOutput notes={generatedNotes} format={selectedFormat} isLoading={isLoading} />
                    </div>
                </div>

                {/* Action Buttons Section */}
                <div className="card-glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-lg font-semibold text-neutral-700 mb-4 flex items-center gap-2">
                        <BoltIcon className="w-6 h-6 text-primary-600" />
                        Refine & Export
                    </h3>

                    {/* Action Buttons Component */}
                    <div className="mb-4">
                        <ActionButtons
                            onAction={handleAction}
                            disabled={!generatedNotes || isLoading}
                            currentFormat={selectedFormat}
                        />
                    </div>

                    {/* Export Buttons Component */}
                    <ExportButtons notes={generatedNotes || ''} disabled={!generatedNotes} />
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 text-center">
                <p className="text-sm text-neutral-500">
                    Built with ❤️ using <span className="font-semibold text-primary-600">Tambo AI</span> •
                    <a
                        href="https://github.com/BShubhamxx/Snap-Notes-AI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 hover:text-primary-600 transition-colors"
                    >
                        View on GitHub
                    </a>
                </p>
            </footer>
        </div>
    )
}

export default Home
