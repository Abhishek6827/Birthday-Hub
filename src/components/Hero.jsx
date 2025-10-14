import React, { useState, useEffect } from "react";

const Hero = ({ isActive }) => {
  const [currentBg, setCurrentBg] = useState(0);

  const backgroundImages = [
    "./image11.jpg",
    "./image5.jpg",
    "./image4.jpg",
    "./image3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="h-screen w-screen relative"
      style={{
        overflow: "hidden",
      }}
    >
      {/* Multiple Background Images with Transition */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "opacity 1.5s ease-in-out",
            opacity: currentBg === index ? 1 : 0,
            zIndex: 1,
          }}
        >
          <img
            src={image}
            alt={`Background ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center", // Top portion dikhayega
              filter: "brightness(0.7) contrast(1.1)",
            }}
          />
          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
            }}
          ></div>
        </div>
      ))}

      {/* Pattern Overlay to hide empty spaces */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 2px)",
          backgroundSize: "40px 40px",
          opacity: 0.3,
          zIndex: 2,
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            transition: "all 1s ease",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(20px)",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "4.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background:
                "linear-gradient(45deg, #ff6b6b, #feca57, #ff9ff3, #48dbfb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Happy Birthday
          </h1>

          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: "#fff",
            }}
          >
            Shivani 🎀
          </h2>

          <p
            style={{
              fontSize: "1.5rem",
              marginBottom: "2rem",
              maxWidth: "600px",
              background: "rgba(0,0,0,0.6)",
              padding: "20px",
              borderRadius: "15px",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          >
            A journey through memories that will forever live in my heart ✨
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "2rem",
            }}
          >
            <span style={{ fontSize: "3rem", animation: "bounce 2s infinite" }}>
              🎂
            </span>
            <span style={{ fontSize: "3rem", animation: "spin 3s infinite" }}>
              🎀
            </span>
            <span style={{ fontSize: "3rem", animation: "pulse 2s infinite" }}>
              🎁
            </span>
          </div>
        </div>

        {/* Scroll Indicator - Moved outside the main content div */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              bottom: "30px", // Reduced from 40px to 30px
              left: "50%",
              transform: "translateX(-50%)",
              animation: "bounce 2s infinite",
              zIndex: 4,
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.6)",
              padding: "10px 20px",
              borderRadius: "25px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
              ⬇️
            </div>
            <p style={{ fontSize: "0.9rem", margin: 0, color: "#fff" }}>
              Scroll to begin our story
            </p>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
        @keyframes spin {
          0% {transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
        @keyframes pulse {
          0%, 100% {opacity: 1;}
          50% {opacity: 0.7;}
        }
      `}</style>
    </section>
  );
};

export default Hero;
