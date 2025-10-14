"use client";

import { useRef, useEffect, useState } from "react";

const VideoSection = ({ isActive }) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videos = [
    "/birthday-video.mp4",
    "/birthday-video1.MP4",
    "/birthday-video2.mp4",
    "/birthday-video3.MP4",
    "/birthday-video4.mp4",
    "/birthday-video5.MOV",
    "/birthday-video6.MOV",
    "/birthday-video7.mp4",
  ];

  const videoEmotions = [
    "💖 A moment of pure happiness",
    "✨ Moments too pure for words.",
    "🎀 Your infectious laughter",
    "🌷 A memory to cherish forever",
    "🌟 Just being ourselves",
    "🦋 Natural and carefree",
    "🌸 Simple moments, deep memories",
    "🎈 Raw and real emotions",
  ];

  useEffect(() => {
    if (isActive && videoRef.current && !isFullscreen) {
      videoRef.current.play().catch(() => {});
    }
  }, [isActive, currentVideo, isFullscreen]);

  const handleNextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleVideoSelect = (index) => {
    setCurrentVideo(index);
  };

  const handleVideoEnd = () => {
    handleNextVideo();
  };

  const handleThumbnailClick = (index) => {
    setCurrentVideo(index);
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  // Auto-play all thumbnails when component mounts
  useEffect(() => {
    if (isActive) {
      // Auto-play all video elements after a short delay
      const timer = setTimeout(() => {
        const videoElements = document.querySelectorAll("video");
        videoElements.forEach((video) => {
          video.play().catch(() => {
            // Silent catch for autoplay restrictions
          });
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <section className="h-screen w-screen relative bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image23.jpg"
          alt="Video Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              loop={false}
              muted={false}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              controls
              key={currentVideo}
              onEnded={() => {
                handleVideoEnd();
                if (currentVideo === videos.length - 1) {
                  setIsFullscreen(false);
                }
              }}
            >
              <source src={videos[currentVideo]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Close Button */}
            <button
              onClick={exitFullscreen}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Close fullscreen"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Arrows in Fullscreen */}
            <button
              onClick={handlePrevVideo}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextVideo}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Video Info in Fullscreen */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-xl p-4 backdrop-blur-sm text-white text-center">
              <p className="text-lg font-semibold">
                {videoEmotions[currentVideo]}
              </p>
              <p className="text-sm opacity-90">
                Memory {currentVideo + 1} of {videos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Only Tiles Grid */}
      <div
        className={`relative z-10 w-full h-full transition-all duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header - Clean */}
        <div className="text-center pt-8 pb-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-2 text-white"
            style={{
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
            }}
          >
            Our Beautiful Memories 🎬
          </h2>
          <p className="text-lg text-white/90 font-medium">
            Moments that are captured for eternity.
          </p>
          <p className="text-sm text-white/80 mt-1">
            some precious moments with you
          </p>
        </div>

        {/* Big Tiles Grid - Center Aligned */}
        <div className="flex justify-center px-6">
          <div className="w-full max-w-6xl">
            {/* Video Thumbnails Grid - Big Tiles with Auto-play */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    currentVideo === index
                      ? "transform scale-105"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  {/* Big Video Thumbnail Container */}
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                    {/* Video Thumbnail - Auto-playing */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          // Don't pause on mouse leave, keep playing
                        }}
                      >
                        <source src={video} type="video/mp4" />
                      </video>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/30 rounded-full p-4 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-semibold text-sm drop-shadow-lg">
                          {videoEmotions[index]}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            Memory {index + 1}
                          </span>
                          {currentVideo === index && (
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
              ))}
            </div>

            {/* Final Message - Clean */}
            <div className="text-center mt-8 mb-6">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 inline-block">
                <p className="text-xl text-white font-light italic">
                  "Every moment with you is a beautiful memory worth cherishing
                  forever 💫"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
