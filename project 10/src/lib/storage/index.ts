import type { JournalEntry, Belief, Victory } from '../../types';

const STORAGE_KEY = 'heal_journal_entries';

export interface StorageEntry extends JournalEntry {
  id: string;
  userId: string;
  threadTitle: string;
  color: string;
  number: number;
  content: string;
  beliefs: Belief[];
  victories?: Victory[];
  createdAt: string;
  updatedAt: string;
}

export const storage = {
  saveEntry: (entry: Omit<StorageEntry, 'id' | 'createdAt' | 'updatedAt'>): StorageEntry => {
    const entries = storage.getAllEntries();
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

  getAllEntries: (): StorageEntry[] => {
    const entriesJson = localStorage.getItem(STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  },

  deleteEntry: (id: string): void => {
    const entries = storage.getAllEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
  },

  exportData: (): string => {
    const entries = storage.getAllEntries();
    return JSON.stringify(entries, null, 2);
  },

  importData: (jsonData: string): boolean => {
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

  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};