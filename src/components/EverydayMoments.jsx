"use client";

import { useState, useEffect } from "react";
import BackgroundSlider from "./BackgroundSlider";

const EverydayMoments = ({ isActive }) => {
  const [selectedMoment, setSelectedMoment] = useState(0);

  const backgroundImages = [
    "/image9.jpg",
    "/image10.jpg",
    "/image11.jpg",
    "/image12.jpg",
    "/image13.jpg",
  ];

  const casualMoments = [
    {
      image: "/image14.jpg",
      title: "The Random Walk 🚶‍♀️",
      description:
        "That day you were just walking away from camera, laughing at something silly I said. Your laughter echoing in the corridor is a sound I'll always cherish.",
      emotional: "Spontaneous Joy",
    },
    {
      image: "/image15.jpg",
      title: "The Artist Side 🎨",
      description:
        "Your cute panda drawing that showed your creative side. I loved how focused you got when you were creating something beautiful.",
      emotional: "Creative Spirit",
    },
    {
      image: "/image24.jpg",
      title: "Classroom Focus 📚",
      description:
        "Concentrating in class, unaware I was admiring you from behind. Those stolen glances made lectures worth attending.",
      emotional: "Quiet Intensity",
    },
    {
      image: "/image26.jpg",
      title: "Side Profile 🌸",
      description:
        "Your beautiful side profile that I could never stop looking at. There was something magical about watching you lost in thought.",
      emotional: "Graceful Presence",
    },
    {
      image: "/image27.jpg",
      title: "Just Another Day ✨",
      description:
        "You sitting ahead of me in class, making ordinary days extraordinary. Your presence turned mundane moments into memories.",
      emotional: "Everyday Magic",
    },
    {
      image: "/image28.jpg",
      title: "Lost in Work 💻",
      description:
        "You deeply focused on your work, so serious yet so adorable. I admired your dedication and how you immersed yourself in tasks.",
      emotional: "Focused Determination",
    },
  ];

  // Auto-rotate through moments
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSelectedMoment((prev) => (prev + 1) % casualMoments.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, casualMoments.length]);

  return (
    <section className="h-screen w-screen relative overflow-hidden">
      <BackgroundSlider images={backgroundImages}>
        {/* Moving Border with casual moments */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* Top Border */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-black/90 border-b-2 border-blue-400/30">
            <div
              style={{
                display: "flex",
                animation: "marquee 30s linear infinite",
                whiteSpace: "nowrap",
                padding: "12px 0",
              }}
            >
              {casualMoments.concat(casualMoments).map((moment, index) => (
                <img
                  key={index}
                  src={moment.image || "/placeholder.svg"}
                  alt=""
                  className="inline-block h-14 w-14 object-cover mx-3 rounded-lg border-2 border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Right Border */}
          <div className="absolute top-0 right-0 bottom-0 w-20 bg-black/90 border-l-2 border-blue-400/30">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                animation: "marqueeVertical 30s linear infinite",
                height: "100%",
                padding: "12px 0",
              }}
            >
              {casualMoments.concat(casualMoments).map((moment, index) => (
                <img
                  key={index}
                  src={moment.image || "/placeholder.svg"}
                  alt=""
                  className="inline-block h-14 w-14 object-cover my-3 rounded-lg border-2 border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/90 border-t-2 border-blue-400/30">
            <div
              style={{
                display: "flex",
                animation: "marqueeReverse 30s linear infinite",
                whiteSpace: "nowrap",
                padding: "12px 0",
              }}
            >
              {casualMoments.concat(casualMoments).map((moment, index) => (
                <img
                  key={index}
                  src={moment.image || "/placeholder.svg"}
                  alt=""
                  className="inline-block h-14 w-14 object-cover mx-3 rounded-lg border-2 border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Left Border */}
          <div className="absolute top-0 left-0 bottom-0 w-20 bg-black/90 border-r-2 border-blue-400/30">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                animation: "marqueeVerticalReverse 30s linear infinite",
                height: "100%",
                padding: "12px 0",
              }}
            >
              {casualMoments.concat(casualMoments).map((moment, index) => (
                <img
                  key={index}
                  src={moment.image || "/placeholder.svg"}
                  alt=""
                  className="inline-block h-14 w-14 object-cover my-3 rounded-lg border-2 border-white/20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center h-full w-full py-20">
          <div
            className={`text-center text-white w-full max-w-4xl transition-all duration-1000 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Section Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-blue-200 drop-shadow-lg">
              Everyday Magic ✨
            </h2>
            <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
              "The little moments that made our ordinary days extraordinary"
            </p>

            {/* Main Image and Content */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              {/* Image */}
              <div className="flex-1">
                <img
                  src={
                    casualMoments[selectedMoment].image || "/placeholder.svg"
                  }
                  alt={casualMoments[selectedMoment].title}
                  className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl mx-auto shadow-2xl border-4 border-blue-300/30"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 text-left">
                <div className="bg-black/60 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-100 mb-3">
                    {casualMoments[selectedMoment].title}
                  </h3>

                  <div className="mb-4">
                    <span className="px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {casualMoments[selectedMoment].emotional}
                    </span>
                  </div>

                  <p className="text-lg leading-relaxed text-white/90">
                    {casualMoments[selectedMoment].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-3 mb-8">
              {casualMoments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMoment(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedMoment === index
                      ? "bg-blue-500 scale-125"
                      : "bg-white/40 scale-100"
                  }`}
                />
              ))}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
              {casualMoments.map((moment, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMoment(index)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                    selectedMoment === index
                      ? "ring-4 ring-blue-500 scale-105"
                      : "opacity-70 hover:opacity-100 hover:scale-102"
                  }`}
                >
                  <img
                    src={moment.image || "/placeholder.svg"}
                    alt=""
                    className="w-full h-20 object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent ${
                      selectedMoment === index ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Animation Styles */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeVertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes marqueeReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @keyframes marqueeVerticalReverse {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </BackgroundSlider>
    </section>
  );
};

export default EverydayMoments;
