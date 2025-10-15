"use client";
import { useEffect } from "react";

const SecretVisitCounter = () => {
  useEffect(() => {
    // Simple - har visit count karo
    const storedData = localStorage.getItem("secretVisitData");
    const now = new Date();
    const currentTime = now.toLocaleString();

    let visitData;

    if (storedData) {
      visitData = JSON.parse(storedData);
      visitData.totalVisits = (visitData.totalVisits || 0) + 1;
      visitData.lastVisit = currentTime;
      visitData.visitHistory = visitData.visitHistory || [];
      visitData.visitHistory.push(currentTime);

      // Max 100 visits keep karein
      if (visitData.visitHistory.length > 100) {
        visitData.visitHistory = visitData.visitHistory.slice(-100);
      }
    } else {
      visitData = {
        totalVisits: 1,
        firstVisit: currentTime,
        lastVisit: currentTime,
        visitHistory: [currentTime],
      };
    }

    // Daily visits track karein
    const today = now.toDateString();
    visitData.dailyVisits = visitData.dailyVisits || {};
    visitData.dailyVisits[today] = (visitData.dailyVisits[today] || 0) + 1;

    // Device type track karein
    const deviceType = /Mobile/.test(navigator.userAgent)
      ? "📱 Mobile"
      : "💻 Desktop";
    visitData.deviceTypes = visitData.deviceTypes || {};
    visitData.deviceTypes[deviceType] =
      (visitData.deviceTypes[deviceType] || 0) + 1;

    // Save data
    localStorage.setItem("secretVisitData", JSON.stringify(visitData));

    // Automatic console message har visit pe
    console.log(
      `%c💝 VISIT #${visitData.totalVisits}`,
      "color: #ec4899; font-size: 20px; font-weight: bold;"
    );
    console.log(
      `%c📊 Total Visits: ${visitData.totalVisits}`,
      "color: #f472b6; font-size: 16px; font-weight: bold;"
    );
    console.log(
      `%c🕐 Time: ${currentTime}`,
      "color: #a78bfa; font-size: 14px;"
    );
    console.log(`%c${deviceType}`, "color: #34d399; font-size: 14px;");
    console.log(
      `%c📅 Today: ${visitData.dailyVisits[today]} visits`,
      "color: #fbbf24; font-size: 12px;"
    );

    // Global function banayein jo kahi bhi call kar sakein
    window.showAllVisitData = function () {
      const data = JSON.parse(localStorage.getItem("secretVisitData") || "{}");

      console.log(
        `%c📈 COMPLETE VISIT ANALYTICS`,
        "color: #ec4899; font-size: 24px; font-weight: bold;"
      );
      console.log(
        `%c👥 Total Visits: ${data.totalVisits || 0}`,
        "color: #f472b6; font-size: 18px; font-weight: bold;"
      );

      if (data.firstVisit) {
        console.log(
          `%c🌟 First Visit: ${data.firstVisit}`,
          "color: #60a5fa; font-size: 14px;"
        );
      }
      if (data.lastVisit) {
        console.log(
          `%c🕐 Last Visit: ${data.lastVisit}`,
          "color: #60a5fa; font-size: 14px;"
        );
      }

      // Device types analytics
      if (data.deviceTypes) {
        console.log(
          `%c📱 Device Types:`,
          "color: #34d399; font-size: 16px; font-weight: bold;"
        );
        Object.entries(data.deviceTypes).forEach(([device, count]) => {
          console.log(
            `%c   ${device}: ${count} visits`,
            "color: #a7f3d0; font-size: 14px;"
          );
        });
      }

      // Daily visits
      if (data.dailyVisits) {
        console.log(
          `%c📅 Daily Visits:`,
          "color: #fbbf24; font-size: 16px; font-weight: bold;"
        );
        Object.entries(data.dailyVisits)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
          .forEach(([date, count]) => {
            console.log(
              `%c   ${date}: ${count} times`,
              "color: #fde68a; font-size: 12px;"
            );
          });
      }

      // Recent visits (last 10)
      if (data.visitHistory && data.visitHistory.length > 0) {
        console.log(
          `%c🕓 Recent Visits (last 10):`,
          "color: #c084fc; font-size: 16px; font-weight: bold;"
        );
        const recentVisits = data.visitHistory.slice(-10).reverse();
        recentVisits.forEach((visit, index) => {
          const device = /Mobile/.test(navigator.userAgent) ? "📱" : "💻";
          console.log(
            `%c   ${index + 1}. ${visit} ${device}`,
            "color: #d1d5db; font-size: 11px;"
          );
        });
      }

      console.log(
        `%c🎯 Every visit is counted - yours, hers, anyone!`,
        "color: #10b981; font-size: 12px; font-style: italic;"
      );
    };

    // Reset function
    window.resetVisitData = function () {
      localStorage.removeItem("secretVisitData");
      console.log(
        `%c🔄 All visit data has been reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };

    // Add manual visit function
    window.addManualVisit = function () {
      const storedData = localStorage.getItem("secretVisitData");
      const now = new Date().toLocaleString();

      let visitData = storedData
        ? JSON.parse(storedData)
        : {
            totalVisits: 0,
            visitHistory: [],
          };

      visitData.totalVisits += 1;
      visitData.lastVisit = now;
      visitData.visitHistory.push(now);

      localStorage.setItem("secretVisitData", JSON.stringify(visitData));

      console.log(
        `%c🔢 MANUAL VISIT ADDED! Total: ${visitData.totalVisits}`,
        "color: #f59e0b; font-size: 16px; font-weight: bold;"
      );
    };
  }, []);

  return null;
};

export default SecretVisitCounter;
