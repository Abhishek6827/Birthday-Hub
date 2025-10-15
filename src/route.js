// app/api/telegram/route.js
export async function POST(request) {
  try {
    const { deviceType, currentTime, userAgent } = await request.json();

    // 🔐 SECURE - Environment variable mein token
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return Response.json(
        {
          success: false,
          error: "Telegram configuration missing",
        },
        { status: 500 }
      );
    }

    // IP address get kare (optional)
    let ipAddress = "Unknown";
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      ipAddress = ipData.ip;
    } catch (error) {
      ipAddress = "Not available";
    }

    // Telegram message
    const message = `🎉 *Website Visit Alert!* 🎉

👤 *Visitor Details:*
📱 Device: ${deviceType}
🕐 Time: ${currentTime}
📍 IP: ${ipAddress}
🔗 URL: Birthday Website

*Browser Info:*
${userAgent}

_Someone visited your birthday website!_`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
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
              ],
            ],
          },
        }),
      }
    );

    const result = await telegramResponse.json();

    if (result.ok) {
      return Response.json({
        success: true,
        message: "Telegram notification sent successfully",
      });
    } else {
      return Response.json(
        {
          success: false,
          error: result.description,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
