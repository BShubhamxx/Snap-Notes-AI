import { useState } from 'react'
import TextInput from '../components/TextInput'
// import { Generative } from "@tambo-ai/react";
import PDFUploader from '../components/PDFUploader'
import FormatSelector from '../components/FormatSelector'
import NotesOutput from '../components/NotesOutput'
import ActionButtons from '../components/ActionButtons'
import ExportButtons from '../components/ExportButtons'
import CopilotModal from '../components/CopilotModal'
import { useTamboAI } from '../hooks/useTamboAI'
import { saveNoteToHistory } from '../utils/localStorage'
import { 
    SparklesIcon as SparklesSolid, 
    ChatBubbleLeftRightIcon,
    DocumentTextIcon, 
    AcademicCapIcon 
} from '@heroicons/react/24/solid'
import { SparklesIcon } from '@heroicons/react/24/outline'

function Home() {
    const [inputText, setInputText] = useState('')
    const [pdfFile, setPdfFile] = useState(null)
    const [selectedFormat, setSelectedFormat] = useState('bullet')
    const [generatedNotes, setGeneratedNotes] = useState('')
    const [isCopilotOpen, setIsCopilotOpen] = useState(false)
    const [isExtracting, setIsExtracting] = useState(false)

    const { generateNotes, refineNotes, convertFormat, isLoading } = useTamboAI()

    const handleGenerate = async () => {
        if (!inputText && !pdfFile) {
            alert('Please enter text or upload a PDF first.')
            return
        }

        try {
            const notes = await generateNotes(inputText, selectedFormat)
            setGeneratedNotes(notes)
            saveNoteToHistory({ content: notes, format: selectedFormat })
        } catch (err) {
            console.error('Error generating notes:', err)
            alert(`Generation Failed: ${err.message}`) 
        }
    }

    const handleCopilotGenerate = async (generatedText) => {
        // Copilot now returns the generated text directly
        setGeneratedNotes(generatedText)
        saveNoteToHistory({ content: generatedText, format: 'copilot' })
    }

    const handleAction = async (actionType) => {
        if (!generatedNotes) return
        
        try {
            let result
            if (actionType === 'shorter' || actionType === 'detailed') {
                result = await refineNotes(generatedNotes, actionType)
            } else if (actionType === 'qa' || actionType === 'flashcard') {
                result = await convertFormat(generatedNotes, actionType)
                setSelectedFormat(actionType)
            }
            setGeneratedNotes(result)
            saveNoteToHistory({ content: result, format: selectedFormat })
        } catch (err) {
            console.error('Error processing action:', err)
            alert('Failed to process action')
        }
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
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
            {/* Minimal Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
                            <SparklesSolid className="w-5 h-5" />
                        </div>
                        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600">
                            SnapNotes AI
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                         <button className="text-sm font-medium text-neutral-500 hover:text-primary-600 transition-colors">
                            History
                         </button>
                         <div className="h-4 w-px bg-neutral-200"></div>
                         <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 border border-neutral-300">
                            <span className="text-xs font-bold">U</span>
                         </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="flex-1 container mx-auto px-4 md:px-6 py-6 max-w-[1600px]">
                <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-100px)] min-h-[600px]">
                    
                    {/* Left Panel - Content Input (Expanded Width: 5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-6 h-full">
                        <div className="bg-white p-6 shadow-sm border border-neutral-200 rounded-2xl flex-1 flex flex-col relative overflow-hidden group hover:border-primary-200 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                                    <DocumentTextIcon className="w-4 h-4" />
                                    Source Content
                                </h2>
                                {inputText && (
                                    <span className="text-xs text-neutral-400 font-medium px-2 py-1 bg-neutral-100 rounded-full">
                                        {inputText.length.toLocaleString()} chars
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                                <TextInput value={inputText} onChange={setInputText} />
                                
                                <div className="border-t border-neutral-100 pt-4">
                                     <PDFUploader 
                                        onFileSelect={handleFileSelect} 
                                        onFileRemove={handleFileRemove}
                                        onTextExtracted={handleTextExtracted}
                                        onExtractionStart={() => setIsExtracting(true)}
                                        onExtractionEnd={() => setIsExtracting(false)}
                                    />
                                </div>
                            </div>
                        </div>

                         {/* Control Bar (Moved from Sidebar bottom to standalone or just sticky) */}
                         <div className="bg-white p-4 shadow-sm border border-neutral-200 rounded-xl flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-neutral-700">Output Format</label>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <FormatSelector selectedFormat={selectedFormat} onFormatChange={setSelectedFormat} />
                                </div>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading || isExtracting || (!inputText && !pdfFile)}
                                    className="btn-primary py-2 px-6 rounded-xl shadow-lg shadow-primary-500/30 flex items-center gap-2 whitespace-nowrap"
                                >
                                    {isLoading || isExtracting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>{isExtracting ? 'Extracting...' : 'Processing...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <SparklesSolid className="w-5 h-5" />
                                            <span>Generate</span>
                                        </>
                                    )}
                                </button>
                            </div>
                         </div>
                    </div>

                    {/* Right Panel - Output (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col h-full bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden relative">
                        {/* Output Toolbar */}
                        <div className="border-b border-neutral-100 p-3 px-5 flex items-center justify-between bg-white z-10 sticky top-0">
                            <div className="flex items-center gap-2">
                                <AcademicCapIcon className="w-5 h-5 text-primary-500" />
                                <h2 className="text-base font-bold text-neutral-800">Generated Notes</h2>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="hidden md:block">
                                    <ActionButtons
                                        onAction={handleAction}
                                        disabled={!generatedNotes || isLoading}
                                        currentFormat={selectedFormat}
                                    />
                                </div>
                                <div className="h-5 w-px bg-neutral-200 hidden md:block"></div>
                                <ExportButtons 
                                    notes={generatedNotes || ''} 
                                    format={selectedFormat}
                                    disabled={!generatedNotes} 
                                />
                            </div>
                        </div>

                        {/* Notes Content */}
                        <div className="flex-1 overflow-y-auto bg-neutral-50/50 p-8 relative scroll-smooth">
                            {generatedNotes ? (
                                <NotesOutput notes={generatedNotes} format={selectedFormat} isLoading={isLoading} />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neutral-100 to-neutral-200 flex items-center justify-center mb-6 shadow-inner">
                                        <SparklesIcon className="w-10 h-10 text-neutral-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-700 mb-2">Ready to Create</h3>
                                    <p className="text-neutral-500 max-w-sm leading-relaxed">
                                        Import content on the left, or use the 
                                        <span className="font-semibold text-primary-600 mx-1">AI Assistant</span> 
                                        below to get started.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Assistant Button */}
            <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
                <button
                    onClick={() => setIsCopilotOpen(true)}
                    className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-75 duration-1000"></div>
                    <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
                    
                    {/* Tooltip Label */}
                    <span className="absolute right-full mr-4 bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                        Ask AI Assistant
                    </span>
                </button>
            </div>

            {/* Copilot Modal */}
            <CopilotModal 
                isOpen={isCopilotOpen} 
                onClose={() => setIsCopilotOpen(false)}
                onGenerate={handleCopilotGenerate}
                inputText={inputText}
            />

        </div>

    )
}

export default Home
