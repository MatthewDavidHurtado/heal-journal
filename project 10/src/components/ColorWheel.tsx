import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import type { ColorOption } from '../types';

interface ColorWheelProps {
  onColorSelect: (color: ColorOption) => void;
  selectedColor: ColorOption | null;
}

const colors: ColorOption[] = [
  'red', 'orange', 'yellow', 'green', 'blue', 
  'indigo', 'violet', 'black', 'white', 'brown', 'grey'
];

const colorClasses: Record<ColorOption, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  black: 'bg-black',
  white: 'bg-white border-2 border-gray-200',
  brown: 'bg-amber-800',
  grey: 'bg-gray-500'
};

export function ColorWheel({ onColorSelect, selectedColor }: ColorWheelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="relative mx-auto">
        <div className={`
          relative transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-[600px] h-[600px]' : 'w-64 h-64'}
          mx-auto
        `}>
          <img 
            src="https://i.imgur.com/lIgrt0F.png" 
            alt="Color Wheel Reference" 
            className="w-full h-full object-contain rounded-lg shadow-lg cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
            loading="eager"
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? (
              <ZoomOut className="w-5 h-5 text-gray-600" />
            ) : (
              <ZoomIn className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          {isExpanded ? 'Click to minimize' : 'Click to expand'}
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4 max-w-lg mx-auto">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`
              w-12 h-12 rounded-full ${colorClasses[color]}
              transform transition-transform
              ${selectedColor === color ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-105'}
            `}
            aria-label={`Select ${color}`}
          />
        ))}
      </div>
    </div>
  );
}