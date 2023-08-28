const express = require('express');
const submissionController = require('../controllers/submission.controller');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.put("/addscore/:id", submissionController.gradeAssignment);
router.get("/get-submitted-assignments", submissionController.getAllAssignmentsSubmissions);
router.get("/viewStudentReport/:studentId", submissionController.viewStudentReport);
router.get("/studentAssignments", submissionController.getSubmittedAssignmentTeacher);

module.exports = router;