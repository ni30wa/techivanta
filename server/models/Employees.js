// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    department: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    joinDate: {
      type: Date,
      default: Date.now,
    },
    resignDate: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "resigned"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
