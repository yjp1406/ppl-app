const dbInstance = require("../config/db");
const queries = require("../config/queries");

class Submission {

    static async addScoreToAssignment(score, assignmentId, studentId){
        const db = await dbInstance.getInstance();
        try {
          const result = await db.query(queries.addScoreToAssignment(), [score, assignmentId, studentId]);
          return result;
        } catch (error) {
          throw new Error("Error adding score to assignment: " + error.message);
        }
      }
    
      static async getAllSubmitedAssignment(id){
        const db = await dbInstance.getInstance();
        try {
          const result = await db.query(queries.getAllSubmitedAssignment(), [id]);
          return result.rows;
        } catch (error) {
          throw new Error("Error getting assignments: " + error.message);
        }
      }
    
      static async getStudentReport(studentId, teacherId){
        const db = await dbInstance.getInstance();
        try {
          const result = await db.query(queries.getStudentReport(), [studentId,teacherId]);
          return result.rows;
        } catch (error) {
          throw new Error("Error getting student report: " + error.message);
        }
      }
    
      static async getSubmittedAssignmentTeacher(teacherId,title, sortBy, sortOrder){
        const db = await dbInstance.getInstance();
        try {
          const result = await db.query(queries.getSubmittedAssignmentTeacher(title, sortBy, sortOrder), [teacherId]);
          return result.rows;
        } catch (error) {
          throw new Error("Error getting student report: " + error.message);
        }
      }
}

module.exports = Submission;