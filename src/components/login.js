import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
            if (response.status === 200 && response.data.access) {
                // Store tokens
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh || ''); // Store refresh token if available
                localStorage.setItem('username', username);
                localStorage.setItem('login_time', new Date().toISOString());

                setNotification('Login successful');
                navigate('/feature');
            } else {
                setError('Login failed: Invalid response');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setError(error.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-btn">Login</button>
                </form>
                {notification && <p className="notification-message">{notification}</p>}
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
