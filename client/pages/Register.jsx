import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formData = {
        username: username,
        email: email,
        password: password,
    };

    console.log(formData)

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

        setUsername('')
        setEmail('')
        setPassword('')
    };

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
            Email:
            <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                value={formData.password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            </label>
        </div>
        <button type="submit">Register</button>
        </form>
    );
};

export default Register;