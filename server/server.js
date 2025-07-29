const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // ✅ correct (uses actual env variable)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Serve static files from /uploads
app.use("/uploads", express.static("uploads"));
// Routes
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

// ✅ Health check route (add this before `app.listen`)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
