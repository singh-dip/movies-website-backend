const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema(
  {
    screenName: {
      type: String,
      required: true,
      trim: true,
    },

    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatersName",
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    screenType: {
      type: String,
      enum: ["2D", "3D", "IMAX", "DOLBY"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Screen", screenSchema);