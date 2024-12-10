import React from 'react';
import { BookOpen, Download } from 'lucide-react';

const trainingVideos = [
  {
    id: 'masterclass',
    title: 'H.E.A.L. Masterclass Training',
    description: 'Learn the foundational principles and practices of the H.E.A.L. process in this comprehensive masterclass.',
    url: 'https://vimeo.com/1029861982'
  },
  {
    id: 'meditation',
    title: 'H.E.A.L. Meditation Process',
    description: 'Experience the transformative H.E.A.L. meditation process.',
    url: 'https://vimeo.com/1029863358/376791795d'
  },
  {
    id: 'retroactive',
    title: 'H.E.A.L. Meditation Retroactive Healing',
    description: 'Learn the powerful retroactive healing meditation technique.',
    url: 'https://vimeo.com/1029864356/41c32ddb89'
  }
];

export function VideoTraining() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900">How to Use This App</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access these training videos to learn how to get the most out of your healing journey.
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
        {trainingVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
              <p className="text-gray-600 mb-4">{video.description}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Watch Video
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Download H.E.A.L. Book</h3>
            <p className="text-gray-600 mb-4">Get access to the complete H.E.A.L. book in digital format.</p>
            <a
              href="https://drive.google.com/file/d/1Xre7gvpvFXPctZAsanUbBf5llgwt2PxS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Download Book
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}