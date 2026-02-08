import { useState } from 'react'
import {
    SparklesIcon,
    DocumentTextIcon,
    PencilSquareIcon,
    ArrowDownTrayIcon,
    ClipboardDocumentIcon,
    DocumentArrowDownIcon,
    ScissorsIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    RectangleStackIcon,
    CheckCircleIcon,
    BoltIcon,
    AcademicCapIcon,
    DocumentPlusIcon,
} from '@heroicons/react/24/outline'
import {
    SparklesIcon as SparklesSolid,
    BoltIcon as BoltSolid,
} from '@heroicons/react/24/solid'

function Home() {
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
                                <PencilSquareIcon className="w-4 h-4 mr-1" />
                                Bullet Notes
                            </span>
                            <span className="badge">
                                <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
                                Q&A Format
                            </span>
                            <span className="badge">
                                <RectangleStackIcon className="w-4 h-4 mr-1" />
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
                            {/* Placeholder for TextInput */}
                            <div className="relative">
                                <textarea
                                    className="input-field min-h-[300px] resize-none"
                                    placeholder="Paste your text here or upload a PDF below...

Example: Copy lecture notes, articles, or study materials
Max 50,000 characters
Focus on exam-relevant content"
                                    disabled
                                />
                                <div className="absolute bottom-4 right-4 text-xs text-neutral-400">
                                    0 / 50,000
                                </div>
                            </div>

                            {/* Helper Text with Icons */}
                            <div className="space-y-2 text-sm text-neutral-500">
                                <div className="flex items-center gap-2">
                                    <BookOpenIcon className="w-4 h-4 text-primary-500" />
                                    <span>Example: Copy lecture notes, articles, or study materials</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BoltIcon className="w-4 h-4 text-amber-500" />
                                    <span>Max 50,000 characters</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AcademicCapIcon className="w-4 h-4 text-purple-500" />
                                    <span>Focus on exam-relevant content</span>
                                </div>
                            </div>

                            {/* Placeholder for PDF Upload */}
                            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer">
                                <DocumentPlusIcon className="w-12 h-12 mx-auto mb-2 text-neutral-400" />
                                <p className="text-sm font-medium text-neutral-700 mb-1">
                                    Drop PDF here or click to upload
                                </p>
                                <p className="text-xs text-neutral-500">
                                    Max 10MB • PDF only
                                </p>
                            </div>

                            {/* Format Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                                    Choose Format
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button className="p-5 rounded-xl border-2 border-primary-500 bg-primary-50 text-primary-700 font-medium hover:bg-primary-100 transition-all">
                                        <PencilSquareIcon className="w-8 h-8 mx-auto mb-2" />
                                        <div className="text-sm font-semibold">Bullet</div>
                                    </button>
                                    <button className="p-5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-600 font-medium hover:border-primary-300 hover:bg-primary-50 transition-all">
                                        <QuestionMarkCircleIcon className="w-8 h-8 mx-auto mb-2" />
                                        <div className="text-sm font-semibold">Q&A</div>
                                    </button>
                                    <button className="p-5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-600 font-medium hover:border-primary-300 hover:bg-primary-50 transition-all">
                                        <RectangleStackIcon className="w-8 h-8 mx-auto mb-2" />
                                        <div className="text-sm font-semibold">Flashcards</div>
                                    </button>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <button className="btn-primary w-full text-lg flex items-center justify-center gap-2">
                                <SparklesSolid className="w-5 h-5" />
                                Generate Notes
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

                        {/* Empty State */}
                        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200">
                            <SparklesIcon className="w-16 h-16 mb-4 text-primary-400 animate-pulse-slow" />
                            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                                Ready to Generate Notes
                            </h3>
                            <p className="text-neutral-500 max-w-sm">
                                Paste your content or upload a PDF, select a format, and click "Generate Notes" to get started!
                            </p>

                            {/* Feature List */}
                            <div className="mt-6 space-y-2 text-left">
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                    <span>AI-powered summarization</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                    <span>Exam-focused content</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                    <span>Multiple format options</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons Section */}
                <div className="card-glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-lg font-semibold text-neutral-700 mb-4 flex items-center gap-2">
                        <BoltIcon className="w-6 h-6 text-primary-600" />
                        Refine & Export
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <ScissorsIcon className="w-4 h-4" />
                            <span>Shorter</span>
                        </button>
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <BookOpenIcon className="w-4 h-4" />
                            <span>Detailed</span>
                        </button>
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <QuestionMarkCircleIcon className="w-4 h-4" />
                            <span>To Q&A</span>
                        </button>
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <RectangleStackIcon className="w-4 h-4" />
                            <span>Flashcards</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <ClipboardDocumentIcon className="w-4 h-4" />
                            <span>Copy</span>
                        </button>
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            <span>TXT</span>
                        </button>
                        <button className="btn-secondary flex items-center justify-center gap-2" disabled>
                            <DocumentArrowDownIcon className="w-4 h-4" />
                            <span>PDF</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 text-center">
                <p className="text-sm text-neutral-500">
                    Built with ❤️ using <span className="font-semibold text-primary-600">Tambo AI</span> •
                    <a href="https://github.com/BShubhamxx/Snap-Notes-AI" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-primary-600 transition-colors">
                        View on GitHub
                    </a>
                </p>
            </footer>
        </div>
    )
}

export default Home
