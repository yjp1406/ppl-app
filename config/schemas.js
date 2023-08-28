CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL -- Possible values: 'teacher', 'student'
  );
  
//   -- Create Assignments table
  CREATE TABLE Assignments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMP NOT NULL,
    total_score INT NOT NULL,
    created_by INT REFERENCES Users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  
//   -- Create AssignmentSubmissions table
  CREATE TABLE AssignmentSubmissions (
    id SERIAL PRIMARY KEY,
    assignment_id INT REFERENCES Assignments(id),
    student_id INT REFERENCES Users(id),
    submission_date TIMESTAMP DEFAULT NOW(),
    submission_text TEXT,
    score INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  