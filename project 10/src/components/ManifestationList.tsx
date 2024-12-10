import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Sparkles } from 'lucide-react';
import { localStorageService } from '../lib/storage/localStorage';

interface Manifestation {
  id: string;
  content: string;
  createdAt: string;
}

const STORAGE_KEY = 'heal_manifestations';
const EXAMPLE_MANIFESTATIONS = [
  "I'd like to manifest $10k/month as passive income",
  "I'd like to manifest my perfect body",
  "I'd like to manifest being in the perfect intimate relationship"
];

export function ManifestationList() {
  const [manifestations, setManifestations] = useState<Manifestation[]>([]);
  const [newManifestation, setNewManifestation] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setManifestations(JSON.parse(stored));
    }
  }, []);

  const saveManifestations = (updated: Manifestation[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setManifestations(updated);
  };

  const handleAdd = () => {
    if (!newManifestation.trim()) return;

    const newItem: Manifestation = {
      id: crypto.randomUUID(),
      content: newManifestation.trim(),
      createdAt: new Date().toISOString()
    };

    saveManifestations([...manifestations, newItem]);
    setNewManifestation('');
  };

  const handleEdit = (id: string) => {
    const manifestation = manifestations.find(m => m.id === id);
    if (manifestation) {
      setEditingId(id);
      setEditContent(manifestation.content);
    }
  };

  const handleSaveEdit = () => {
    if (!editingId || !editContent.trim()) return;

    const updated = manifestations.map(m =>
      m.id === editingId ? { ...m, content: editContent.trim() } : m
    );

    saveManifestations(updated);
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (id: string) => {
    const updated = manifestations.filter(m => m.id !== id);
    saveManifestations(updated);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-900">Manifestation List</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newManifestation}
            onChange={(e) => setNewManifestation(e.target.value)}
            placeholder={EXAMPLE_MANIFESTATIONS[Math.floor(Math.random() * EXAMPLE_MANIFESTATIONS.length)]}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleAdd}
            disabled={!newManifestation.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {manifestations.map((manifestation) => (
            <div
              key={manifestation.id}
              className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg group"
            >
              {editingId === manifestation.id ? (
                <>
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-gray-600 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-700">{manifestation.content}</span>
                  <button
                    onClick={() => handleEdit(manifestation.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(manifestation.id)}
                    className="p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}