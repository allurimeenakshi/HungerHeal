import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Auth.css';
import loginAnimation from '../../assets/login-animation.json';


const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username: formData.username,
                password: formData.password
            });
            console.log(res.data);
            alert('Login Successful');
            navigate('/'); // Redirect to Home Page
        } catch (error) {
            console.error(error);
            alert('Login Failed');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            console.log(res.data);
            alert('Registration Successful');
            setIsRegister(false); // Switch to login tab
        } catch (error) {
            console.error(error);
            alert('Registration Failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <button className={!isRegister ? "active" : ""} onClick={() => setIsRegister(false)}>Login</button>
                <button className={isRegister ? "active" : ""} onClick={() => setIsRegister(true)}>Register</button>
            </div>
            <div className="auth-form">
                {isRegister ? (
                    <form onSubmit={handleRegister}>
                        <h2>Register</h2>
                        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
                        <button type="submit">Register</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <input type="text" name="username" placeholder="Username or Email" required onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;
