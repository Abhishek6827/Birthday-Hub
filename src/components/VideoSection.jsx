"use client";

import { useRef, useEffect, useState } from "react";

const VideoSection = ({ isActive }) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videos = [
    "./birthday-video.mp4",
    "./birthday-video1.mp4",
    "./birthday-video2.mp4",
    "./birthday-video3.mp4",
    "./birthday-video4.mp4",
    "./birthday-video5.mp4",
    "./birthday-video6.mp4",
    "./birthday-video7.mp4",
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

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Handle keyboard events for fullscreen navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isFullscreen) return;

      if (e.key === "ArrowLeft") {
        handlePrevVideo();
      } else if (e.key === "ArrowRight") {
        handleNextVideo();
      } else if (e.key === "Escape") {
        exitFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFullscreen, currentVideo]);

  return (
    <section className="h-screen w-screen relative bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="./image23.jpg"
          alt="Video Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <video
              ref={videoRef}
              loop={false}
              muted={false}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              controls={isMobile} // Show native controls on mobile
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
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 md:p-3 transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Close fullscreen"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
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

            {/* Navigation Arrows in Fullscreen - Hide on mobile when controls are visible */}
            {!isMobile && (
              <>
                <button
                  onClick={handlePrevVideo}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 md:p-4 transition-all duration-200 backdrop-blur-sm z-10"
                  aria-label="Previous video"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 md:p-4 transition-all duration-200 backdrop-blur-sm z-10"
                  aria-label="Next video"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
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
              </>
            )}

            {/* Video Info in Fullscreen */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-xl p-3 md:p-4 backdrop-blur-sm text-white text-center max-w-90vw">
              <p className="text-sm md:text-lg font-semibold">
                {videoEmotions[currentVideo]}
              </p>
              <p className="text-xs md:text-sm opacity-90 mt-1">
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
        {/* Header - Responsive */}
        <div className="text-center pt-4 md:pt-8 pb-4 md:pb-6 px-4">
          <h2
            className="text-2xl md:text-4xl font-bold mb-2 text-white"
            style={{
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
            }}
          >
            Our Beautiful Memories 🎬
          </h2>
          <p className="text-base md:text-lg text-white/90 font-medium">
            Moments that are captured for eternity.
          </p>
          <p className="text-xs md:text-sm text-white/80 mt-1">
            some precious moments with you
          </p>
        </div>

        {/* Big Tiles Grid - Center Aligned with Responsive Padding */}
        <div className="flex justify-center px-3 md:px-6 h-[calc(100%-120px)] md:h-[calc(100%-140px)]">
          <div className="w-full max-w-6xl h-full">
            {/* Video Thumbnails Grid - Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 h-full overflow-y-auto pb-4">
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
                  {/* Responsive Video Thumbnail Container */}
                  <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-0.5 md:p-1">
                    {/* Video Thumbnail - Auto-playing */}
                    <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden">
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

                      {/* Hover Play Button - Hidden on mobile for better performance */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                        <div className="bg-white/30 rounded-full p-3 md:p-4 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Video Info - Responsive */}
                      <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
                        <p className="text-white font-semibold text-xs md:text-sm drop-shadow-lg leading-tight md:leading-normal">
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

                  {/* Glow Effect on Hover - Only on desktop */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl hidden md:block"></div>
                </div>
              ))}
            </div>

            {/* Final Message - Responsive */}
            <div className="text-center mt-4 md:mt-8 mb-4 md:mb-6 px-4">
              <div className="bg-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/20 inline-block max-w-90vw">
                <p className="text-base md:text-xl text-white font-light italic">
                  "Every moment with you is a beautiful memory worth cherishing
                  forever 💫"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar for Webkit browsers */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .max-w-90vw {
          max-width: 90vw;
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
