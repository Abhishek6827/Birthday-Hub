"use client";
import { useEffect } from "react";

const BackendVisitCounter = () => {
  useEffect(() => {
    // Backend URL
    const backendUrl = "https://birthday-hub.onrender.com";

    const trackVisit = async () => {
      try {
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "mobile" : "desktop";

        console.log(
          `%c📡 Sending visit to backend...`,
          "color: #f59e0b; font-size: 14px;"
        );

        const response = await fetch(`${backendUrl}/api/track-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceType: deviceType,
            userAgent: navigator.userAgent.substring(0, 100),
          }),
        });

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Success message
        console.log(
          `%c🌐 BACKEND VISIT #${data.totalVisits}`,
          "color: #ec4899; font-size: 20px; font-weight: bold;"
        );
        console.log(
          `%c📱 ${isMobile ? "📱 Mobile" : "💻 Desktop"} | Your Visits: ${
            data.deviceVisits
          }`,
          "color: #a78bfa; font-size: 14px;"
        );
        console.log(
          `%c👥 Total Visits: ${data.totalVisits}`,
          "color: #34d399; font-size: 16px; font-weight: bold;"
        );
      } catch (error) {
        console.log(
          `%c⚠️ Backend connection failed: ${error.message}`,
          "color: #f59e0b; font-size: 14px; font-weight: bold;"
        );
        console.log(
          `%c💡 Backend might be starting up... try again in 30 seconds`,
          "color: #6b7280; font-size: 12px;"
        );
      }
    };

    trackVisit();

    // Global functions
    window.getBackendAnalytics = async function () {
      try {
        const response = await fetch(`${backendUrl}/api/analytics`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(
          `%c📊 BACKEND ANALYTICS`,
          "color: #ec4899; font-size: 24px; font-weight: bold;"
        );

        console.log(
          `%c👥 TOTAL VISITS: ${data.totalVisits}`,
          "color: #f472b6; font-size: 20px; font-weight: bold;"
        );

        console.log(
          `%c📱 UNIQUE DEVICES: ${data.uniqueDevices}`,
          "color: #a78bfa; font-size: 16px;"
        );

        // Device breakdown
        if (data.deviceCounts) {
          console.log(
            `%c📟 DEVICE BREAKDOWN:`,
            "color: #34d399; font-size: 16px; font-weight: bold;"
          );
          console.log(
            `%c   📱 Mobile: ${data.deviceCounts.mobile} visits`,
            "color: #a7f3d0; font-size: 14px;"
          );
          console.log(
            `%c   💻 Desktop: ${data.deviceCounts.desktop} visits`,
            "color: #a7f3d0; font-size: 14px;"
          );
        }
      } catch (error) {
        console.log(
          `%c❌ Backend unavailable: ${error.message}`,
          "color: #ef4444; font-size: 16px; font-weight: bold;"
        );
      }
    };
  }, []);

  return null;
};

export default BackendVisitCounter;
