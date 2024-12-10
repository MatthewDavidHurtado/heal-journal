import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { Play, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
}

export function VideoPlayer({ videoId, title, description }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const playerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayer = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    const initPlayer = async () => {
      try {
        setIsLoading(true);
        setError('');

        vimeoPlayer.current = new Player(playerRef.current, {
          id: videoId,
          width: '100%',
          height: '100%',
          controls: true,
          responsive: true,
          title: false,
          byline: false,
          portrait: false,
          badge: false,
          autopause: false,
          dnt: true
        });

        await vimeoPlayer.current.ready();
        setIsLoading(false);
      } catch (err) {
        console.error('Vimeo player error:', err);
        setError('Video is currently unavailable. Please try again later.');
        setIsLoading(false);
      }
    };

    initPlayer();

    return () => {
      vimeoPlayer.current?.destroy();
    };
  }, [videoId]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-6">
            <AlertCircle className="w-8 h-8 text-amber-500 mb-2" />
            <p className="text-gray-600 text-center mb-4">{error}</p>
            <a
              href={`https://vimeo.com/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Watch on Vimeo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div
            ref={playerRef}
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}