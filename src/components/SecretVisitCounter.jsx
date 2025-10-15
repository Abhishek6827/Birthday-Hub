"use client";
import { useEffect, useState } from "react";

const RealTimeVisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Initial count load karein
    const loadInitialData = () => {
      const storedData = localStorage.getItem("realTimeVisitData");
      if (storedData) {
        const data = JSON.parse(storedData);
        setVisitCount(data.totalVisits || 0);
        return data;
      }
      return {
        totalVisits: 0,
        visitHistory: [],
        sessions: [],
      };
    };

    let visitData = loadInitialData();

    // Visit count function
    const countVisit = (type = "pageview") => {
      const now = new Date();
      const currentTime = now.toLocaleString();

      visitData.totalVisits = (visitData.totalVisits || 0) + 1;
      visitData.lastVisit = currentTime;
      visitData.visitHistory = visitData.visitHistory || [];
      visitData.visitHistory.push({
        time: currentTime,
        type: type,
        device: /Mobile/.test(navigator.userAgent) ? "mobile" : "desktop",
      });

      // Max 200 visits keep karein
      if (visitData.visitHistory.length > 200) {
        visitData.visitHistory = visitData.visitHistory.slice(-200);
      }

      // Daily visits track karein
      const today = now.toDateString();
      visitData.dailyVisits = visitData.dailyVisits || {};
      visitData.dailyVisits[today] = (visitData.dailyVisits[today] || 0) + 1;

      // Save data
      localStorage.setItem("realTimeVisitData", JSON.stringify(visitData));
      setVisitCount(visitData.totalVisits);

      // Real-time console update
      console.log(
        `%c🎯 REAL-TIME VISIT #${visitData.totalVisits}`,
        "color: #ec4899; font-size: 16px; font-weight: bold;"
      );
      console.log(
        `%c📊 Type: ${type} | Device: ${
          visitData.visitHistory[visitData.visitHistory.length - 1].device
        }`,
        "color: #a78bfa; font-size: 12px;"
      );
    };

    // 1. Page load pe count
    countVisit("pageview");

    // 2. Page visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(() => {
          countVisit("tab_switch");
        }, 1000);
      }
    };

    // 3. Window focus (browser focus)
    const handleFocus = () => {
      setTimeout(() => {
        countVisit("focus");
      }, 1000);
    };

    // 4. Mouse movement (activity detection)
    let activityTimeout;
    const handleActivity = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        countVisit("activity");
      }, 30000); // 30 seconds of inactivity
    };

    // 5. Before unload (closing tab)
    const handleBeforeUnload = () => {
      countVisit("page_exit");
    };

    // Event listeners setup
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keypress", handleActivity);
    document.addEventListener("click", handleActivity);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Real-time display element create karein (optional)
    const createRealTimeDisplay = () => {
      const existingDisplay = document.getElementById(
        "real-time-visit-counter"
      );
      if (existingDisplay) existingDisplay.remove();

      const display = document.createElement("div");
      display.id = "real-time-visit-counter";
      display.innerHTML = `
        <div style="
          position: fixed;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 10px;
          border-radius: 10px;
          font-size: 12px;
          z-index: 10000;
          border: 1px solid #ec4899;
          backdrop-filter: blur(10px);
        ">
          <div>👁️ Live Visits: <strong>${visitData.totalVisits}</strong></div>
          <div style="font-size: 10px; opacity: 0.8;">Real-time Tracking</div>
        </div>
      `;
      document.body.appendChild(display);
    };

    createRealTimeDisplay();

    // Global functions
    window.showRealTimeStats = function () {
      const data = JSON.parse(
        localStorage.getItem("realTimeVisitData") || "{}"
      );

      console.log(
        `%c📊 REAL-TIME ANALYTICS`,
        "color: #ec4899; font-size: 20px; font-weight: bold;"
      );
      console.log(
        `%cTotal Visits: ${data.totalVisits || 0}`,
        "color: #f472b6; font-size: 16px;"
      );

      if (data.visitHistory && data.visitHistory.length > 0) {
        console.log(
          `%c🕓 Visit Types:`,
          "color: #34d399; font-size: 14px; font-weight: bold;"
        );

        const typeCounts = {};
        data.visitHistory.forEach((visit) => {
          typeCounts[visit.type] = (typeCounts[visit.type] || 0) + 1;
        });

        Object.entries(typeCounts).forEach(([type, count]) => {
          console.log(
            `%c   ${type}: ${count} times`,
            "color: #a7f3d0; font-size: 12px;"
          );
        });
      }
    };

    window.resetRealTimeData = function () {
      localStorage.removeItem("realTimeVisitData");
      setVisitCount(0);
      console.log(
        `%c🔄 Real-time data reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keypress", handleActivity);
      document.removeEventListener("click", handleActivity);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearTimeout(activityTimeout);
    };
  }, []);

  return null;
};

export default RealTimeVisitCounter;
