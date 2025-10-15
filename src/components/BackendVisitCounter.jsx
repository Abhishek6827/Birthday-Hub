"use client";
import { useEffect } from "react";

const BackendVisitCounter = () => {
  useEffect(() => {
    const backendUrl = "https://birthday-hub.onrender.com";

    // Indian time format function
    const getIndianTime = () => {
      return new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    };

    const trackVisit = async () => {
      try {
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "mobile" : "desktop";
        const currentTime = getIndianTime();

        console.log(
          `%c🔄 Tracking visit...`,
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

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // 🎉 SUCCESS MESSAGE - AUTOMATICALLY DISPLAYED
        console.log(
          `%c🌐 WEBSITE VISIT RECORDED!`,
          "color: #ec4899; font-size: 22px; font-weight: bold;"
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
          "color: #f472b6; font-size: 15px;"
        );
        console.log(
          `%c👥 Total Visits: ${data.totalVisits}`,
          "color: #10b981; font-size: 17px; font-weight: bold;"
        );
        console.log(""); // Empty line

        // Auto-show analytics after 2 seconds
        setTimeout(() => {
          showCompleteAnalytics();
        }, 2000);
      } catch (error) {
        console.log(
          `%c⚠️ Backend offline - using local storage`,
          "color: #f59e0b; font-size: 14px; font-weight: bold;"
        );

        // Fallback to localStorage
        const localCount =
          parseInt(localStorage.getItem("fallbackVisits") || "0") + 1;
        localStorage.setItem("fallbackVisits", localCount.toString());

        const currentTime = getIndianTime();
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );

        console.log(
          `%c📱 ${isMobile ? "📱 Mobile" : "💻 Desktop"}`,
          "color: #a78bfa; font-size: 16px;"
        );
        console.log(
          `%c🕐 Time: ${currentTime}`,
          "color: #34d399; font-size: 14px;"
        );
        console.log(
          `%c🔢 Local Count: ${localCount}`,
          "color: #f472b6; font-size: 15px;"
        );
      }
    };

    const showCompleteAnalytics = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/analytics`);

        if (response.ok) {
          const data = await response.json();

          console.log(
            `%c📊 COMPLETE VISIT ANALYTICS`,
            "color: #8b5cf6; font-size: 20px; font-weight: bold;"
          );
          console.log(
            `%c👥 Total Visits: ${data.totalVisits || 0}`,
            "color: #ec4899; font-size: 18px; font-weight: bold;"
          );
          console.log(
            `%c📱 Unique Devices: ${data.uniqueDevices || 0}`,
            "color: #a78bfa; font-size: 16px;"
          );

          if (data.deviceCounts) {
            console.log(
              `%c📟 Device Breakdown:`,
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

          if (data.recentVisits && data.recentVisits.length > 0) {
            console.log(
              `%c🕓 Recent Activity (Last ${Math.min(
                10,
                data.recentVisits.length
              )}):`,
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

          console.log(
            `%c✅ Everything working automatically!`,
            "color: #10b981; font-size: 12px; font-style: italic;"
          );
        }
      } catch (error) {
        // Silent fail for analytics
      }
    };

    // Start tracking
    trackVisit();
  }, []);

  return null;
};

export default BackendVisitCounter;
