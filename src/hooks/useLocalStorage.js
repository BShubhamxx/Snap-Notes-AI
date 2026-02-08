import { useState, useEffect } from 'react';

/**
 * Custom hook for localStorage management
 * Saves and retrieves note history
 */
export function useLocalStorage(key, initialValue) {
    // Get from localStorage or use initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    // Save to localStorage whenever value changes
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    return [storedValue, setValue];
}

/**
 * Save note to history
 */
export function saveNoteToHistory(note) {
    try {
        const history = JSON.parse(localStorage.getItem('noteHistory') || '[]');
        const newNote = {
            id: Date.now(),
            content: note.content,
            format: note.format,
            timestamp: new Date().toISOString(),
        };

        history.unshift(newNote);

        // Keep only last 10 notes
        const trimmedHistory = history.slice(0, 10);
        localStorage.setItem('noteHistory', JSON.stringify(trimmedHistory));

        return newNote;
    } catch (error) {
        console.error('Error saving note to history:', error);
    }
}

/**
 * Get note history
 */
export function getNoteHistory() {
    try {
        return JSON.parse(localStorage.getItem('noteHistory') || '[]');
    } catch (error) {
        console.error('Error getting note history:', error);
        return [];
    }
}

/**
 * Clear note history
 */
export function clearNoteHistory() {
    try {
        localStorage.removeItem('noteHistory');
    } catch (error) {
        console.error('Error clearing note history:', error);
    }
}

export default useLocalStorage;
