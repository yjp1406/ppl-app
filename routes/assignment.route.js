const express = require('express');
const assignmentController = require('../controllers/assignment.controller');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken)

router.post("/create", assignmentController.createAssignment)
router.post("/update/:id", assignmentController.updateAssignment)
router.get("/gets", assignmentController.getAllAssignmentsStudent)
router.get("/gett", assignmentController.getAllAssignmentsTeacher);
router.get("/get/:id", assignmentController.getAssignmentById);
router.delete("/delete/:id", assignmentController.deleteAssignment)
router.post("/submit", assignmentController.submitAssignment);


module.exports = router;