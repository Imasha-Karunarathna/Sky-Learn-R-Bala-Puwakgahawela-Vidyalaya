import React, { useState } from 'react';
import './signup.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);  // New state variable

    const validateForm = () => {
        const errors = {};
        if (!username) errors.username = 'Username is required.';
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }
        if (!password) errors.password = 'Password is required.';
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password.';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // Send data to Django backend
            fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setErrors({ general: data.error });
                    } else {
                        setMessage('Registration Successful. Now Please Log In.');
                        setIsRegistered(true);  // Set to true on successful registration
                        // Clear form fields
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setErrors({});
                    }
                })
                .catch(error => {
                    setErrors({ general: 'An error occurred during registration.' });
                });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {message && <p className="success-text">{message}</p>}
            {!isRegistered && (
                <form onSubmit={handleSubmit} noValidate>
                    {errors.general && <p className="error-text">{errors.general}</p>}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={errors.username ? 'input-error' : ''}
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={errors.confirmPassword ? 'input-error' : ''}
                        />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
            )}
            {isRegistered && (
                <div
                className="success-message"
                style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '15px',
                    borderRadius: '5px',
                    border: '1px solid #c3e6cb',
                    marginTop: '20px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                }}
            >
                <p>
                    Registration Successful. Now Please{' '}
                    <a
                        href="/login"
                        style={{
                            color: '#155724',
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                        }}
                    >
                        Log In
                    </a>.
                </p>
            </div>
            
            )}
        </div>
    );
};

export default SignUp;
