import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student:', err);
        alert('Failed to delete student.');
      }
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add New Student</Link>
      {students.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <Link to={`/edit/${student.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                  <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default StudentList;