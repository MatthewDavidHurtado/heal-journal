<content>import React, { useState } from 'react';
import { Bell, Loader2, AlertCircle } from 'lucide-react';
import { setupPushNotifications } from '../lib/firebase';

interface NotificationSetupProps {
  userId: string;
  onComplete: () => void;
}

export function NotificationSetup({ userId, onComplete }: NotificationSetupProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnableNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      
      const success = await setupPushNotifications(userId);
      if (success) {
        onComplete();
      } else {
        throw new Error('Failed to enable notifications');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to set up notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="text-center space-y-4">
          <Bell className="w-12 h-12 text-indigo-600 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900">
            Enable H.E.A.L. Reminders
          </h3>
          <p className="text-gray-600">
            Get notified when it's time for your next H.E.A.L. meditation session.
            Stay consistent on your healing journey.
          </p>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleEnableNotifications}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5" />
                  Enable Notifications
                </>
              )}
            </button>

            <button
              onClick={onComplete}
              className="text-gray-600 hover:text-gray-800"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
</content>