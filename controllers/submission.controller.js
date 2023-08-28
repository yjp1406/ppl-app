const User = require("../models/User");
const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

const gradeAssignment = async (req, res) => {
  const teacherId = req.user.id;
  const assignmentId = req.params.id;
  const { studentId, score } = req.body;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment || assignment.created_by !== teacherId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to grade this assignment" });
    }

    if (score > assignment.total_score) {
      return res.send({
        success: false,
        message: "score you provided exceed the total score of the assignment",
      });
    }
    const updatedSubmission = await Submission.addScoreToAssignment(
      score,
      assignmentId,
      studentId
    );

    if (updatedSubmission.rows.length === 0) {
      return res.status(404).json({ error: "Assignment submission not found" });
    }

    res.json(updatedSubmission.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error grading assignment" });
  }
};

const getAllAssignmentsSubmissions = async (req, res) => {
  try {
    const user = req.user;

    const assignments = await Submission.getAllSubmitedAssignment(user.id);

    if (assignments) {
      res
        .status(200)
        .send({ success: true, message: "Assignments", data: assignments });
    } else {
      res
        .status(200)
        .send({ success: false, message: "error fetching assignments" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting assignment" });
  }
};

const viewStudentReport = async (req, res) => {
  const teacherId = req.user.id;
  const studentId = req.params.studentId;

  try {
    const studentSubmissions = await Submission.getStudentReport(
      studentId,
      teacherId
    );
    if (studentSubmissions) {
      res.status(200).send({
        success: true,
        message: "Student report",
        data: studentSubmissions,
      });
    } else {
      res
        .status(200)
        .send({ success: false, message: "No assignment for the teacher" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching student report" });
  }
};

const getSubmittedAssignmentTeacher = async (req, res) => {
  const teacherId = req.user.id;
  const { title, sortBy, sortOrder } = req.query;
  try {
    if (req.user.role === "student") {
      return res.status(200).send({ success: false, message: "Unauthorized" });
    }
    const studentSubmissions = await Submission.getSubmittedAssignmentTeacher(
      teacherId,
      title,
      sortBy,
      sortOrder
    );
    if (studentSubmissions) {
      res.status(200).send({
        success: true,
        message: "Student report",
        data: studentSubmissions,
      });
    } else {
      res
        .status(200)
        .send({ success: false, message: "No assignment for the teacher" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching student report" });
  }
};

module.exports = {
  gradeAssignment,
  getAllAssignmentsSubmissions,
  viewStudentReport,
  getSubmittedAssignmentTeacher,
};
