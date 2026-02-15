# SnapNotes AI 📝

> Transform lengthy academic content into exam-ready micro-notes with AI-powered intelligence

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Overview

**SnapNotes AI** is an intelligent web application that helps students convert lengthy PDFs, articles, and notes into concise, exam-oriented micro-notes. Powered by Google Gemini AI, it generates notes in multiple formats—bullet points, Q&A, and flashcards—making exam preparation faster and more effective.

### Key Features

- **📄Multi-Input Support**: Paste text directly or upload PDF files (up to 10MB)
- **AI-Powered Generation**: Powered by Tambo AI for intelligent, structured summarization
- **Multiple Output Formats**:
  - Bullet Notes for quick scanning
  - Q&A format for self-testing
  - Flashcards for memorization
- **⚡Interactive Refinement**:
  - Make notes shorter or more detailed
  - Convert between formats instantly
- **Export Options**: Copy to clipboard or download as TXT or PDF
- **Exam-Focused Output**: Highlights key concepts, definitions, and important terms
- **No Account Required**: Start using immediately

##  Screenshots
<img width="1920" height="1080" alt="Screenshot From 2026-02-15 21-59-27" src="https://github.com/user-attachments/assets/8d24b0ea-4fbc-49ad-8f00-4a33feb8a586" />

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snapnotes-ai.git
   cd snapnotes-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Gemini AI API Key (Get from https://aistudio.google.com/apikey)
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Generating Notes from Text

1. **Paste your content** into the text area on the left panel
2. **Select your preferred format** (Bullet Notes, Q&A, or Flashcards)
3. **Click "Generate"** and wait for AI to process
4. **View your notes** in the right panel

### Uploading PDF Files

1. **Click "Upload PDF"** or drag-and-drop a PDF file
2. Wait for automatic text extraction
3. **Select format** and click "Generate"
4. Your notes will appear in seconds!

### Refining Your Notes

Use the action buttons to customize your notes:
- **Shorter**: Condense notes for quick revision
- **More Detailed**: Add examples and context
- **To Q&A**: Convert to question-answer format
- **Flashcards**: Transform into study cards

### Exporting Notes

- **Copy**: Click to copy formatted notes to clipboard
- **Download TXT**: Save as plain text file
- **Download PDF**: Export as formatted PDF document

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Styling and design system |
| **Google Gemini AI** | AI-powered note generation |
| **PDF.js** | PDF text extraction |
| **jsPDF** | PDF export functionality |
| **Heroicons** | Beautiful icon set |

## 📁 Project Structure

```
snapnotes-ai/
├── src/
│   ├── components/          # React components
│   │   ├── TextInput.jsx    # Text input area
│   │   ├── PDFUploader.jsx  # PDF upload handler
│   │   ├── FormatSelector.jsx
│   │   ├── NotesOutput.jsx  # Generated notes display
│   │   ├── ActionButtons.jsx
│   │   ├── ExportButtons.jsx
│   │   └── CopilotModal.jsx # AI assistant modal
│   ├── pages/
│   │   └── Home.jsx         # Main application page
│   ├── hooks/
│   │   ├── GoogleAPI.js    # AI integration logic
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── pdfParser.js     # PDF text extraction
│   │   ├── exportNotes.js   # Export functionality
│   │   └── localStorage.js  # Local storage management
│   ├── services/
│   │   └── ai.js            # Gemini API service
│   ├── config/
│   │   └── tambo.js         # AI configuration
│   ├── App.jsx
│   └── main.jsx
├── .env.local               # Environment variables
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Features in Detail

### AI-Powered Note Generation

SnapNotes AI uses Google Gemini's advanced language model to:
- Extract key concepts and definitions
- Identify exam-relevant information
- Maintain factual accuracy
- Generate concise, readable summaries

### PDF Processing

- Supports PDFs up to 10MB
- Extracts text from multi-page documents
- Shows real-time extraction progress
- Handles various PDF formats

### Smart Export

- **Copy to Clipboard**: Instant copy with formatting preserved
- **TXT Export**: Plain text for editing
- **PDF Export**: Professional formatting with metadata

## 🔧 Configuration

### Gemini AI Setup

The application uses Google Gemini 1.5 Pro by default. You can modify the model in `src/config/tambo.js`:

```javascript
export const geminiConfig = {
    apiKey: GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/models',
    defaultModel: 'gemini-1.5-pro',
    timeout: 30000,
};
```

### Customizing Note Prompts

Edit prompts in `src/config/tambo.js` to customize AI behavior:

```javascript
export const notePrompts = {
    bullet: "Convert this into concise bullet points...",
    qa: "Generate Q&A format...",
    flashcard: "Create flashcards..."
};
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Important**: Don't forget to add your `VITE_GEMINI_API_KEY` to your hosting platform's environment variables!

## 🐛 Known Issues

- Gemini API requires valid API key (get one free at [Google AI Studio](https://aistudio.google.com/apikey))
- PDF extraction may fail for image-based or encrypted PDFs
- Large PDFs (>10MB) are not supported

---

<div align="center">
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
