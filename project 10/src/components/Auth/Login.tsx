import React, { useState } from 'react';
import { Lock, AlertCircle, KeyRound } from 'lucide-react';
import { authService } from '../../lib/auth/service';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [password, setPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authService.login(password)) {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authService.verifyRecoveryAnswer(recoveryAnswer)) {
      if (newPassword.length >= 8) {
        authService.resetPassword(newPassword);
        onLogin();
      } else {
        setError('New password must be at least 8 characters');
      }
    } else {
      setError('Invalid recovery answer');
    }
  };

  const recoveryQuestion = authService.getRecoveryQuestion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <img 
            src="https://imgur.com/47w7oTV.png" 
            alt="H.E.A.L. Logo" 
            className="h-24 w-auto mx-auto mb-6"
          />
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isNewUser ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isNewUser 
              ? 'Begin your healing journey today'
              : 'Sign in to continue your healing journey'}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!showRecovery ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <KeyRound className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {isNewUser ? 'Create Account' : 'Sign in'}
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setShowRecovery(true)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>

              <button
                type="button"
                onClick={() => setIsNewUser(!isNewUser)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                {isNewUser 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Create one"}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRecovery}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recovery Question:
                </label>
                <p className="mt-1 text-gray-600">{recoveryQuestion}</p>
              </div>

              <div>
                <label htmlFor="recoveryAnswer" className="sr-only">
                  Recovery Answer
                </label>
                <input
                  id="recoveryAnswer"
                  type="text"
                  value={recoveryAnswer}
                  onChange={(e) => setRecoveryAnswer(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="sr-only">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowRecovery(false)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}