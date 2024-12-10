import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface FirstTimeModalProps {
  onClose: () => void;
}

export function FirstTimeModal({ onClose }: FirstTimeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to H.E.A.L.</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Before you begin your healing journey, we recommend watching our Masterclass training video to understand how to get the most out of this app.
        </p>

        <div className="space-y-4">
          <a
            href="https://vimeo.com/1029861982"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center flex items-center justify-center gap-2"
          >
            Watch Masterclass Training
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Skip for Now
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          You can always find this video and more training materials in the "Training Videos" section.
        </p>
      </div>
    </div>
  );
}