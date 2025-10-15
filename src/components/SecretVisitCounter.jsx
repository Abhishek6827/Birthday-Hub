"use client";
import { useEffect } from "react";

const DeviceSpecificVisitCounter = () => {
  useEffect(() => {
    // Unique device ID generate karega
    const getDeviceId = () => {
      let deviceId = localStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId =
          "device-" +
          Math.random().toString(36).substr(2, 9) +
          "-" +
          Date.now();
        localStorage.setItem("deviceId", deviceId);
      }
      return deviceId;
    };

    const deviceId = getDeviceId();
    const isMobile = /Mobile/.test(navigator.userAgent);
    const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";

    // Device-specific data
    const storedData = localStorage.getItem("deviceVisitData");
    const now = new Date();
    const currentTime = now.toLocaleString();

    let visitData = storedData
      ? JSON.parse(storedData)
      : {
          totalDevices: 0,
          devices: {},
          globalVisits: 0,
        };

    // Current device ka data
    const currentDevice = visitData.devices[deviceId] || {
      visits: 0,
      firstVisit: currentTime,
      deviceType: deviceType,
      visitHistory: [],
    };

    // Current device ke visits increase karo
    currentDevice.visits += 1;
    currentDevice.lastVisit = currentTime;
    currentDevice.visitHistory.push(currentTime);

    // Global counts update karo
    if (!visitData.devices[deviceId]) {
      visitData.totalDevices += 1; // Naya device hai
    }
    visitData.globalVisits += 1;
    visitData.lastGlobalVisit = currentTime;

    // Save device data
    visitData.devices[deviceId] = currentDevice;

    // Save overall data
    localStorage.setItem("deviceVisitData", JSON.stringify(visitData));

    // Console output - HAR DEVICE KA ALAG COUNT
    console.log(
      `%c📱 DEVICE VISIT - ${deviceType}`,
      "color: #ec4899; font-size: 18px; font-weight: bold;"
    );
    console.log(
      `%cThis Device Visits: ${currentDevice.visits}`,
      "color: #f472b6; font-size: 14px; font-weight: bold;"
    );
    console.log(
      `%cTotal Devices: ${visitData.totalDevices}`,
      "color: #a78bfa; font-size: 12px;"
    );
    console.log(
      `%cGlobal Visits: ${visitData.globalVisits}`,
      "color: #34d399; font-size: 12px;"
    );
    console.log(
      `%cDevice ID: ${deviceId.substring(0, 10)}...`,
      "color: #6b7280; font-size: 10px;"
    );

    // Global functions
    window.showDeviceAnalytics = function () {
      const data = JSON.parse(localStorage.getItem("deviceVisitData") || "{}");

      console.log(
        `%c📊 DEVICE ANALYTICS`,
        "color: #ec4899; font-size: 22px; font-weight: bold;"
      );
      console.log(
        `%cTotal Unique Devices: ${data.totalDevices || 0}`,
        "color: #f472b6; font-size: 18px;"
      );
      console.log(
        `%cTotal Global Visits: ${data.globalVisits || 0}`,
        "color: #a78bfa; font-size: 16px;"
      );

      if (data.devices) {
        console.log(
          `%c📱 Individual Devices:`,
          "color: #34d399; font-size: 16px; font-weight: bold;"
        );
        Object.entries(data.devices).forEach(([deviceId, deviceData]) => {
          console.log(
            `%c   ${deviceData.deviceType}: ${deviceData.visits} visits (First: ${deviceData.firstVisit})`,
            "color: #a7f3d0; font-size: 12px;"
          );
        });
      }
    };

    window.showMyDeviceStats = function () {
      const data = JSON.parse(localStorage.getItem("deviceVisitData") || "{}");
      const currentDeviceId = localStorage.getItem("deviceId");
      const myDevice = data.devices?.[currentDeviceId];

      if (myDevice) {
        console.log(
          `%c🎯 YOUR DEVICE STATS`,
          "color: #3b82f6; font-size: 18px; font-weight: bold;"
        );
        console.log(
          `%cType: ${myDevice.deviceType}`,
          "color: #60a5fa; font-size: 14px;"
        );
        console.log(
          `%cYour Visits: ${myDevice.visits}`,
          "color: #60a5fa; font-size: 14px;"
        );
        console.log(
          `%cFirst Visit: ${myDevice.firstVisit}`,
          "color: #93c5fd; font-size: 12px;"
        );
        console.log(
          `%cLast Visit: ${myDevice.lastVisit}`,
          "color: #93c5fd; font-size: 12px;"
        );
      }
    };

    window.resetAllDeviceData = function () {
      localStorage.removeItem("deviceVisitData");
      localStorage.removeItem("deviceId");
      console.log(
        `%c🔄 All device data reset!`,
        "color: #ef4444; font-size: 16px; font-weight: bold;"
      );
    };
  }, []);

  return null;
};

export default DeviceSpecificVisitCounter;
