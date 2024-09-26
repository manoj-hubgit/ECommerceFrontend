import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../Redux/Slice/UserSlice";

const Login = () => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);
            const { token } = response.data;
            dispatch(signInSuccess({ token }));
            localStorage.setItem("token", token);
            navigate('/home');
        } catch (error) {
            dispatch(signInFailure(error.response?.data.message || "Invalid Credentials"));
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Login to Your Account</h1>
            <form onSubmit={handleSubmit} className="mt-4">
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
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <div className="mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-primary">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
