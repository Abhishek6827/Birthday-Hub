const express = require("express");
const cors = require("cors");
const app = express();

// CORS setup - YEH ADD KARO
const corsOptions = {
  origin: [
    "https://abhishek6827.github.io",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // YEH CHANGE KARO
app.use(express.json());

// Visit data store
let visitData = {
  totalVisits: 0,
  devices: {},
  visitHistory: [],
};

// Track visit endpoint
app.post("/api/track-visit", (req, res) => {
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

  res.json({
    success: true,
    totalVisits: visitData.totalVisits,
    deviceVisits: visitData.devices[deviceId].visits,
    deviceType: deviceType,
  });
});

// Get analytics endpoint
app.get("/api/analytics", (req, res) => {
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
    recentVisits: visitData.visitHistory.slice(-20).reverse(),
    devices: visitData.devices,
  });
});

// Reset data endpoint
app.delete("/api/reset", (req, res) => {
  visitData = {
    totalVisits: 0,
    devices: {},
    visitHistory: [],
  };
  res.json({ success: true, message: "Data reset successfully" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Visit Tracker Backend is running!",
    endpoints: {
      "POST /api/track-visit": "Track a visit",
      "GET /api/analytics": "Get analytics",
      "DELETE /api/reset": "Reset data",
    },
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Visit tracker ready!`);
  console.log(`🌐 CORS enabled for GitHub Pages`);
});
