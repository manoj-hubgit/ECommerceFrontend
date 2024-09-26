import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            navigate('/login'); 
        } catch (error) {
            setError(error.response?.data.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Create an Account</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={handleChange} placeholder="Enter your Name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} placeholder="name@company.com" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Enter your Password" required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <div className="mt-3">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-primary">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
