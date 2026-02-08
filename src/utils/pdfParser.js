import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker - using a stable, verified version
// Note: Using hardcoded version to avoid 404 errors with newer versions
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

/**
 * Extract text from a PDF file
 * @param {File} file - PDF file object
 * @param {Function} onProgress - Optional progress callback (page, totalPages)
 * @returns {Promise<string>} Extracted text content
 */
export async function extractTextFromPDF(file, onProgress = null) {
    try {
        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer()

        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
        const pdf = await loadingTask.promise

        const totalPages = pdf.numPages
        let fullText = ''

        // Extract text from each page
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            try {
                const page = await pdf.getPage(pageNum)
                const textContent = await page.getTextContent()

                // Combine text items with proper spacing
                const pageText = textContent.items
                    .map((item) => {
                        // Handle text items
                        if (item.str) {
                            return item.str
                        }
                        return ''
                    })
                    .join(' ')
                    .replace(/\s+/g, ' ') // Normalize whitespace

                fullText += pageText + '\n\n'

                // Call progress callback if provided
                if (onProgress) {
                    onProgress(pageNum, totalPages)
                }
            } catch (pageError) {
                console.warn(`Error extracting page ${pageNum}:`, pageError)
                // Continue with other pages even if one fails
            }
        }

        const trimmedText = fullText.trim()
        
        if (!trimmedText) {
            throw new Error('No text could be extracted from this PDF. It may be image-based or encrypted.')
        }

        return trimmedText
    } catch (error) {
        console.error('Error extracting text from PDF:', error)
        
        // Provide more specific error messages
        if (error.message && error.message.includes('Invalid PDF')) {
            throw new Error('Invalid PDF file. Please ensure the file is not corrupted.')
        } else if (error.message && error.message.includes('password')) {
            throw new Error('This PDF is password-protected. Please use an unprotected PDF.')
        } else if (error.message && error.message.includes('No text')) {
            throw error // Re-throw our custom message
        } else {
            throw new Error('Failed to extract text from PDF. The file may be image-based or corrupted.')
        }
    }
}

/**
 * Validate PDF file
 * @param {File} file - File to validate
 * @returns {Object} { valid: boolean, error: string | null }
 */
export function validatePDF(file) {
    if (!file) {
        return { valid: false, error: 'No file provided' }
    }

    if (file.type !== 'application/pdf') {
        return { valid: false, error: 'File must be a PDF' }
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
        return { valid: false, error: 'File size must be less than 10MB' }
    }

    return { valid: true, error: null }
}

export default { extractTextFromPDF, validatePDF }
