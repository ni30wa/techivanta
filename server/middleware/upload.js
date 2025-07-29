// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes", // Cloudinary folder
    resource_type: "raw", // since resume could be PDF/DOC
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

module.exports = { cloudinary, resumeStorage };
