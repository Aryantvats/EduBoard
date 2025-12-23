import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
    },

    enrollmentDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },

    phone: {
      type: String,
      default: "",
    },

    batch: {
      type: String,
      default: "", 
    },

    notes: {
      type: String,
      default: "", 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
