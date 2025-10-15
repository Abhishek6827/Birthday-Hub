"use client";
import { useEffect } from "react";

const SecretVisitCounter = () => {
  useEffect(() => {
    // Existing data get karein
    const storedData = localStorage.getItem("secretVisitData");
    const now = new Date();
    const currentTime = now.toLocaleString();

    let visitData;

    if (storedData) {
      visitData = JSON.parse(storedData);
      // Count increase karein
      visitData.totalVisits = (visitData.totalVisits || 0) + 1;
      visitData.lastVisit = currentTime;

      // Visit history maintain karein (last 50 visits)
      visitData.visitHistory = visitData.visitHistory || [];
      visitData.visitHistory.push(currentTime);

      // Max 50 visits keep karein
      if (visitData.visitHistory.length > 50) {
        visitData.visitHistory = visitData.visitHistory.slice(-50);
      }
    } else {
      // First visit
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

    // Automatic console message har visit pe
    console.log(
      `%c💝 SECRET VISIT TRACKER`,
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
      `%c📅 Today's Visits: ${visitData.dailyVisits[today]}`,
      "color: #34d399; font-size: 12px;"
    );

    // Recent visits show karein (last 5)
    if (visitData.visitHistory && visitData.visitHistory.length > 0) {
      console.log(
        `%c🕓 Recent Visits:`,
        "color: #fbbf24; font-size: 12px; font-weight: bold;"
      );
      const recentVisits = visitData.visitHistory.slice(-5).reverse();
      recentVisits.forEach((visit, index) => {
        console.log(
          `%c   ${index + 1}. ${visit}`,
          "color: #d1d5db; font-size: 11px;"
        );
      });
    }

    // First visit show karein
    if (visitData.firstVisit) {
      console.log(
        `%c🌟 First Visit: ${visitData.firstVisit}`,
        "color: #60a5fa; font-size: 11px;"
      );
    }

    console.log(
      `%c👻 This is our little secret!`,
      "color: #10b981; font-size: 10px; font-style: italic;"
    );

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

    // Extra: Reset function bhi add kar deta hoon
    window.resetVisitData = function () {
      localStorage.removeItem("secretVisitData");
      console.log(
        `%c🔄 Visit data has been reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };
  }, []);

  return null;
};

export default SecretVisitCounter;
