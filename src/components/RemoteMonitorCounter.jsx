"use client";
import { useEffect } from "react";

const RemoteMonitorCounter = () => {
  useEffect(() => {
    // Simple counter - har visit count karega
    const storedData = localStorage.getItem("remoteVisitData");
    const now = new Date();
    const currentTime = now.toLocaleString();

    const isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);
    const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";

    let visitData;

    if (storedData) {
      visitData = JSON.parse(storedData);
      visitData.totalVisits = (visitData.totalVisits || 0) + 1;
      visitData.lastVisit = currentTime;
      visitData.lastDevice = deviceType;

      visitData.visitHistory = visitData.visitHistory || [];
      visitData.visitHistory.push({
        time: currentTime,
        device: deviceType,
        userAgent: navigator.userAgent.substring(0, 50), // Short user agent
      });

      if (visitData.visitHistory.length > 100) {
        visitData.visitHistory = visitData.visitHistory.slice(-100);
      }
    } else {
      visitData = {
        totalVisits: 1,
        firstVisit: currentTime,
        lastVisit: currentTime,
        lastDevice: deviceType,
        visitHistory: [
          {
            time: currentTime,
            device: deviceType,
            userAgent: navigator.userAgent.substring(0, 50),
          },
        ],
      };
    }

    // Daily visits
    const today = now.toDateString();
    visitData.dailyVisits = visitData.dailyVisits || {};
    visitData.dailyVisits[today] = (visitData.dailyVisits[today] || 0) + 1;

    // Device-specific counts
    visitData.deviceCounts = visitData.deviceCounts || {};
    visitData.deviceCounts[deviceType] =
      (visitData.deviceCounts[deviceType] || 0) + 1;

    localStorage.setItem("remoteVisitData", JSON.stringify(visitData));

    // **SIMPLE CONSOLE MESSAGE - Har device pe dikhega**
    console.log(
      `%c🔔 Visit #${visitData.totalVisits} from ${deviceType}`,
      "color: #10b981; font-size: 14px;"
    );

    // **REMOTE MONITORING FUNCTIONS - Laptop pe use karo**
    window.monitorVisits = function () {
      const data = JSON.parse(localStorage.getItem("remoteVisitData") || "{}");

      console.log(
        `%c📡 REMOTE MONITORING DASHBOARD`,
        "color: #ec4899; font-size: 24px; font-weight: bold;"
      );
      console.log(
        `%c📊 TOTAL VISITS: ${data.totalVisits || 0}`,
        "color: #f472b6; font-size: 20px; font-weight: bold;"
      );

      if (data.lastVisit) {
        console.log(
          `%c⏰ Last Visit: ${data.lastVisit}`,
          "color: #a78bfa; font-size: 16px;"
        );
        console.log(
          `%c📱 Last Device: ${data.lastDevice}`,
          "color: #34d399; font-size: 16px;"
        );
      }

      // Device breakdown
      if (data.deviceCounts) {
        console.log(
          `%c📱 DEVICE BREAKDOWN:`,
          "color: #fbbf24; font-size: 16px; font-weight: bold;"
        );
        Object.entries(data.deviceCounts).forEach(([device, count]) => {
          console.log(
            `%c   ${device}: ${count} visits`,
            "color: #fde68a; font-size: 14px;"
          );
        });
      }

      // Recent activity (last 10)
      if (data.visitHistory && data.visitHistory.length > 0) {
        console.log(
          `%c🕓 RECENT ACTIVITY:`,
          "color: #60a5fa; font-size: 16px; font-weight: bold;"
        );
        const recent = data.visitHistory.slice(-10).reverse();
        recent.forEach((visit, index) => {
          const timeAgo = getTimeAgo(visit.time);
          console.log(
            `%c   ${index + 1}. ${visit.time} - ${visit.device} (${timeAgo})`,
            "color: #d1d5db; font-size: 12px;"
          );
        });
      }

      // Live status
      console.log(
        `%c🟢 LIVE: Monitoring active - refresh page for updates`,
        "color: #10b981; font-size: 12px; font-weight: bold;"
      );
    };

    // Time ago helper function
    function getTimeAgo(timestamp) {
      const now = new Date();
      const visitTime = new Date(timestamp);
      const diffMs = now - visitTime;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${Math.floor(diffHours / 24)}d ago`;
    }

    // Quick status check
    window.quickCheck = function () {
      const data = JSON.parse(localStorage.getItem("remoteVisitData") || "{}");
      const lastVisit = data.lastVisit ? getTimeAgo(data.lastVisit) : "Never";

      console.log(
        `%c🔍 QUICK STATUS: ${
          data.totalVisits || 0
        } visits | Last: ${lastVisit} | Device: ${data.lastDevice || "None"}`,
        "color: #8b5cf6; font-size: 14px; font-weight: bold;"
      );
    };

    // Reset function
    window.resetMonitor = function () {
      localStorage.removeItem("remoteVisitData");
      console.log(
        `%c🔄 Monitor reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };
  }, []);

  return null;
};

export default RemoteMonitorCounter;
