const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ required to serve dist

require("dotenv").config();

// Route imports
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const blogRoutes = require("./routes/blog");
const serviceRoutes = require("./routes/Service");
const customerRoutes = require("./routes/customer");
const jobRoutes = require("./routes/Careers");
const applicantRoutes = require("./routes/applicants");
const certificationPartnerRoutes = require("./routes/certificationPartner");
const employeeRoutes = require("./routes/employees");
const ourjourney = require("./routes/ourjourney");
const offerletter = require("./routes/offerLetters");
const certificate = require("./routes/certificates");
const gallery = require("./routes/gallery");
const experienceRoutes = require("./routes/Excertificate");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/partner", certificationPartnerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/journey", ourjourney);
app.use("/api/offerletter", offerletter);
app.use("/api/certificate", certificate);
app.use("/api/gallery", gallery);
app.use("/api/excertificates", experienceRoutes);

// ✅ Health check
app.get("/api", (req, res) => {
  res.send("API is running...");
});

app.use(express.static(path.join(__dirname, "/client/dist")));

//  SPA fallback (must come last)
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
