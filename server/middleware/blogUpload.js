// middlewares/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../middleware/cloudnary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogs", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => "blog-" + Date.now(),
  },
});

const upload = multer({ storage });

module.exports = {
  singleImageUpload: upload.single("image"),
  multipleImageUpload: upload.array("images", 5),
};
