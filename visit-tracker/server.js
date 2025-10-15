const express = require("express");
const cors = require("cors");
const app = express();

// CORS Configuration - SIMPLE AND EFFECTIVE
app.use(
  cors({
    origin: [
      "https://abhishek6827.github.io",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle pre-flight requests
app.options("*", cors());

// Body parser middleware
app.use(express.json());

// Visit data store
let visitData = {
  totalVisits: 0,
  devices: {},
  visitHistory: [],
};

// Helper function for Indian time format
const getIndianTime = () => {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

// Track visit endpoint
app.post("/api/track-visit", (req, res) => {
  try {
    const { deviceType, userAgent } = req.body;

    // Use Indian time format
    const timestamp = getIndianTime();

    // Unique device ID
    const deviceId =
      (req.ip || "unknown") + "-" + (userAgent || "").substring(0, 30);

    // Count increase
    visitData.totalVisits++;

    // Device-specific tracking
    if (!visitData.devices[deviceId]) {
      visitData.devices[deviceId] = {
        visits: 1,
        firstVisit: timestamp,
        deviceType: deviceType,
        userAgent: userAgent,
      };
    } else {
      visitData.devices[deviceId].visits++;
      visitData.devices[deviceId].lastVisit = timestamp;
    }

    // Visit history
    visitData.visitHistory.push({
      deviceId: deviceId,
      deviceType: deviceType,
      timestamp: timestamp,
      ip: req.ip,
    });

    // Keep only last 100 visits (reduce memory usage)
    if (visitData.visitHistory.length > 100) {
      visitData.visitHistory = visitData.visitHistory.slice(-100);
    }

    console.log(
      `📱 New visit from ${deviceType} - Total: ${visitData.totalVisits}`
    );

    res.json({
      success: true,
      totalVisits: visitData.totalVisits,
      deviceVisits: visitData.devices[deviceId].visits,
      deviceType: deviceType,
      timestamp: timestamp,
    });
  } catch (error) {
    console.error("Error in track-visit:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Get analytics endpoint
app.get("/api/analytics", (req, res) => {
  try {
    // Device count calculate
    const deviceCounts = {
      mobile: 0,
      desktop: 0,
    };

    Object.values(visitData.devices).forEach((device) => {
      if (device.deviceType === "mobile") {
        deviceCounts.mobile += device.visits;
      } else {
        deviceCounts.desktop += device.visits;
      }
    });

    res.json({
      totalVisits: visitData.totalVisits,
      uniqueDevices: Object.keys(visitData.devices).length,
      deviceCounts: deviceCounts,
      recentVisits: visitData.visitHistory.slice(-30).reverse(), // Last 30 visits
      devices: visitData.devices,
      lastUpdated: getIndianTime(),
    });
  } catch (error) {
    console.error("Error in analytics:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Reset data endpoint
app.delete("/api/reset", (req, res) => {
  visitData = {
    totalVisits: 0,
    devices: {},
    visitHistory: [],
  };
  res.json({
    success: true,
    message: "Data reset successfully",
    resetTime: getIndianTime(),
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running smoothly",
    timestamp: getIndianTime(),
    totalVisits: visitData.totalVisits,
    uniqueDevices: Object.keys(visitData.devices).length,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🎯 Visit Tracker Backend is Live!",
    status: "Running",
    timestamp: getIndianTime(),
    endpoints: {
      "POST /api/track-visit": "Track a website visit",
      "GET /api/analytics": "Get complete visit analytics",
      "DELETE /api/reset": "Reset all visit data",
      "GET /health": "Health check",
    },
    stats: {
      totalVisits: visitData.totalVisits,
      uniqueDevices: Object.keys(visitData.devices).length,
    },
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Visit tracker ready!`);
  console.log(`🌐 CORS enabled for GitHub Pages`);
  console.log(`⏰ Timezone: Asia/Kolkata`);
});
