"use client";
import { useEffect } from "react";

const SecretVisitCounter = () => {
  useEffect(() => {
    // Advanced device fingerprinting
    const getDeviceFingerprint = () => {
      const fingerprint = {
        userAgent: navigator.userAgent,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // Additional unique identifiers
        deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
        touchSupport: "ontouchstart" in window,
      };
      return JSON.stringify(fingerprint);
    };

    // Check if this is a NEW device (pehli baar visit)
    const isNewDevice = () => {
      const currentFingerprint = getDeviceFingerprint();
      const knownDevices = JSON.parse(
        localStorage.getItem("knownDevices") || "[]"
      );

      // Agar yeh device pehle se known nahi hai
      if (!knownDevices.includes(currentFingerprint)) {
        // Naya device add karo
        knownDevices.push(currentFingerprint);
        localStorage.setItem("knownDevices", JSON.stringify(knownDevices));
        return true;
      }

      return false;
    };

    // Time-based filter (tumhare testing ko ignore karega)
    const isRealVisit = () => {
      const lastVisitTime = localStorage.getItem("lastVisitTimestamp");
      const now = Date.now();

      // Agar 1 minute ke andar multiple visits, ignore karo
      if (lastVisitTime && now - parseInt(lastVisitTime) < 60000) {
        return false;
      }

      localStorage.setItem("lastVisitTimestamp", now.toString());
      return true;
    };

    // MAIN LOGIC: Sirf naye devices count karo
    if (isNewDevice() && isRealVisit()) {
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
        `%c🎯 NEW DEVICE VISIT DETECTED!`,
        "color: #10b981; font-size: 18px; font-weight: bold;"
      );
      console.log(
        `%c📊 Total Unique Devices: ${visitData.totalVisits}`,
        "color: #f472b6; font-size: 14px; font-weight: bold;"
      );
      console.log(
        `%c📱 Device Type: ${JSON.parse(getDeviceFingerprint()).deviceType}`,
        "color: #a78bfa; font-size: 12px;"
      );
    } else {
      console.log(
        `%c👨‍💻 Known device - not counting`,
        "color: #6b7280; font-size: 10px;"
      );
    }

    // Global function banayein jo kahi bhi call kar sakein
    window.showAllVisitData = function () {
      const data = JSON.parse(localStorage.getItem("secretVisitData") || "{}");
      const knownDevices = JSON.parse(
        localStorage.getItem("knownDevices") || "[]"
      );

      console.log(
        `%c📈 UNIQUE VISIT ANALYTICS`,
        "color: #ec4899; font-size: 20px; font-weight: bold;"
      );
      console.log(
        `%cTotal Unique Devices: ${data.totalVisits || 0}`,
        "color: #f472b6; font-size: 16px;"
      );
      console.log(
        `%cKnown Devices: ${knownDevices.length}`,
        "color: #60a5fa; font-size: 14px;"
      );

      if (data.firstVisit) {
        console.log(
          `%cFirst Visit: ${data.firstVisit}`,
          "color: #60a5fa; font-size: 14px;"
        );
      }
      if (data.lastVisit) {
        console.log(
          `%cLast Visit: ${data.lastVisit}`,
          "color: #60a5fa; font-size: 14px;"
        );
      }

      if (data.visitHistory && data.visitHistory.length > 0) {
        console.log(
          `%c🕓 Unique Visit History:`,
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

    // Debug function - current device dekhne ke liye
    window.showMyDevice = function () {
      console.log(
        `%c🔍 YOUR CURRENT DEVICE FINGERPRINT`,
        "color: #3b82f6; font-size: 14px; font-weight: bold;"
      );
      console.log(JSON.parse(getDeviceFingerprint()));
    };

    // Reset function
    window.resetVisitData = function () {
      localStorage.removeItem("secretVisitData");
      localStorage.removeItem("knownDevices");
      localStorage.removeItem("lastVisitTimestamp");
      console.log(
        `%c🔄 All visit data has been reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };
  }, []);

  return null;
};

export default SecretVisitCounter;
