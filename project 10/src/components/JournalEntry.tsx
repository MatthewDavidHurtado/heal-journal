import React, { useState } from 'react';
import { PenLine, ChevronDown, ChevronUp, Loader2, AlertCircle, Save } from 'lucide-react';
import { localStorageService } from '../lib/storage/localStorage';
import { VictoryLog } from './VictoryLog';
import type { Belief, Victory } from '../types';

interface JournalEntryProps {
  threadTitle: string;
  color: string;
  number: number;
  onSaveComplete: () => void;
}

export function JournalEntry({ threadTitle, color, number, onSaveComplete }: JournalEntryProps) {
  const [content, setContent] = useState('');
  const [beliefs, setBeliefs] = useState<Belief[]>([]);
  const [victories, setVictories] = useState<Victory[]>([]);
  const [isDigging, setIsDigging] = useState(false);
  const [currentBelief, setCurrentBelief] = useState('');
  const [currentLieExplanation, setCurrentLieExplanation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const addBelief = () => {
    if (!currentBelief.trim() || !currentLieExplanation.trim()) return;
    
    setBeliefs(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        belief: currentBelief.trim(),
        howIsItALie: currentLieExplanation.trim()
      }
    ]);
    
    setCurrentBelief('');
    setCurrentLieExplanation('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSaving || !content.trim()) return;

    try {
      setIsSaving(true);
      setError('');

      localStorageService.saveEntry({
        threadTitle,
        color,
        number,
        content: content.trim(),
        beliefs,
        victories
      });

      setContent('');
      setBeliefs([]);
      setVictories([]);
      setCurrentBelief('');
      setCurrentLieExplanation('');
      setIsDigging(false);
      onSaveComplete();
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <form onSubmit={handleSave} className="space-y-8">
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What differences are you noticing today?"
            className="w-full h-40 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
            disabled={isSaving}
            required
          />
          
          <button
            type="button"
            onClick={() => setIsDigging(!isDigging)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            disabled={isSaving}
          >
            <PenLine size={18} />
            Begin Belief Digging
            {isDigging ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isDigging && (
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <textarea
                  value={currentBelief}
                  onChange={(e) => setCurrentBelief(e.target.value)}
                  placeholder="What belief would you like to explore?"
                  className="w-full p-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={isSaving}
                />
              </div>

              <div>
                <textarea
                  value={currentLieExplanation}
                  onChange={(e) => setCurrentLieExplanation(e.target.value)}
                  placeholder="How is this belief not serving you?"
                  className="w-full p-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[160px]"
                  disabled={isSaving}
                />
              </div>

              <button
                type="button"
                onClick={addBelief}
                disabled={!currentBelief.trim() || !currentLieExplanation.trim() || isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                Add Belief
              </button>

              {beliefs.length > 0 && (
                <div className="mt-4 space-y-3">
                  {beliefs.map((belief, index) => (
                    <div key={belief.id} className="p-4 bg-white rounded-md shadow-sm">
                      <p className="font-medium">Belief {index + 1}:</p>
                      <p className="mt-1">{belief.belief}</p>
                      <p className="font-medium mt-3">How it's a lie:</p>
                      <p className="mt-1">{belief.howIsItALie}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <VictoryLog
            victories={victories}
            onAddVictory={(victory) => {
              setVictories(prev => [...prev, {
                ...victory,
                id: `victory-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
              }]);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!content.trim() || isSaving}
          className="w-full py-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors text-lg font-medium"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-6 h-6" />
              Save Entry
            </>
          )}
        </button>
      </form>
    </div>
  );
}