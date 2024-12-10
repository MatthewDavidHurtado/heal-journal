import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { authService } from '../../lib/auth/service';
import { passwordSchema, recoveryAnswerSchema } from '../../lib/auth/types';

interface SetupAuthProps {
  onComplete: () => void;
}

export function SetupAuth({ onComplete }: SetupAuthProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryQuestion, setRecoveryQuestion] = useState('');
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      passwordSchema.parse(password);
      recoveryAnswerSchema.parse(recoveryAnswer);

      if (!recoveryQuestion.trim()) {
        throw new Error('Recovery question is required');
      }

      authService.initialize(password, recoveryQuestion, recoveryAnswer);
      onComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to set up password protection');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <img 
            src="https://imgur.com/47w7oTV.png" 
            alt="H.E.A.L. Logo" 
            className="h-24 w-auto mx-auto mb-6"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Begin your healing journey today
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Create Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
                minLength={8}
              />
              <p className="mt-1 text-sm text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="recoveryQuestion" className="block text-sm font-medium text-gray-700">
                Create Security Question
              </label>
              <input
                id="recoveryQuestion"
                type="text"
                value={recoveryQuestion}
                onChange={(e) => setRecoveryQuestion(e.target.value)}
                placeholder="Enter your own security question"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="recoveryAnswer" className="block text-sm font-medium text-gray-700">
                Security Answer
              </label>
              <input
                id="recoveryAnswer"
                type="text"
                value={recoveryAnswer}
                onChange={(e) => setRecoveryAnswer(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Remember this answer - you'll need it if you forget your password
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}