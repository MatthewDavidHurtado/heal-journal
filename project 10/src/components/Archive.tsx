import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Search, AlertCircle, Trophy, Trash2, Edit2, Save, X } from 'lucide-react';
import { localStorageService } from '../lib/storage/localStorage';
import type { StorageEntry } from '../lib/storage/types';

interface ArchiveProps {
  showVictories?: boolean;
}

export function Archive({ showVictories = false }: ArchiveProps) {
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    try {
      const loadedEntries = localStorageService.getAllEntries();
      setEntries(loadedEntries);
    } catch (err: any) {
      setError(err.message || 'Failed to load entries');
    }
  };

  const handleDeleteEntry = (id: string) => {
    try {
      localStorageService.deleteEntry(id);
      loadEntries();
      setShowDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete entry');
    }
  };

  const handleEditEntry = (entry: StorageEntry) => {
    setEditingEntryId(entry.id);
    setEditContent(entry.content);
  };

  const handleSaveEdit = (entryId: string) => {
    try {
      const entry = entries.find(e => e.id === entryId);
      if (!entry) return;

      const updatedEntry = {
        ...entry,
        content: editContent.trim(),
        updatedAt: new Date().toISOString()
      };

      const updatedEntries = entries.map(e => 
        e.id === entryId ? updatedEntry : e
      );

      localStorage.setItem('heal_journal_entries', JSON.stringify(updatedEntries));
      loadEntries();
      setEditingEntryId(null);
      setEditContent('');
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    }
  };

  const filteredEntries = entries.filter(entry => {
    const searchLower = searchTerm.toLowerCase();
    
    if (showVictories) {
      return entry.victories?.some(victory => 
        victory.title.toLowerCase().includes(searchLower) ||
        victory.description.toLowerCase().includes(searchLower)
      );
    }
    
    return (
      entry.threadTitle.toLowerCase().includes(searchLower) ||
      entry.content.toLowerCase().includes(searchLower) ||
      entry.beliefs.some(belief => 
        belief.belief.toLowerCase().includes(searchLower) ||
        belief.howIsItALie.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          {showVictories ? (
            <>
              <Trophy className="w-6 h-6 text-yellow-500" />
              Victory Room
            </>
          ) : (
            <>
              <Calendar className="w-6 h-6" />
              Your Journey Archive
            </>
          )}
        </h2>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={showVictories ? "Search victories..." : "Search entries..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              {showVictories
                ? 'No victories found. Start celebrating your wins!'
                : 'No entries found. Start your healing journey today!'}
            </p>
          </div>
        ) : (
          filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-white p-6 rounded-lg shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {entry.threadTitle}
                </h3>
                <div className="flex items-center gap-4">
                  <time className="text-sm text-gray-500">
                    {format(new Date(entry.createdAt), 'PPP')}
                  </time>
                  {!showVictories && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {showDeleteConfirm === entry.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="px-2 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-2 py-1 bg-gray-200 text-gray-600 text-sm rounded-md hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(entry.id)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {!showVictories && (
                <>
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full bg-${entry.color}-500`} />
                    <span className="text-sm text-gray-500">Number: {entry.number}</span>
                  </div>

                  {editingEntryId === entry.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSaveEdit(entry.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingEntryId(null)}
                          className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                  )}

                  {entry.beliefs?.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Beliefs Explored:</h4>
                      {entry.beliefs.map((belief, index) => (
                        <div key={belief.id} className="ml-4 space-y-1">
                          <p className="text-gray-700">
                            {index + 1}. {belief.belief}
                          </p>
                          <p className="text-gray-600 ml-4">
                            → {belief.howIsItALie}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {entry.victories?.length > 0 && showVictories && (
                <div className="space-y-3">
                  {entry.victories.map((victory) => (
                    <div
                      key={victory.id}
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg"
                    >
                      <h4 className="font-medium text-gray-900">{victory.title}</h4>
                      <p className="text-gray-700 mt-2">{victory.description}</p>
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                        <span>{victory.category}</span>
                        <time>{format(new Date(victory.date), 'MMM d, yyyy')}</time>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}