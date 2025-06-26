require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const adminRoutes = require("./routes/adminRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();
app.use(express.json());

// ✅ Azure + Local CORS support
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000", // local frontend
//       "https://smarthire-backend-c7cvfhfyd5caeph3.japanwest-01.azurewebsites.net" // Azure frontend
//     ],
//     credentials: true,
//   })
// );
 app.use(
  cors({
    origin: [
      "http://localhost:3000", // ✅ local frontend
      "https://black-wave-0be4cbe00.2.azurestaticapps.net", // ✅ deployed frontend
    ],
    credentials: true,
  })
);
// ✅ Serve uploaded files if needed
app.use("/uploads", express.static("uploads"));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/client", clientRoutes);

// ✅ Root route for basic check
app.get("/", (req, res) => {
  res.send("✅ SmartHire backend is live!");
});

// ✅ MongoDB connection + start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 SmartHire backend is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
