import React, { useState, useEffect, useTransition } from 'react';
import axios from 'axios';
import SongList from './components/SongsList';
import Player from './components/Player';
import spotify from "./assets/spotify.png";
import { Loader2 } from 'lucide-react';
import { PersonIcon } from '@radix-ui/react-icons';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('forYou');
  const [loading, setLoading] = useTransition();

  useEffect(() => {
    setLoading(() => {
      axios.get('https://cms.samespace.com/items/songs')
        .then(response => setSongs(response.data.data.map(song => ({
          ...song,
          duration: 0,
        }))))
        .catch(error => console.error('Error fetching data:', error));
    });
  }, []);

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const forYouSongs = filteredSongs;
  const topTracks = filteredSongs.filter(song => song.top_track);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  const forYouNextSong = () => {
    const currentIndex = forYouSongs.findIndex(song => song.id === selectedSong.id);
    const nextIndex = (currentIndex + 1) % forYouSongs.length;
    setSelectedSong(forYouSongs[nextIndex]);
  };

  const forYouPrevSong = () => {
    const currentIndex = forYouSongs.findIndex(song => song.id === selectedSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % forYouSongs.length;
    setSelectedSong(forYouSongs[prevIndex]);
  };

  const topTracksNextSong = () => {
    const currentIndex = topTracks.findIndex(song => song.id === selectedSong.id);
    const nextIndex = (currentIndex + 1) % topTracks.length;
    setSelectedSong(topTracks[nextIndex]);
  };

  const topTracksPrevSong = () => {
    const currentIndex = topTracks.findIndex(song => song.id === selectedSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % topTracks.length;
    setSelectedSong(topTracks[prevIndex]);
  };

  const handleDurationLoaded = (id, duration) => {
    setSongs(prevSongs =>
      prevSongs.map(song => song.id === id ? { ...song, duration } : song)
    );
  };

  return (
    <div
      className="h-screen flex flex-col lg:flex-row gap-6 p-6 h-full w-full"
      style={{
        background: selectedSong
          ? `linear-gradient(to bottom right, ${selectedSong.accent}, black)`
          : 'black',
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <div className="flex flex-col justify-between w-full lg:w-[300px]">
        <img src={spotify} alt="logo" className='w-32 h-12 mb-8' />
        <PersonIcon className='w-10 h-10 text-white bg-gray-500 rounded-full p-2 self-end' />
      </div>
      <div className="flex-1">
        <div className="mb-4 flex justify-between lg:justify-start gap-4">
          <button
            className={`p-2 ${activeTab === 'forYou' ? 'text-white' : 'text-gray-400'} text-lg font-bold`}
            onClick={() => setActiveTab('forYou')}
          >
            For You
          </button>
          <button
            className={`p-2 ${activeTab === 'topTracks' ? 'text-white' : 'text-gray-400'} text-lg font-bold`}
            onClick={() => setActiveTab('topTracks')}
          >
            Top Tracks
          </button>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Song, Artist"
            className="p-2 rounded-md bg-white/15 text-white w-full lg:w-96 h-12 px-4 placeholder:text-gray-200 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {loading ? (
          <Loader2 className='animate-spin w-10 h-10' />
        ) : (
          <SongList
            songs={activeTab === 'forYou' ? forYouSongs : topTracks}
            onSongClick={handleSongClick}
            selectedSong={selectedSong}
            onDurationLoaded={handleDurationLoaded}
          />
        )}
      </div>
      {selectedSong ? (
        <div className="w-full lg:w-1/2">
          <Player
            song={selectedSong}
            nextSong={activeTab === 'forYou' ? forYouNextSong : topTracksNextSong}
            prevSong={activeTab === 'forYou' ? forYouPrevSong : topTracksPrevSong}
          />
        </div>
      ) : (
        <div className="w-full lg:w-1/3 h-full flex justify-center items-center">
          <p className="text-gray-400">Select a song to play</p>
        </div>
      )}
    </div>
  );
}

export default App;
