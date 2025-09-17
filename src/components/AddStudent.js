import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/students', { name, email, course });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add student.');
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">Course:</label>
          <input type="text" className="form-control" id="course" value={course} onChange={(e) => setCourse(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
        <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
      </form>
    </div>
  );
}

export default AddStudent;