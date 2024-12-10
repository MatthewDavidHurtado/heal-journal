import type { JournalEntry, Belief, Victory } from '../../types';

export interface StorageEntry extends JournalEntry {
  id: string;
  threadTitle: string;
  color: string;
  number: number;
  content: string;
  beliefs: Belief[];
  victories?: Victory[];
  createdAt: string;
  updatedAt: string;
}

export interface StorageService {
  saveEntry: (entry: Omit<StorageEntry, 'id' | 'createdAt' | 'updatedAt'>) => StorageEntry;
  getAllEntries: () => StorageEntry[];
  deleteEntry: (id: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  clearAll: () => void;
}