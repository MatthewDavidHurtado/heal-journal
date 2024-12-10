import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, ListChecks, ChevronDown, ChevronUp } from 'lucide-react';

interface Action {
  id: string;
  content: string;
  results: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'heal_daily_actions';

export function DailyActionList() {
  const [actions, setActions] = useState<Action[]>([]);
  const [newAction, setNewAction] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editingResults, setEditingResults] = useState<string | null>(null);
  const [results, setResults] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setActions(JSON.parse(stored));
    }
  }, []);

  const saveActions = (updatedActions: Action[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedActions));
    setActions(updatedActions);
  };

  const handleAdd = () => {
    if (!newAction.trim()) return;

    const newItem: Action = {
      id: crypto.randomUUID(),
      content: newAction.trim(),
      results: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveActions([...actions, newItem]);
    setNewAction('');
  };

  const handleEdit = (id: string) => {
    const action = actions.find(a => a.id === id);
    if (action) {
      setEditingId(id);
      setEditContent(action.content);
    }
  };

  const handleSaveEdit = () => {
    if (!editingId || !editContent.trim()) return;

    const updated = actions.map(a =>
      a.id === editingId
        ? { ...a, content: editContent.trim(), updatedAt: new Date().toISOString() }
        : a
    );

    saveActions(updated);
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (id: string) => {
    const updated = actions.filter(a => a.id !== id);
    saveActions(updated);
  };

  const handleEditResults = (id: string) => {
    const action = actions.find(a => a.id === id);
    if (action) {
      setEditingResults(id);
      setResults(action.results);
    }
  };

  const handleSaveResults = (id: string) => {
    const updated = actions.map(a =>
      a.id === id
        ? { ...a, results: results.trim(), updatedAt: new Date().toISOString() }
        : a
    );

    saveActions(updated);
    setEditingResults(null);
    setResults('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Daily Action List</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="Add a new action step..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleAdd}
                disabled={!newAction.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            <p className="text-sm text-gray-500 italic">
              Add your daily action steps to track your progress and document results
            </p>
          </div>

          <div className="space-y-4">
            {actions.map((action, index) => (
              <div
                key={action.id}
                className="space-y-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Step {index + 1}:</span>
                  {editingId === action.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-700">{action.content}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(action.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(action.id)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pl-4 border-l-2 border-indigo-100">
                  {editingResults === action.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={results}
                        onChange={(e) => setResults(e.target.value)}
                        placeholder="Document your results..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleSaveResults(action.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                        >
                          Save Results
                        </button>
                        <button
                          onClick={() => setEditingResults(null)}
                          className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleEditResults(action.id)}
                      className="cursor-pointer p-2 rounded-md hover:bg-white transition-colors"
                    >
                      {action.results ? (
                        <p className="text-gray-600">{action.results}</p>
                      ) : (
                        <p className="text-gray-400 italic">Click to add results...</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}