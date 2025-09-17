import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setCourse(response.data.course);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch student details.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, { name, email, course });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update student.');
    }
  };

  if (loading) {
    return <p>Loading student details...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  return (
    <div>
      <h2>Edit Student</h2>
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
        <button type="submit" className="btn btn-primary">Update Student</button>
        <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
      </form>
    </div>
  );
}

export default EditStudent;