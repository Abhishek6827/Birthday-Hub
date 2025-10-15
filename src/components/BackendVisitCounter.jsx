"use client";
import { useEffect } from "react";

const BackendVisitCounter = () => {
  useEffect(() => {
    // Backend URL - local testing ke liye
    const backendUrl = "http://localhost:3001";

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
        // Backend offline
        console.log(
          `%c⚠️ Backend offline - check if server is running`,
          "color: #f59e0b; font-size: 14px; font-weight: bold;"
        );
        console.log(
          `%c💡 Run this command: node server.js`,
          "color: #6b7280; font-size: 12px;"
        );
      }
    };

    trackVisit();

    // Global functions
    window.getBackendAnalytics = async function () {
      try {
        console.log(
          `%c📡 Fetching analytics...`,
          "color: #f59e0b; font-size: 14px;"
        );

        const response = await fetch(`${backendUrl}/api/analytics`);
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

        // Recent visits
        if (data.recentVisits && data.recentVisits.length > 0) {
          console.log(
            `%c🕓 RECENT VISITS:`,
            "color: #fbbf24; font-size: 16px; font-weight: bold;"
          );
          data.recentVisits.slice(0, 10).forEach((visit, index) => {
            console.log(
              `%c   ${index + 1}. ${visit.timestamp} - ${
                visit.deviceType === "mobile" ? "📱" : "💻"
              } ${visit.deviceType}`,
              "color: #d1d5db; font-size: 11px;"
            );
          });
        }
      } catch (error) {
        console.log(
          `%c❌ Backend unavailable - server not running`,
          "color: #ef4444; font-size: 16px; font-weight: bold;"
        );
        console.log(
          `%c💡 Run this command in terminal:`,
          "color: #6b7280; font-size: 12px;"
        );
        console.log(
          `%c   cd visit-tracker-backend && node server.js`,
          "color: #3b82f6; font-size: 12px; font-family: monospace;"
        );
      }
    };

    window.resetBackendData = async function () {
      try {
        const response = await fetch(`${backendUrl}/api/reset`, {
          method: "DELETE",
        });
        const data = await response.json();
        console.log(
          `%c🔄 ${data.message}`,
          "color: #10b981; font-size: 16px; font-weight: bold;"
        );
      } catch (error) {
        console.log(
          `%c❌ Reset failed - backend offline`,
          "color: #ef4444; font-size: 16px;"
        );
      }
    };
  }, []);

  return null;
};

export default BackendVisitCounter;
