import Student from "../models/Student.model.js";
import User from "../models/User.model.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createStudent = async (req, res) => {
  try {
    const {
      email,
      name,
      course,
      enrollmentDate,
      phone,
      batch,
      status,
      notes,
    } = req.body;

    if (!email || !name || !course) {
      return res.status(400).json({
        success: false,
        message: "Email, name and course are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    if (user.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "User is not a student",
      });
    }

    const existingStudent = await Student.findOne({ user: user._id });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student profile already exists",
      });
    }

    const student = await Student.create({
      user: user._id,
      name,
      email,
      course,
      enrollmentDate,
      phone,
      batch,
      status,
      notes,
    });

    res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    const allowedFields = [
      "name",
      "email",
      "course",
      "status",
      "phone",
      "batch",
      "notes",
      "enrollmentDate",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    await student.save();

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

