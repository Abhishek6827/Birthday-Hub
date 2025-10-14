"use client";

import { useState, useEffect } from "react";

const BackgroundSlider = ({ images = [], children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Adjust blur and scale based on screen size
  const getImageStyles = () => {
    if (isMobile) {
      return {
        filter: "blur(5px) brightness(0.6)",
        transform: "scale(1.05)",
      };
    }
    return {
      filter: "blur(10px) brightness(0.6)",
      transform: "scale(1.1)",
    };
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: isMobile ? "300px" : "500px",
        overflow: "hidden",
      }}
    >
      {/* Blurred Background Images */}
      {images.length > 0 &&
        images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "opacity 2s ease-in-out",
              opacity: currentIndex === index ? 1 : 0,
              zIndex: 0,
              willChange: "opacity",
              pointerEvents: "none",
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Background ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                ...getImageStyles(),
                pointerEvents: "none",
              }}
              loading="lazy" // Better performance
            />
            {/* Responsive Dark Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: isMobile
                  ? "linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))"
                  : "linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
                pointerEvents: "none",
              }}
            ></div>
          </div>
        ))}

      {/* Responsive Content Container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "1rem" : "2rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: isMobile ? "100%" : "1200px",
            textAlign: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSlider;
