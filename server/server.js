const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 5000;

const pool = mysql.createPool({
  user: "root",
  password: "Root@Pas6W0r$",
  server: "new connection",
  database: "student-det",
  Option: {
    encrypt: true,
  },
});

// Get all students
async function getStudents() {
  const [rows] = await pool.query("SELECT * FROM students");
  return rows;
}

// Add a student
async function addStudent(data) {
  const { firstName, lastName, dob, grade, gender } = data;
  const [result] = await pool.query(
    "INSERT INTO students (first_name, last_name, dob, grade, gender) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, dob, grade, gender]
  );
  return result.insertId;
}

// Update a student
async function updateStudent(id, data) {
  const { firstName, lastName, dob, grade, gender } = data;
  await pool.query(
    "UPDATE students SET first_name = ?, last_name = ?, dob = ?, grade = ?, gender = ? WHERE id = ?",
    [firstName, lastName, dob, grade, gender, id]
  );
}

// Delete a student
async function deleteStudent(id) {
  await pool.query("DELETE FROM students WHERE id = ?", [id]);
}

// API endpoints for CRUD operations
app.get("/api/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching students");
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const data = await req.json(); // Parse the request body
    const newStudentId = await addStudent(data);
    // const newStudentId = await addStudent(req.body);
    res.json({
      message: `Student added successfully with ID: ${newStudentId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding student");
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await updateStudent(id, req.body);
    res.json({ message: `Student with ID ${id} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student");
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStudent(id); // Use existing deleteStudent function
    res.json({ message: `Student with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting student");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
