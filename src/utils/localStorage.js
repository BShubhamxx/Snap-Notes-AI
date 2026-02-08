/**
 * LocalStorage utility functions for note history management
 */

const STORAGE_KEYS = {
    NOTE_HISTORY: 'snapnotes_history',
    USER_PREFERENCES: 'snapnotes_preferences',
}

const MAX_HISTORY_ITEMS = 10

/**
 * Save a note to history
 * @param {Object} note - Note object { content, format, timestamp }
 * @returns {boolean} Success status
 */
export function saveNoteToHistory(note) {
    try {
        const history = getNoteHistory()

        const newNote = {
            id: Date.now(),
            content: note.content,
            format: note.format,
            timestamp: new Date().toISOString(),
            preview: note.content.substring(0, 100) + (note.content.length > 100 ? '...' : ''),
        }

        // Add to beginning of array
        history.unshift(newNote)

        // Keep only last MAX_HISTORY_ITEMS
        const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS)

        localStorage.setItem(STORAGE_KEYS.NOTE_HISTORY, JSON.stringify(trimmedHistory))
        return true
    } catch (error) {
        console.error('Error saving note to history:', error)
        return false
    }
}

/**
 * Get note history
 * @returns {Array} Array of note objects
 */
export function getNoteHistory() {
    try {
        const history = localStorage.getItem(STORAGE_KEYS.NOTE_HISTORY)
        return history ? JSON.parse(history) : []
    } catch (error) {
        console.error('Error getting note history:', error)
        return []
    }
}

/**
 * Get a specific note from history by ID
 * @param {number} noteId - Note ID
 * @returns {Object|null} Note object or null
 */
export function getNoteById(noteId) {
    try {
        const history = getNoteHistory()
        return history.find((note) => note.id === noteId) || null
    } catch (error) {
        console.error('Error getting note by ID:', error)
        return null
    }
}

/**
 * Delete a note from history
 * @param {number} noteId - Note ID to delete
 * @returns {boolean} Success status
 */
export function deleteNoteFromHistory(noteId) {
    try {
        const history = getNoteHistory()
        const updatedHistory = history.filter((note) => note.id !== noteId)
        localStorage.setItem(STORAGE_KEYS.NOTE_HISTORY, JSON.stringify(updatedHistory))
        return true
    } catch (error) {
        console.error('Error deleting note from history:', error)
        return false
    }
}

/**
 * Clear all note history
 * @returns {boolean} Success status
 */
export function clearNoteHistory() {
    try {
        localStorage.removeItem(STORAGE_KEYS.NOTE_HISTORY)
        return true
    } catch (error) {
        console.error('Error clearing note history:', error)
        return false
    }
}

/**
 * Save user preferences
 * @param {Object} preferences - Preferences object
 * @returns {boolean} Success status
 */
export function savePreferences(preferences) {
    try {
        const current = getPreferences()
        const updated = { ...current, ...preferences }
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated))
        return true
    } catch (error) {
        console.error('Error saving preferences:', error)
        return false
    }
}

/**
 * Get user preferences
 * @returns {Object} Preferences object
 */
export function getPreferences() {
    try {
        const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES)
        return prefs ? JSON.parse(prefs) : { defaultFormat: 'bullet', autoSave: true }
    } catch (error) {
        console.error('Error getting preferences:', error)
        return { defaultFormat: 'bullet', autoSave: true }
    }
}

/**
 * Get storage usage info
 * @returns {Object} { used: number, available: number, percentage: number }
 */
export function getStorageInfo() {
    try {
        let totalSize = 0
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length
            }
        }

        // LocalStorage limit is typically 5-10MB, we'll use 5MB as conservative estimate
        const limit = 5 * 1024 * 1024 // 5MB in bytes
        const used = totalSize * 2 // Each character is 2 bytes in UTF-16

        return {
            used,
            available: limit - used,
            percentage: Math.round((used / limit) * 100),
        }
    } catch (error) {
        console.error('Error getting storage info:', error)
        return { used: 0, available: 0, percentage: 0 }
    }
}

export default {
    saveNoteToHistory,
    getNoteHistory,
    getNoteById,
    deleteNoteFromHistory,
    clearNoteHistory,
    savePreferences,
    getPreferences,
    getStorageInfo,
}
