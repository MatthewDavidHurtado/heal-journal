import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, AlertCircle, Loader2, Trophy } from 'lucide-react';
import { deleteJournalEntry } from '../lib/firebase';
import type { JournalEntry } from '../types';

interface TimelineEntryProps {
  entry: JournalEntry;
  onDelete: () => void;
}

export function TimelineEntry({ entry, onDelete }: TimelineEntryProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const getEntryDate = (entry: any): Date => {
    if (!entry.createdAt) return new Date();
    
    // Handle Firestore Timestamp
    if (entry.createdAt?.seconds) {
      return new Date(entry.createdAt.seconds * 1000);
    }
    
    // Handle string date
    if (typeof entry.createdAt === 'string') {
      return new Date(entry.createdAt);
    }
    
    // Handle Date object
    if (entry.createdAt instanceof Date) {
      return entry.createdAt;
    }
    
    return new Date();
  };

  const handleDelete = async () => {
    if (!entry.id) return;
    
    try {
      setIsDeleting(true);
      setError('');
      await deleteJournalEntry(entry.id);
      onDelete();
    } catch (err: any) {
      setError(err.message || 'Failed to delete entry');
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 transition-all hover:shadow-md relative">
      {error && (
        <div className="absolute top-2 right-2 flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-md text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {entry.threadTitle}
        </h3>
        <div className="flex items-center gap-4">
          <time className="text-sm text-gray-500">
            {format(getEntryDate(entry), 'EEEE, MMMM d, yyyy')}
          </time>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Delete entry"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className={`w-4 h-4 rounded-full bg-${entry.color}-500`} />
        <span className="text-sm text-gray-500">Number: {entry.number}</span>
      </div>
      
      <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
      
      {entry.beliefs?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Beliefs Explored:</h4>
          <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
            {entry.beliefs.map((belief, index) => (
              <div key={belief.id} className="space-y-1">
                <p className="text-gray-700 font-medium">
                  {index + 1}. {belief.belief}
                </p>
                <p className="text-gray-600">
                  → {belief.howIsItALie}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entry.victories?.length > 0 && (
        <div className="space-y-3 mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Victories Celebrated:
          </h4>
          <div className="space-y-3">
            {entry.victories.map((victory) => (
              <div key={victory.id} className="bg-white p-3 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{victory.title}</p>
                <p className="text-gray-600 mt-1">{victory.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span>{victory.category}</span>
                  <span>•</span>
                  <time>{format(new Date(victory.date), 'MMM d, yyyy')}</time>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}