import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface NumberSelectorProps {
  onNumberSelect: (number: number) => void;
  selectedNumber: number | null;
  onContinue?: () => void;
}

export function NumberSelector({ onNumberSelect, selectedNumber, onContinue }: NumberSelectorProps) {
  const [hasViewedImage, setHasViewedImage] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [tempNumber, setTempNumber] = useState<number | null>(null);

  const handleNumberSelect = (number: number) => {
    setTempNumber(number);
    onNumberSelect(number);
    setHasViewedImage(false);
  };

  const handleContinue = () => {
    if (hasViewedImage && tempNumber !== null && onContinue) {
      onContinue();
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberSelect(number)}
            className={`
              w-16 h-16 rounded-lg text-xl font-bold
              transition-all duration-200
              ${tempNumber === number
                ? 'bg-indigo-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
              }
              shadow-md hover:shadow-lg
            `}
          >
            {number}
          </button>
        ))}
      </div>

      {tempNumber && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src="https://imgur.com/3QDWK8x.png"
              alt="Number meanings"
              className={`
                mx-auto rounded-lg shadow-lg cursor-pointer
                transition-all duration-300
                ${showFullImage ? 'w-full max-w-3xl' : 'w-64'}
              `}
              onClick={() => {
                setShowFullImage(!showFullImage);
                setHasViewedImage(true);
              }}
              loading="eager"
            />
            <button
              onClick={() => {
                setShowFullImage(!showFullImage);
                setHasViewedImage(true);
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              {showFullImage ? (
                <ZoomOut className="w-5 h-5 text-gray-600" />
              ) : (
                <ZoomIn className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-600">
            {showFullImage ? 'Click to minimize' : 'Click to view full size'}
          </p>

          <button
            onClick={handleContinue}
            disabled={!hasViewedImage}
            className={`
              w-full px-6 py-2 rounded-md
              transition-all duration-200
              ${hasViewedImage
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {hasViewedImage ? 'Continue to Journal Entry' : 'View number meanings to continue'}
          </button>
        </div>
      )}
    </div>
  );
}