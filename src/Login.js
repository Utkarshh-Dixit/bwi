import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Perform authentication
            // Replace the actual fetch call with your authentication logic
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            const { token } = data;

            // Save token to local storage or state for later use
            localStorage.setItem('token', token);

            // Update parent component with login status
            console.log('Login successful:', data);
            if(data.message === 'Invalid credentials'){
              alert('Invalid credentials');
            }
            else{
              onLogin();
                alert('Login successful');
                navigate('/');
            }
            // Redirect to the home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <div className='login-form'>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
