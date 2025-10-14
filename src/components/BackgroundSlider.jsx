"use client";

import { useState, useEffect } from "react";

const BackgroundSlider = ({ images = [], children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
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
                filter: "blur(10px) brightness(0.6)",
                transform: "scale(1.1)",
                pointerEvents: "none",
              }}
            />
            {/* Dark Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
                pointerEvents: "none",
              }}
            ></div>
          </div>
        ))}

      {/* Content */}
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
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundSlider;
