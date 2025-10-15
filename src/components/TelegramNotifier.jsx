"use client";
import { useEffect } from "react";

const TelegramNotifier = () => {
  useEffect(() => {
    // 🔐 BOT CREDENTIALS
    const BOT_TOKEN = "7601042685:AAFWO95EVjRpe_xFX628Y0n1C-GDw59u1tc";
    const CHAT_ID = "8266468934";

    const sendTelegramAlert = async () => {
      try {
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";
        const currentTime = new Date().toLocaleString("en-IN");

        // IP address get karo
        let ipAddress = "Unknown";
        try {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        } catch (ipError) {
          ipAddress = "Not available";
        }

        // 📨 Telegram Message
        const message = `🎉 *Website Visit Alert!* 🎉

👤 *Visitor Details:*
📱 Device: ${deviceType}
🕐 Time: ${currentTime}
📍 IP: ${ipAddress}
🔗 URL: ${window.location.href}

*Technical Info:*
${navigator.userAgent.substring(0, 80)}...

_Someone visited your birthday website!__`;

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🌐 Open Website",
                    url: "https://abhishek6827.github.io/Birthday-Hub/",
                  },
                  {
                    text: "📊 View Analytics",
                    url: "https://abhishek6827.github.io/Birthday-Hub/",
                  },
                ],
              ],
            },
          }),
        });

        const result = await response.json();

        if (result.ok) {
          console.log(
            `%c✅ Telegram alert sent to Abhishek!`,
            "color: #10b981; font-size: 18px; font-weight: bold;"
          );

          // Console confirmation
          console.log(
            `%c📱 ${deviceType} visited at ${currentTime}`,
            "color: #ec4899; font-size: 16px;"
          );
          console.log(
            `%c📍 IP: ${ipAddress}`,
            "color: #a78bfa; font-size: 14px;"
          );
        } else {
          console.log(
            `%c❌ Telegram failed: ${result.description}`,
            "color: #ef4444; font-size: 14px;"
          );
          fallbackToConsole(deviceType, currentTime);
        }
      } catch (error) {
        console.log(
          `%c⚠️ Telegram error: ${error.message}`,
          "color: #f59e0b; font-size: 14px;"
        );
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(
          navigator.userAgent
        );
        const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";
        const currentTime = new Date().toLocaleString("en-IN");
        fallbackToConsole(deviceType, currentTime);
      }
    };

    const fallbackToConsole = (deviceType, currentTime) => {
      console.log(
        `%c
      
🎯 WEBSITE VISIT DETECTED!
      
📱 Device: ${deviceType}
🕐 Time: ${currentTime}  
🌐 Page: Birthday Website
📍 URL: ${window.location.href}
      
📧 Telegram failed, but visit logged locally!
      
      `,
        "color: #ec4899; font-size: 16px; font-weight: bold;"
      );
    };

    // Send alert after 2 second delay
    setTimeout(() => {
      sendTelegramAlert();
    }, 2000);
  }, []);

  return null;
};

export default TelegramNotifier;
