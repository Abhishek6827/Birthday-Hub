"use client";
import { useEffect, useState } from "react";

const BackendVisitCounter = () => {
  const [visitInfo, setVisitInfo] = useState(null);

  useEffect(() => {
    // Backend URL
    const backendUrl = "https://birthday-hub.onrender.com";

    const trackVisit = async () => {
      try {
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "mobile" : "desktop";

        // BETTER TIME FORMAT - YEH CHANGE KARO
        const currentTime = new Date().toLocaleString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Success message with PROPER TIME FORMAT
        console.log(
          `%c🌐 WEBSITE VISITED!`,
          "color: #ec4899; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
        );
        console.log(
          `%c📱 Device: ${isMobile ? "📱 Mobile" : "💻 Desktop"}`,
          "color: #a78bfa; font-size: 16px; font-weight: bold;"
        );
        console.log(
          `%c🕐 Time: ${currentTime}`,
          "color: #34d399; font-size: 14px; font-weight: bold;"
        );
        console.log(
          `%c🔢 Your Visits: ${data.deviceVisits}`,
          "color: #f472b6; font-size: 16px;"
        );
        console.log(
          `%c👥 Total Website Visits: ${data.totalVisits}`,
          "color: #10b981; font-size: 18px; font-weight: bold;"
        );
        console.log(""); // Empty line

        // Auto-show COMPLETE ANALYTICS after 3 seconds
        setTimeout(() => {
          showCompleteAnalytics();
        }, 3000);
      } catch (error) {
        console.log(
          `%c⚠️ Backend connection failed: ${error.message}`,
          "color: #f59e0b; font-size: 14px; font-weight: bold;"
        );

        // Fallback to localStorage with PROPER TIME
        const localCount =
          parseInt(localStorage.getItem("fallbackVisits") || "0") + 1;
        localStorage.setItem("fallbackVisits", localCount.toString());

        const currentTime = new Date().toLocaleString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );

        console.log(
          `%c📱 OFFLINE MODE - ${isMobile ? "📱 Mobile" : "💻 Desktop"}`,
          "color: #f59e0b; font-size: 16px;"
        );
        console.log(
          `%c🕐 Time: ${currentTime}`,
          "color: #34d399; font-size: 14px; font-weight: bold;"
        );
        console.log(
          `%c🔢 Local Visits: ${localCount}`,
          "color: #f472b6; font-size: 16px;"
        );
      }
    };

    trackVisit();
  }, []);

  // Complete analytics with full history
  const showCompleteAnalytics = async () => {
    try {
      const backendUrl = "https://birthday-hub.onrender.com";
      const response = await fetch(`${backendUrl}/api/analytics`);

      if (response.ok) {
        const data = await response.json();

        // AUTOMATIC COMPLETE HISTORY DISPLAY
        console.log(
          `%c📊 COMPLETE VISIT HISTORY`,
          "color: #8b5cf6; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
        );

        // Overall Statistics
        console.log(
          `%c📈 OVERALL STATISTICS`,
          "color: #ec4899; font-size: 18px; font-weight: bold;"
        );
        console.log(
          `%c👥 TOTAL VISITS: ${data.totalVisits || 0}`,
          "color: #f472b6; font-size: 20px; font-weight: bold;"
        );
        console.log(
          `%c📱 UNIQUE DEVICES: ${data.uniqueDevices || 0}`,
          "color: #a78bfa; font-size: 16px;"
        );

        // Device breakdown
        if (data.deviceCounts) {
          console.log(
            `%c📟 DEVICE BREAKDOWN:`,
            "color: #34d399; font-size: 16px; font-weight: bold;"
          );
          console.log(
            `%c   📱 Mobile: ${data.deviceCounts.mobile || 0} visits`,
            "color: #a7f3d0; font-size: 14px;"
          );
          console.log(
            `%c   💻 Desktop: ${data.deviceCounts.desktop || 0} visits`,
            "color: #a7f3d0; font-size: 14px;"
          );
        }

        // Recent visits (last 30) with PROPER TIME FORMAT
        if (data.recentVisits && data.recentVisits.length > 0) {
          const recentCount = Math.min(30, data.recentVisits.length);
          console.log(
            `%c🕓 RECENT VISITS (Last ${recentCount}):`,
            "color: #fbbf24; font-size: 16px; font-weight: bold;"
          );
          data.recentVisits.slice(0, recentCount).forEach((visit, index) => {
            console.log(
              `%c   ${index + 1}. ${visit.timestamp} - ${
                visit.deviceType === "mobile" ? "📱" : "💻"
              } ${visit.deviceType}`,
              "color: #d1d5db; font-size: 11px;"
            );
          });
        }

        console.log(""); // Empty line
        console.log(
          `%c🎯 Tracking active - All times in Indian format`,
          "color: #10b981; font-size: 12px; font-style: italic;"
        );
      }
    } catch (error) {
      // Silent fail
    }
  };

  return null;
};

export default BackendVisitCounter;
