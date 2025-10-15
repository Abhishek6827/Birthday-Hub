const express = require("express");
const cors = require("cors");
const app = express();

// CORS Configuration - YEH COMPLETE SETUP HAI
const corsOptions = {
  origin: [
    "https://abhishek6827.github.io",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://abhishek6827.github.io/Birthday-Hub/",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// CORS middleware apply karo
app.use(cors(corsOptions));

// Pre-flight requests handle karo
app.options("*", cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Visit data store
let visitData = {
  totalVisits: 0,
  devices: {},
  visitHistory: [],
};

// Track visit endpoint
app.post("/api/track-visit", (req, res) => {
  try {
    const { deviceType, userAgent } = req.body;
    const timestamp = new Date().toLocaleString();

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

    // Keep only last 500 visits
    if (visitData.visitHistory.length > 500) {
      visitData.visitHistory = visitData.visitHistory.slice(-500);
    }

    console.log(
      `📱 New visit from ${deviceType} - Total: ${visitData.totalVisits}`
    );

    // CORS headers manually set karo
    res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.json({
      success: true,
      totalVisits: visitData.totalVisits,
      deviceVisits: visitData.devices[deviceId].visits,
      deviceType: deviceType,
    });
  } catch (error) {
    console.error("Error in track-visit:", error);
    res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
    res.status(500).json({ success: false, error: error.message });
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

    // CORS headers
    res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    res.json({
      totalVisits: visitData.totalVisits,
      uniqueDevices: Object.keys(visitData.devices).length,
      deviceCounts: deviceCounts,
      recentVisits: visitData.visitHistory.slice(-20).reverse(),
      devices: visitData.devices,
    });
  } catch (error) {
    console.error("Error in analytics:", error);
    res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset data endpoint
app.delete("/api/reset", (req, res) => {
  visitData = {
    totalVisits: 0,
    devices: {},
    visitHistory: [],
  };

  res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
  res.json({ success: true, message: "Data reset successfully" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
  res.json({
    status: "OK",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://abhishek6827.github.io");
  res.json({
    message: "Visit Tracker Backend is running!",
    endpoints: {
      "POST /api/track-visit": "Track a visit",
      "GET /api/analytics": "Get analytics",
      "DELETE /api/reset": "Reset data",
      "GET /health": "Health check",
    },
    cors: {
      allowedOrigins: ["https://abhishek6827.github.io"],
      allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Visit tracker ready!`);
  console.log(`🌐 CORS enabled for: https://abhishek6827.github.io`);
});
