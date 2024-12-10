import React, { useState, useEffect } from 'react';
import { LogOut, Users, Home, BookOpen, Coins } from 'lucide-react';
import { ColorWheel } from './components/ColorWheel';
import { NumberSelector } from './components/NumberSelector';
import { JournalEntry } from './components/JournalEntry';
import { Archive } from './components/Archive';
import { Footer } from './components/Footer';
import { ManifestationList } from './components/ManifestationList';
import { DailyActionList } from './components/DailyActionList';
import { DataManagement } from './components/DataManagement';
import { InstallPrompt } from './components/InstallPrompt';
import { Login } from './components/Auth/Login';
import { SetupAuth } from './components/Auth/SetupAuth';
import { VideoTraining } from './components/VideoTraining';
import { Tithe } from './components/Tithe';
import { authService } from './lib/auth/service';
import type { ColorOption } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [step, setStep] = useState<'initial' | 'color' | 'number' | 'journal'>('initial');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [showVictories, setShowVictories] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showTithe, setShowTithe] = useState(false);
  const [threadTitle, setThreadTitle] = useState('');

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setIsInitialized(authService.isInitialized());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const resetView = () => {
    setShowArchive(false);
    setShowVictories(false);
    setShowTraining(false);
    setShowTithe(false);
  };

  const resetThread = () => {
    setStep('initial');
    setSelectedColor(null);
    setSelectedNumber(null);
    setThreadTitle('');
  };

  if (!isInitialized) {
    return <SetupAuth onComplete={() => setIsInitialized(true)} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://imgur.com/47w7oTV.png" 
              alt="H.E.A.L. Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              {showArchive ? 'Archive' : 
               showVictories ? 'Victory Room' :
               showTraining ? 'Training Videos' :
               showTithe ? 'Tithe' : 'H.E.A.L.'}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {(showArchive || showVictories || showTraining || showTithe || step !== 'initial') && (
              <button
                onClick={() => {
                  resetView();
                  resetThread();
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Back to Journal
              </button>
            )}
            {!showArchive && step === 'initial' && (
              <button
                onClick={() => {
                  resetView();
                  setShowArchive(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View Archive
              </button>
            )}
            {!showVictories && step === 'initial' && (
              <button
                onClick={() => {
                  resetView();
                  setShowVictories(true);
                }}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Victory Room
              </button>
            )}
            {!showTraining && step === 'initial' && (
              <button
                onClick={() => {
                  resetView();
                  setShowTraining(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Training
              </button>
            )}
            {!showTithe && step === 'initial' && (
              <button
                onClick={() => {
                  resetView();
                  setShowTithe(true);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Tithe
              </button>
            )}
            <a
              href="https://www.livefromyourjoy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Private Community
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {showArchive || showVictories ? (
          <Archive showVictories={showVictories} />
        ) : showTraining ? (
          <VideoTraining />
        ) : showTithe ? (
          <Tithe />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {step === 'initial' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <img
                    src="https://imgur.com/wQGWjEq.png"
                    alt="H.E.A.L. Book"
                    className="w-48 mx-auto mb-6"
                  />
                  <h2 className="text-xl font-semibold mb-4">Start Your Healing Journey</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Give this healing thread a title..."
                      value={threadTitle}
                      onChange={(e) => setThreadTitle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => threadTitle.trim() && setStep('color')}
                      disabled={!threadTitle.trim()}
                      className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Begin Thread
                    </button>
                  </div>
                </div>

                <ManifestationList />
                <DailyActionList />
                <DataManagement />
              </div>
            )}

            {step === 'color' && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Select Your Color</h2>
                <ColorWheel onColorSelect={setSelectedColor} selectedColor={selectedColor} />
                {selectedColor && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setStep('number')}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 'number' && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Choose Your Number</h2>
                <NumberSelector
                  onNumberSelect={setSelectedNumber}
                  selectedNumber={selectedNumber}
                  onContinue={() => setStep('journal')}
                />
              </div>
            )}

            {step === 'journal' && selectedColor && selectedNumber && (
              <JournalEntry
                threadTitle={threadTitle}
                color={selectedColor}
                number={selectedNumber}
                onSaveComplete={resetThread}
              />
            )}
          </div>
        )}
      </main>

      <InstallPrompt />
      <Footer />
    </div>
  );
}

export default App;