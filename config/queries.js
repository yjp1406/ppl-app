const queries = {
  checkDbInstance: () => {
    const checkDbInstanceQuery = `
          SELECT * FROM public.test`;
    return checkDbInstanceQuery;
  },
  findByUsername: () => {
    const findByUsername = `SELECT * FROM users WHERE username = $1`;
    return findByUsername;
  },
  findById: () => {
    const findById = `SELECT * FROM users WHERE id = $1`;
    return findById;
  },
  createUser: () => {
    const createUser = `INSERT INTO users (username, password, role) VALUES ($1, $2, $3)`;
    return createUser;
  },
  findAssignmentById: () => {
    const findAssignmentById = `SELECT * FROM assignments where id = $1`;
    return findAssignmentById;
  },
  createAssignment: () => {
    const createAssignment = `INSERT INTO assignments (title, description, due_date, total_score, created_by) VALUES ($1, $2, $3, $4, $5)`;
    return createAssignment;
  },
  updateAssignment: () => {
    const updateAssignment = `UPDATE assignments SET title = $1, description = $2, due_date = $3, total_score = $4 WHERE id = $5 RETURNING id, title, description, due_date, total_score`;
    return updateAssignment;
  },
  getAllAssignmentsStudent: (sortBy,sortOrder,title) => {
    let getAllAssignmentsStudent = `SELECT title, description, due_date, total_score FROM assignments `;

    if(title){
      getAllAssignmentsStudent += `WHERE title = '${title}'`
    }
    if (sortBy) {
      getAllAssignmentsStudent += ` ORDER BY ${sortBy} `
    }
    
    if(sortBy && sortOrder){
      getAllAssignmentsStudent += `${sortOrder}`;
    }

    return getAllAssignmentsStudent;
  },
  getAllAssignmentsTeacher: () => {
    const getAllAssignmentsTeacher = `SELECT * FROM assignments WHERE created_by = $1`
    return getAllAssignmentsTeacher;
  },
  deleteAssignmentById: () => {
    const deleteAssignmentById = `DELETE FROM assignments WHERE id = $1 RETURNING id, title, description, due_date, total_score`;
    return deleteAssignmentById;
  },
  submitAssignment: () => {
    const submitAssignment = `INSERT INTO AssignmentSubmissions (assignment_id, student_id, submission_text) VALUES ($1, $2, $3)`;
    return submitAssignment;
  },
  addScoreToAssignment: () => {
    const addScoreToAssignment = `UPDATE assignmentsubmissions SET score = $1 WHERE assignment_id = $2 AND student_id = $3 RETURNING *`;
    return addScoreToAssignment;
  },
  getAllSubmitedAssignment: () => {
    const getAllSubmitedAssignment = `SELECT * FROM assignmentsubmissions WHERE student_id = $1`;
    return getAllSubmitedAssignment;
  },
  getStudentReport: () => {
    const getStudentReport = `SELECT a.id AS assignment_id, a.title, s.score, s.submission_date FROM assignments AS a
    LEFT JOIN assignmentsubmissions AS s ON a.id = s.assignment_id AND s.student_id = $1 WHERE a.created_by = $2`;
    return getStudentReport;
  },
  getSubmittedAssignmentTeacher: (title,sortBy, sortOrder) => {
    let getSubmittedAssignmentTeacher = `SELECT a.id AS assignment_id, a.title, s.score, s.submission_date, s.submission_text FROM assignments AS a
    RIGHT JOIN assignmentsubmissions AS s ON a.id = s.assignment_id WHERE a.created_by = $1 `;

    if(title){
      getSubmittedAssignmentTeacher += `AND title = '${title}' `
    }

    if(sortBy){
      getSubmittedAssignmentTeacher += `ORDER BY ${sortBy} `
    }

    if(sortBy && sortOrder){
      getSubmittedAssignmentTeacher += `${sortOrder}`;
    }
    return getSubmittedAssignmentTeacher; 
  }
};

module.exports = queries;
