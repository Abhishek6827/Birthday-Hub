"use client";
import { useEffect } from "react";

const TelegramNotifier = () => {
  useEffect(() => {
    const sendTelegramAlert = async () => {
      try {
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";
        const currentTime = new Date().toLocaleString("en-IN");

        console.log(
          `%c🔄 Sending secure Telegram notification...`,
          "color: #f59e0b; font-size: 14px;"
        );

        // Backend API call - TOKEN SECURE HAI
        const response = await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceType,
            currentTime,
            userAgent: navigator.userAgent.substring(0, 100),
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log(
            `%c✅ Telegram notification sent!`,
            "color: #10b981; font-size: 16px; font-weight: bold;"
          );
          console.log(
            `%c📱 ${deviceType} at ${currentTime}`,
            "color: #a78bfa; font-size: 14px;"
          );
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.log(
          `%c⚠️ Telegram failed: ${error.message}`,
          "color: #f59e0b; font-size: 14px;"
        );

        // Fallback console log
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";
        const currentTime = new Date().toLocaleString("en-IN");

        console.log(
          `%c📱 ${deviceType} visited at ${currentTime}`,
          "color: #ec4899; font-size: 14px; font-weight: bold;"
        );
      }
    };

    // 2 second delay ke baad send kare
    setTimeout(() => {
      sendTelegramAlert();
    }, 2000);
  }, []);

  return null;
};

export default TelegramNotifier;
