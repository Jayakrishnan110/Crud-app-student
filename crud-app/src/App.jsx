import { useState, useEffect } from 'react';
import './App.css'; 
import Form from './Form';
import DataTable from './DataTable';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleAddStudent = async (data) => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error adding student: ${await response.text()}`);
      }

      const newStudent = await response.json();
      setStudents([...students, newStudent]); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <Form onSubmit={handleAddStudent} />
      <DataTable students={students} />
    </div>
  );
}

export default App;