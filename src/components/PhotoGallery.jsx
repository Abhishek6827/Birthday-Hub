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
    <section
      className="h-screen w-screen relative"
      style={{ overflow: "hidden" }}
    >
      <BackgroundSlider images={backgroundImages}>
        {/* Moving Border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Top Border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "rgba(0, 0, 0, 0.9)",
              borderBottom: "2px solid rgba(236, 72, 153, 0.3)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                animation: "marquee 30s linear infinite",
                whiteSpace: "nowrap",
                padding: "12px 0",
              }}
            >
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  style={{
                    display: "inline-block",
                    height: "56px",
                    width: "56px",
                    objectFit: "cover",
                    margin: "0 12px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "80px",
              background: "rgba(0, 0, 0, 0.9)",
              borderLeft: "2px solid rgba(236, 72, 153, 0.3)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                animation: "marqueeVertical 30s linear infinite",
                height: "100%",
                padding: "12px 0",
              }}
            >
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  style={{
                    display: "inline-block",
                    height: "56px",
                    width: "56px",
                    objectFit: "cover",
                    margin: "12px 0",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Border */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "rgba(0, 0, 0, 0.9)",
              borderTop: "2px solid rgba(236, 72, 153, 0.3)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                animation: "marqueeReverse 30s linear infinite",
                whiteSpace: "nowrap",
                padding: "12px 0",
              }}
            >
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  style={{
                    display: "inline-block",
                    height: "56px",
                    width: "56px",
                    objectFit: "cover",
                    margin: "0 12px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Left Border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "80px",
              background: "rgba(0, 0, 0, 0.9)",
              borderRight: "2px solid rgba(236, 72, 153, 0.3)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                animation: "marqueeVerticalReverse 30s linear infinite",
                height: "100%",
                padding: "12px 0",
              }}
            >
              {photos.concat(photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt=""
                  style={{
                    display: "inline-block",
                    height: "56px",
                    width: "56px",
                    objectFit: "cover",
                    margin: "12px 0",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            paddingTop: "calc(80px + 64px)",
            paddingBottom: "calc(80px + 32px)",
            paddingLeft: "calc(80px + 24px)",
            paddingRight: "calc(80px + 24px)",
            position: "relative",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="pg-grid"
            style={{ width: "100%", maxWidth: "1100px", gap: "28px" }}
          >
            {/* Left: Main Photo - FIXED */}
            <div
              className="pg-left"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Main Photo Container */}
                <div
                  style={{
                    width: "min(56vw, 500px)",
                    height: "min(62vh, 500px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "4px solid rgba(236, 72, 153, 0.5)",
                    boxShadow: "0 0 30px rgba(236, 72, 153, 0.3)",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <img
                    src={photos[currentIndex] || "/placeholder.svg"}
                    alt="Featured Memory"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Changed from 'cover' to 'contain'
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                </div>

                {/* Photo Indicators - Moved under the image */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        transition: "all 0.3s ease",
                        backgroundColor:
                          currentIndex === index
                            ? "#ec4899"
                            : "rgba(255, 255, 255, 0.4)",
                        transform:
                          currentIndex === index ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Messages */}
            <div
              className="pg-right"
              style={{
                color: "white",
                transition: "all 1s ease",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(0.98)",
              }}
            >
              <h2
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  color: "#fbcfe8",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                  marginBottom: "18px",
                  textAlign: "left",
                }}
              >
                Our Beautiful Memories
              </h2>

              <p
                style={{
                  fontSize: "1.125rem",
                  fontStyle: "italic",
                  background: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  lineHeight: "1.6",
                  marginBottom: "18px",
                }}
              >
                "Each photograph is a precious memory, a moment frozen in time
                that tells our story. From the first smile to the last goodbye,
                every image holds a piece of my heart forever."
              </p>

              <div
                style={{
                  background: "rgba(236, 72, 153, 0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "1px solid rgba(236, 72, 153, 0.3)",
                }}
              >
                <p style={{ fontSize: "0.95rem", color: "#fbcfe8", margin: 0 }}>
                  "Through these images, our love story continues to live on...
                  💖"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Styles for Animations */}
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
        /* Responsive two-column: stack on small screens, row on >=900px */
        .pg-grid { 
          display: grid; 
          grid-template-columns: 1fr; 
          align-items: center; 
          justify-items: center;
        }
        @media (min-width: 900px) {
          .pg-grid { 
            grid-template-columns: minmax(400px, 1fr) minmax(300px, 1fr); 
            gap: 40px;
          }
          .pg-right { 
            text-align: left; 
          }
        }
        @media (min-width: 1200px) {
          .pg-grid { 
            grid-template-columns: minmax(500px, 1fr) minmax(350px, 1fr); 
            gap: 50px;
          }
        }
      `}</style>
      </BackgroundSlider>
    </section>
  );
};

export default PhotoGallery;
