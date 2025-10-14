import React, { useRef, useEffect, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      // Play audio after user interaction
      setTimeout(() => {
        if (isPlaying) {
          audioRef.current?.play().catch(console.error);
        }
      }, 100);
    }
  };

  const togglePlay = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (userInteracted && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, userInteracted]);

  return (
    <div className="fixed bottom-4 left-4 z-50" onClick={handleUserInteraction}>
      <audio ref={audioRef} loop preload="auto">
        <source src="./birthday-music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={togglePlay}
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-3 shadow-lg hover:scale-110 transition-transform text-2xl"
      >
        {isPlaying ? "🔇" : "🔊"}
      </button>
      <p className="text-white text-xs mt-1">
        {isPlaying ? "Music ON" : "Music OFF"}
      </p>
    </div>
  );
};

export default AudioPlayer;
