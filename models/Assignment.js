const dbInstance = require("../config/db");
const queries = require("../config/queries");

class Assignment {
  static async createAssignment(
    title,
    description,
    due_date,
    total_score,
    created_by
  ) {
    try {
      const db = await dbInstance.getInstance();
      const result = await db.query(queries.createAssignment(), [
        title,
        description,
        due_date,
        total_score,
        created_by,
      ]);

      return result || null;
    } catch (error) {
      throw new Error("Error creating Assignment entry: " + error.message);
    }
  }

  static async findById(id) {
    const db = await dbInstance.getInstance();
    const rows = await db.query(queries.findAssignmentById(), [id]);

    return rows.rows[0] || null;
  }

  static async updateAssignment(id, data) {
    const db = await dbInstance.getInstance();
    const { title, description, due_date, total_score } = data;

    try {
      const result = await db.query(queries.updateAssignment(), [
        title,
        description,
        due_date,
        total_score,
        id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error(
          "Assignment update failed. Assignment not found or no changes made."
        );
      }

      const updatedAssignment = await db.query(
        "SELECT * FROM assignments WHERE id = $1",
        [id]
      );
      return updatedAssignment.rows[0] || null;
    } catch (error) {
      throw new Error("Error updating assignment entry: " + error.message);
    }
  }

  static async getAllAssignmentsStudent (sortBy,sortOrder,title) {
    const db = await dbInstance.getInstance();
    try {
      const result = await db.query(queries.getAllAssignmentsStudent(sortBy,sortOrder,title));
      return result.rows;
    } catch (error) {
      throw new Error("Error getting assignments: " + error.message);
    }
  }

  static async getAllAssignmentsTeacher(id){
    const db = await dbInstance.getInstance();
    try {
      const result = await db.query(queries.getAllAssignmentsTeacher(), [id]);
      return result.rows;
    } catch (error) {
      throw new Error("Error getting assignments: " + error.message);
    }
  }

  static async getAssignmentById(id){
    const db = await dbInstance.getInstance();
    try {
      const result = await db.query(queries.findAssignmentById(), [id]);
      return result.rows;
    } catch (error) {
      throw new Error("Error getting assignments: " + error.message);
    }
  }

  static async deleteAssignment(id) {
    const db = await dbInstance.getInstance();
    try {
      const result = await db.query(queries.deleteAssignmentById(), [id]);
      return result.rows;
    } catch (error) {
      throw new Error("Error deleting assignment: " + error.message);
    }
  }

  static async submitAssignment(assignmentId,studentId,submissionText){
    const db = await dbInstance.getInstance();
    try {
      const result = await db.query(queries.submitAssignment(), [assignmentId,studentId,submissionText]);
      return result;
    } catch (error) {
      throw new Error("Error deleting assignment: " + error.message);
    }
  }
}

module.exports = Assignment;
