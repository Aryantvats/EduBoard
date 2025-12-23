import Student from "../models/Student.model.js";

export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
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

export const updateMyProfile = async (req, res) => {
  try {
    const { name, phone ,batch , notes} = req.body;

    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    if (name) student.name = name;
    if (phone !== undefined) student.phone = phone;
    if (batch) student.batch = batch;
    if (notes !== undefined) student.notes = notes;

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
