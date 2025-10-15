import React, { useState, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import StoryJourney from "./components/StoryJourney";
import PhotoGallery from "./components/PhotoGallery";
import VideoSection from "./components/VideoSection";
import FinalMessage from "./components/FinalMessage";
import AudioPlayer from "./components/AudioPlayer";
import BackendVisitCounter from "./components/BackendVisitCounter";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 5;
  const [isScrolling, setIsScrolling] = useState(false);
  const mainContainerRef = useRef(null);
  const [isStoryJourneyScrolling, setIsStoryJourneyScrolling] = useState(false);

  useEffect(() => {
    const handleWheel = (event) => {
      if (isScrolling || isStoryJourneyScrolling) return;

      setIsScrolling(true);
      const delta = Math.sign(event.deltaY);

      setCurrentSection((prev) => {
        if (delta > 0) return Math.min(totalSections - 1, prev + 1);
        if (delta < 0) return Math.max(0, prev - 1);
        return prev;
      });

      setTimeout(() => setIsScrolling(false), 1000);
    };

    const handleKeyPress = (event) => {
      if (isStoryJourneyScrolling) return;

      if (event.key === "ArrowDown") {
        setCurrentSection((prev) => Math.min(totalSections - 1, prev + 1));
      } else if (event.key === "ArrowUp") {
        setCurrentSection((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isScrolling, isStoryJourneyScrolling, totalSections]);

  useEffect(() => {
    if (mainContainerRef.current && !isStoryJourneyScrolling) {
      // Use manual scroll positioning instead of scrollIntoView
      mainContainerRef.current.scrollTo({
        top: window.innerHeight * currentSection,
        behavior: "smooth",
      });
    }
  }, [currentSection, isStoryJourneyScrolling]);

  const handleStoryJourneyScrollChange = (isScrolling) => {
    setIsStoryJourneyScrolling(isScrolling);
  };

  const handleSectionChangeFromStory = (section) => {
    setCurrentSection(section);
    setIsStoryJourneyScrolling(false);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <AudioPlayer />

      {/* Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        {["🎂", "💖", "📸", "🎬", "💌"].map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSection(index);
              setIsStoryJourneyScrolling(false);
            }}
            className={`block text-2xl my-5 transition-all ${
              currentSection === index
                ? "scale-125 text-pink-500"
                : "scale-100 text-gray-400 hover:text-gray-300"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div
        ref={mainContainerRef}
        className="relative h-screen overflow-y-scroll"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Hero Section */}
        <section className="h-screen w-full flex items-center justify-center">
          <Hero isActive={currentSection === 0} />
        </section>

        {/* StoryJourney Section */}
        <section className="h-screen w-full">
          <StoryJourney
            isActive={currentSection === 1}
            onSectionChange={handleSectionChangeFromStory}
            onScrollChange={handleStoryJourneyScrollChange}
          />
        </section>

        {/* PhotoGallery Section */}
        <section className="h-screen w-full">
          <PhotoGallery isActive={currentSection === 2} />
        </section>

        {/* VideoSection Section */}
        <section className="h-screen w-full">
          <VideoSection isActive={currentSection === 3} />
        </section>

        {/* FinalMessage Section */}
        <section className="h-screen w-full">
          <FinalMessage isActive={currentSection === 4} />
          <BackendVisitCounter />
        </section>
      </div>
    </div>
  );
}

export default App;
