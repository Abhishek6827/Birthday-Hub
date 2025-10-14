"use client";

import { useState, useEffect } from "react";
import BackgroundSlider from "./BackgroundSlider";

const PhotoGallery = ({ isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundImages = ["./image15.jpg", "./image23.jpg", "./image25.jpg"];

  const photos = [
    "./image1.jpg",
    "./image2.jpg",
    "./image3.jpg",
    "./image4.jpg",
    "./image5.jpg",
    "./image6.jpg",
    "./image7.jpg",
    "./image8.jpg",
    "./image9.jpg",
    "./image10.jpg",
    "./image11.jpg",
    "./image12.jpg",
    "./image13.jpg",
    "./image14.jpg",
    "./image15.jpg",
    "./image16.jpg",
    "./image17.jpg",
    "./image18.jpg",
    "./image19.jpg",
    "./image20.jpg",
    "./image21.jpg",
    "./image22.jpg",
    "./image23.jpg",
    "./image24.jpg",
    "./image25.jpg",
    "./image26.jpg",
    "./image27.jpg",
    "./image28.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="photo-gallery-section" style={{ overflow: "hidden" }}>
      <BackgroundSlider images={backgroundImages}>
        {/* Moving Border */}
        <div className="border-container">
          {/* Top Border */}
          <div className="border-top">
            <div className="marquee-horizontal">
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  className="border-image horizontal-image"
                />
              ))}
            </div>
          </div>

          {/* Right Border */}
          <div className="border-right">
            <div className="marquee-vertical">
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  className="border-image vertical-image"
                />
              ))}
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-bottom">
            <div className="marquee-horizontal-reverse">
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  className="border-image horizontal-image"
                />
              ))}
            </div>
          </div>

          {/* Left Border */}
          <div className="border-left">
            <div className="marquee-vertical-reverse">
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  className="border-image vertical-image"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-container">
          <div className="gallery-grid">
            {/* Left: Main Photo */}
            <div className="main-photo-container">
              <div className="photo-wrapper">
                {/* Main Photo Container */}
                <div className="main-photo-frame">
                  <img
                    src={photos[currentIndex] || "/placeholder.svg"}
                    alt="Featured Memory"
                    className="main-photo"
                  />
                </div>

                {/* Photo Indicators */}
                <div className="photo-indicators">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`indicator-dot ${
                        currentIndex === index ? "active" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Messages */}
            <div className={`messages-container ${isActive ? "active" : ""}`}>
              <h2 className="messages-title">Our Beautiful Memories</h2>

              <p className="main-quote">
                "Each photograph is a precious memory, a moment frozen in time
                that tells our story. From the first smile to the last goodbye,
                every image holds a piece of my heart forever."
              </p>

              <div className="secondary-quote">
                <p>
                  "Through these images, our love story continues to live on...
                  💖"
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .photo-gallery-section {
            height: 100vh;
            width: 100vw;
            position: relative;
          }

          .border-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 5;
            overflow: hidden;
            pointer-events: none;
          }

          /* Border Common Styles */
          .border-top,
          .border-bottom,
          .border-left,
          .border-right {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            pointer-events: none;
            overflow: hidden;
          }

          .border-top {
            top: 0;
            left: 0;
            right: 0;
            height: clamp(60px, 10vw, 80px);
            border-bottom: 2px solid rgba(236, 72, 153, 0.3);
          }

          .border-bottom {
            bottom: 0;
            left: 0;
            right: 0;
            height: clamp(60px, 10vw, 80px);
            border-top: 2px solid rgba(236, 72, 153, 0.3);
          }

          .border-left {
            top: 0;
            left: 0;
            bottom: 0;
            width: clamp(60px, 10vw, 80px);
            border-right: 2px solid rgba(236, 72, 153, 0.3);
          }

          .border-right {
            top: 0;
            right: 0;
            bottom: 0;
            width: clamp(60px, 10vw, 80px);
            border-left: 2px solid rgba(236, 72, 153, 0.3);
          }

          /* Marquee Animations */
          .marquee-horizontal {
            display: flex;
            animation: marquee 30s linear infinite;
            white-space: nowrap;
            padding: 12px 0;
          }

          .marquee-horizontal-reverse {
            display: flex;
            animation: marqueeReverse 30s linear infinite;
            white-space: nowrap;
            padding: 12px 0;
          }

          .marquee-vertical {
            display: flex;
            flex-direction: column;
            animation: marqueeVertical 30s linear infinite;
            height: 100%;
            padding: 0 12px;
          }

          .marquee-vertical-reverse {
            display: flex;
            flex-direction: column;
            animation: marqueeVerticalReverse 30s linear infinite;
            height: 100%;
            padding: 0 12px;
          }

          .border-image {
            display: inline-block;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            flex-shrink: 0;
          }

          /* Horizontal images (top & bottom) */
          .horizontal-image {
            height: clamp(40px, 8vw, 56px);
            width: clamp(40px, 8vw, 56px);
            margin: 0 clamp(8px, 2vw, 12px);
          }

          /* Vertical images (left & right) - Fixed spacing */
          .vertical-image {
            width: clamp(40px, 8vw, 56px);
            height: clamp(40px, 8vw, 56px);
            margin: clamp(12px, 2vw, 16px) 0;
          }

          /* Main Content */
          .main-content-container {
            padding: clamp(60px, 12vw, 80px) clamp(60px, 12vw, 80px);
            position: relative;
            z-index: 20;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(20px, 4vw, 40px);
            width: 100%;
            max-width: min(1400px, 95vw);
            align-items: center;
            justify-items: center;
          }

          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: 1fr 1fr;
              gap: clamp(20px, 4vw, 50px);
            }
          }

          @media (min-width: 1200px) {
            .gallery-grid {
              grid-template-columns: minmax(400px, 1fr) minmax(300px, 1fr);
            }
          }

          /* Main Photo Styles */
          .main-photo-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .photo-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .main-photo-frame {
            width: min(90vw, 500px);
            height: min(50vh, 500px);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            overflow: hidden;
            border: 4px solid rgba(236, 72, 153, 0.5);
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.3);
            background-color: rgba(0, 0, 0, 0.3);
          }

          @media (min-width: 768px) {
            .main-photo-frame {
              width: min(56vw, 500px);
              height: min(62vh, 500px);
            }
          }

          .main-photo {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            display: block;
          }

          .photo-indicators {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
            flex-wrap: wrap;
            max-width: 100%;
          }

          .indicator-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
            background-color: rgba(255, 255, 255, 0.4);
            border: none;
            cursor: pointer;
          }

          .indicator-dot.active {
            background-color: #ec4899;
            transform: scale(1.25);
          }

          /* Messages Styles */
          .messages-container {
            color: white;
            transition: all 1s ease;
            opacity: 0;
            transform: scale(0.98);
            width: 100%;
          }

          .messages-container.active {
            opacity: 1;
            transform: scale(1);
          }

          .messages-title {
            font-size: clamp(1.5rem, 4vw, 2.25rem);
            font-weight: bold;
            color: #fbcfe8;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            margin-bottom: clamp(12px, 2vw, 18px);
            text-align: center;
          }

          @media (min-width: 768px) {
            .messages-title {
              text-align: left;
            }
          }

          .main-quote {
            font-size: clamp(0.9rem, 2.5vw, 1.125rem);
            font-style: italic;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 16px;
            padding: clamp(16px, 3vw, 24px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            line-height: 1.6;
            margin-bottom: clamp(12px, 2vw, 18px);
          }

          .secondary-quote {
            background: rgba(236, 72, 153, 0.2);
            border-radius: 16px;
            padding: clamp(12px, 2vw, 16px);
            border: 1px solid rgba(236, 72, 153, 0.3);
          }

          .secondary-quote p {
            font-size: clamp(0.8rem, 2vw, 0.95rem);
            color: #fbcfe8;
            margin: 0;
          }

          /* Animation Keyframes */
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes marqueeVertical {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }

          @keyframes marqueeReverse {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes marqueeVerticalReverse {
            0% {
              transform: translateY(-50%);
            }
            100% {
              transform: translateY(0);
            }
          }

          /* Mobile-specific adjustments */
          @media (max-width: 480px) {
            .main-content-container {
              padding: clamp(50px, 10vw, 60px) clamp(40px, 8vw, 60px);
            }

            .horizontal-image {
              margin: 0 6px;
            }

            .vertical-image {
              margin: 10px 0;
            }

            .main-photo-frame {
              width: 85vw;
              height: 45vh;
            }

            /* Adjust vertical marquee padding for mobile */
            .marquee-vertical,
            .marquee-vertical-reverse {
              padding: 0 8px;
            }
          }

          /* Extra small devices */
          @media (max-width: 360px) {
            .border-left,
            .border-right {
              width: 50px;
            }

            .border-top,
            .border-bottom {
              height: 50px;
            }

            .vertical-image {
              width: 35px;
              height: 35px;
              margin: 8px 0;
            }

            .horizontal-image {
              width: 35px;
              height: 35px;
              margin: 0 5px;
            }
          }
        `}</style>
      </BackgroundSlider>
    </section>
  );
};

export default PhotoGallery;
