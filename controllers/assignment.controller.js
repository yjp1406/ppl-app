const User = require("../models/User");
const Assignment = require("../models/Assignment");

const createAssignment = async (req, res) => {
  try {
    const { title, description, due_date, total_score } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Not authorized to create assignment" });
    }

    const created_by = userId;
    const assignment = await Assignment.createAssignment(
      title,
      description,
      due_date,
      total_score,
      created_by
    );

    if (assignment.rowCount == 1)
      res
        .status(200)
        .send({ success: true, message: "Assignment created successfully" });
    else
      res
        .status(200)
        .json({ success: false, message: "Error creating assignment" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating assignment" });
  }
};

const getAllAssignmentsStudent = async (req, res) => {
  try {

    const { sortBy, sortOrder, title } = req.query;

    const assignments = await Assignment.getAllAssignmentsStudent(sortBy, sortOrder, title);
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

const getAssignmentById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = req.user;

    const assignments = await Assignment.getAssignmentById(id);

    if (assignments.created_by === user.id || user.role === "student") {
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

const getAllAssignmentsTeacher = async (req, res) => {
  try {
    const teacher = req.user;

    if (teacher.role !== "teacher") {
      res.status(200).send({ success: false, message: "unauthorized" });
    }

    const assignments = await Assignment.getAllAssignmentsTeacher(teacher.id);
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

const updateAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  const updatedData = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const userId = req.user.id;

    if (assignment.created_by !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update assignment" });
    }

    const data = {
      title: updatedData.title || assignment.title,
      description: updatedData.description || assignment.description,
      due_date: updatedData.due_date || assignment.due_date,
      total_score: updatedData.total_score || assignment.total_score,
    };

    const updatedAssignment = await Assignment.updateAssignment(
      assignmentId,
      data
    );
    res.json({ message: "Assignment updated successfully", updatedAssignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating assignment" });
  }
};

const deleteAssignment = async (req, res) => {
  const assignmentId = req.params.id;

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const userId = req.user.id;

    if (assignment.created_by !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete assignment" });
    }

    const result = await Assignment.deleteAssignment(assignmentId);
    if (result)
      res
        .status(200)
        .send({ success: true, message: "Assignment Deleted successfully" });
    else
      res
        .status(200)
        .send({ success: false, message: "error deleting assignment" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating assignment" });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, submissionText } = req.body;
    const studentId = req.user.id;

    if(req.user.role === "teacher"){
      return res.status(200).send({success:false, message: "Teacher can not submit assignment"});
    }

    const submission = await Assignment.submitAssignment(assignmentId,studentId,submissionText);

    if(submission)
      res.status(201).json({ success: true, message: 'Assignment submitted successfully' });
    else 
      res.status(201).json({ success: false, message: 'Assignment not submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting assignment' });
  }
};


module.exports = {
  createAssignment,
  getAllAssignmentsStudent,
  updateAssignment,
  getAllAssignmentsTeacher,
  getAssignmentById,
  deleteAssignment,
  submitAssignment
};
