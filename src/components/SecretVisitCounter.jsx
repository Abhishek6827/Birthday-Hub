"use client";
import { useEffect } from "react";

const SecretVisitCounter = () => {
  useEffect(() => {
    // Smart detection - tumhare testing ko ignore karega
    const shouldCountVisit = () => {
      const now = Date.now();
      const lastVisitTime = localStorage.getItem("lastRealVisitTime");

      // Agar 5 minute ke andar visit, probably tum testing kar rahe ho
      if (lastVisitTime && now - parseInt(lastVisitTime) < 300000) {
        // 5 minutes
        return false;
      }

      // Additional check - agar same session mein multiple visits
      const sessionVisits = parseInt(
        sessionStorage.getItem("sessionVisits") || "0"
      );
      if (sessionVisits > 2) {
        return false; // Tum testing kar rahe ho
      }

      sessionStorage.setItem("sessionVisits", (sessionVisits + 1).toString());
      localStorage.setItem("lastRealVisitTime", now.toString());
      return true;
    };

    if (shouldCountVisit()) {
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

        if (visitData.visitHistory.length > 50) {
          visitData.visitHistory = visitData.visitHistory.slice(-50);
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

      // Save data
      localStorage.setItem("secretVisitData", JSON.stringify(visitData));

      console.log(
        `%c💝 VISIT COUNTED! #${visitData.totalVisits}`,
        "color: #ec4899; font-size: 18px; font-weight: bold;"
      );
      console.log(
        `%c📊 Total Visits: ${visitData.totalVisits}`,
        "color: #f472b6; font-size: 14px; font-weight: bold;"
      );
      console.log(
        `%c🕐 Current Visit: ${currentTime}`,
        "color: #a78bfa; font-size: 12px;"
      );
      console.log(
        `%c📱 Device: ${
          /Mobile/.test(navigator.userAgent) ? "Mobile" : "Desktop"
        }`,
        "color: #34d399; font-size: 12px;"
      );
    } else {
      console.log(
        `%c⏸️ Quick refresh - not counting`,
        "color: #6b7280; font-size: 10px;"
      );
    }

    // Global function banayein jo kahi bhi call kar sakein
    window.showAllVisitData = function () {
      const data = JSON.parse(localStorage.getItem("secretVisitData") || "{}");
      console.log(
        `%c📈 COMPLETE VISIT ANALYTICS`,
        "color: #ec4899; font-size: 20px; font-weight: bold;"
      );
      console.log(
        `%cTotal Visits: ${data.totalVisits || 0}`,
        "color: #f472b6; font-size: 16px;"
      );
      console.log(
        `%cFirst Visit: ${data.firstVisit || "N/A"}`,
        "color: #60a5fa; font-size: 14px;"
      );
      console.log(
        `%cLast Visit: ${data.lastVisit || "N/A"}`,
        "color: #60a5fa; font-size: 14px;"
      );

      if (data.dailyVisits) {
        console.log(
          `%c📅 Daily Visits:`,
          "color: #34d399; font-size: 14px; font-weight: bold;"
        );
        Object.entries(data.dailyVisits).forEach(([date, count]) => {
          console.log(
            `%c   ${date}: ${count} times`,
            "color: #a7f3d0; font-size: 12px;"
          );
        });
      }

      if (data.visitHistory && data.visitHistory.length > 0) {
        console.log(
          `%c🕓 Complete Visit History (${data.visitHistory.length} visits):`,
          "color: #fbbf24; font-size: 14px; font-weight: bold;"
        );
        data.visitHistory.reverse().forEach((visit, index) => {
          console.log(
            `%c   ${index + 1}. ${visit}`,
            "color: #d1d5db; font-size: 11px;"
          );
        });
      }
    };

    // Force count function - agar manually count karna ho
    window.forceCountVisit = function () {
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
      } else {
        visitData = {
          totalVisits: 1,
          firstVisit: currentTime,
          lastVisit: currentTime,
          visitHistory: [currentTime],
        };
      }

      localStorage.setItem("secretVisitData", JSON.stringify(visitData));
      console.log(
        `%c🔢 MANUALLY COUNTED! Total: ${visitData.totalVisits}`,
        "color: #f59e0b; font-size: 16px; font-weight: bold;"
      );
    };

    // Reset function
    window.resetVisitData = function () {
      localStorage.removeItem("secretVisitData");
      localStorage.removeItem("lastRealVisitTime");
      sessionStorage.removeItem("sessionVisits");
      console.log(
        `%c🔄 All visit data has been reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };
  }, []);

  return null;
};

export default SecretVisitCounter;
