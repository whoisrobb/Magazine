import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [token, setToken] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            username: username,
            password: password
        };
        console.log(formData)
    
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        .then((response) => {
            if (response.ok) {
                setRedirect(true)
            }
            return response.json()
        })
        .then((data) => {
            setToken(data.token)
            localStorage.setItem('accessToken', data.token)
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    console.log(token);

    if (redirect) return <Navigate to={'/protected'} />

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div>
                <label>
                Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;