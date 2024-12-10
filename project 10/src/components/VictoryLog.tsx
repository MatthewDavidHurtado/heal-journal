import React, { useState } from 'react';
import { Trophy, Star, Plus, X, Calendar, Sparkles } from 'lucide-react';
import type { Victory, VictoryCategory } from '../types';

interface VictoryLogProps {
  victories: Victory[];
  onAddVictory: (victory: Omit<Victory, 'id'>) => void;
}

const categories: { id: VictoryCategory; label: string; emoji: string }[] = [
  { id: 'spiritual', label: 'Spiritual Growth', emoji: '🙏' },
  { id: 'personal', label: 'Personal Achievement', emoji: '⭐' },
  { id: 'relationships', label: 'Relationships', emoji: '❤️' },
  { id: 'health', label: 'Health & Wellness', emoji: '💪' },
  { id: 'career', label: 'Career & Goals', emoji: '📈' },
  { id: 'other', label: 'Other Blessings', emoji: '✨' }
];

export function VictoryLog({ victories, onAddVictory }: VictoryLogProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<VictoryCategory>('spiritual');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddVictory({
      title: title.trim(),
      description: description.trim(),
      category,
      date
    });

    setTitle('');
    setDescription('');
    setCategory('spiritual');
    setShowForm(false);
  };

  const renderVictoryForm = () => {
    if (!showForm) return null;

    return (
      <div className="space-y-6 bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Victory Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you grateful for today?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share the details of your victory or blessing..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent h-32"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VictoryCategory)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {categories.map(({ id, label, emoji }) => (
                <option key={id} value={id}>
                  {emoji} {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          <Sparkles className="w-5 h-5" />
          Save Victory
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 rounded-xl p-8 shadow-lg border border-yellow-100">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h3 className="text-2xl font-bold text-gray-900">Gratitude & Victory Log</h3>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Document your daily wins and blessings. Build your highlight reel of victories for your nightly gratitude ceremony.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-md"
          >
            {showForm ? (
              <>
                <X className="w-5 h-5" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Record New Victory
              </>
            )}
          </button>
        </div>

        {renderVictoryForm()}

        <div className="space-y-4 mt-8">
          {victories.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm">
              <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <p className="text-gray-500">
                Start recording your victories to build your gratitude highlight reel!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {victories.map((victory) => {
                const category = categories.find(c => c.id === victory.category);
                return (
                  <div
                    key={victory.id}
                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all transform hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span role="img" aria-label={category?.label || ''}>
                            {category?.emoji}
                          </span>
                          <h4 className="font-semibold text-gray-900">{victory.title}</h4>
                        </div>
                        <p className="text-gray-600 whitespace-pre-wrap">{victory.description}</p>
                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(victory.date).toLocaleDateString()}
                          <span className="text-gray-300">•</span>
                          <span>{category?.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}