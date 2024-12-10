import type { StorageEntry, StorageService } from './types';

const STORAGE_KEY = 'heal_journal_entries';

export const localStorageService: StorageService = {
  saveEntry: (entry) => {
    const entries = localStorageService.getAllEntries();
    const newEntry: StorageEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  },

  getAllEntries: () => {
    try {
      const entriesJson = localStorage.getItem(STORAGE_KEY);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  deleteEntry: (id) => {
    const entries = localStorageService.getAllEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
  },

  exportData: () => {
    const entries = localStorageService.getAllEntries();
    return JSON.stringify(entries, null, 2);
  },

  importData: (jsonData) => {
    try {
      const entries = JSON.parse(jsonData);
      if (!Array.isArray(entries)) throw new Error('Invalid data format');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};