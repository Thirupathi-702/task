import { Loader2 } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

function SongList({ songs, onSongClick, selectedSong, onDurationLoaded }) {
  return (
    <div className='h-[calc(100vh-10rem)] px-1'>
      {songs.length > 0 ? (
        songs.map((song) => (
          <div
            key={song.id}
            className={`flex items-center p-2 mb-1 rounded-lg cursor-pointer transition-colors 
                        ${song.id === selectedSong?.id ? 'bg-white/15' : 'hover:bg-white/15'}
                        `}
            onClick={() => onSongClick(song)}
          >
            <img 
              src={`https://cms.samespace.com/assets/${song.cover}`} 
              alt="cover" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mr-3 rounded-full shadow-lg object-cover" 
            />
            <div className="flex flex-col justify-start flex-grow">
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">{song.name}</span>
              <span className='text-gray-400 text-xs sm:text-sm md:text-base'>{song.artist}</span>
            </div>
            <div className="flex items-center ml-auto text-gray-400 text-xs sm:text-sm md:text-base">
              <span>
                {song.duration ? `${Math.floor(song.duration / 60)}:${Math.floor(song.duration % 60).toString().padStart(2, '0')}` : (
                  <Loader2 className='animate-spin w-4 h-4' />
                )}
                <AudioDurationExtractor url={song.url} onLoaded={(duration) => onDurationLoaded(song.id, duration)} />
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-96">
          <Loader2 className='animate-spin w-10 h-10 text-white' />
        </div>
      )}
    </div>
  );
}

function AudioDurationExtractor({ url, onLoaded }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        onLoaded(audioRef.current.duration);
      }
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onLoaded]);

  return <audio ref={audioRef} src={url} preload="metadata" hidden />;
}

export default SongList;
