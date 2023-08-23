import React, { useState, useEffect } from 'react';

const Register = () => {
    // const [username, setUsername] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    // const fiction = [
    //     {
    //       "username": "Tony Stark",
    //       "email": "tony.stark@example.com",
    //       "password": "password123"
    //     },
    //     {
    //       "username": "Clark Kent",
    //       "email": "clark.kent@example.com",
    //       "password": "kryptonite123"
    //     },
    //     {
    //       "username": "Diana Prince",
    //       "email": "diana.prince@example.com",
    //       "password": "amazon123"
    //     },
    //     {
    //       "username": "Peter Parker",
    //       "email": "peter.parker@example.com",
    //       "password": "spidey123"
    //     },
    //     {
    //       "username": "Bruce Wayne",
    //       "email": "bruce.wayne@example.com",
    //       "password": "bat123"
    //     },
    //     {
    //       "username": "Steve Rogers",
    //       "email": "steve.rogers@example.com",
    //       "password": "shield123"
    //     },
    //     {
    //       "username": "Natasha Romanoff",
    //       "email": "natasha.romanoff@example.com",
    //       "password": "redroom123"
    //     },
    //      {
    //       "username": "Arthur Curry",
    //       "email": "arthur.curry@example.com",
    //       "password": "aquaman123"
    //      },
    //      {
    //       "username": "Wanda Maximoff",
    //       "email": "arthur.curry@example.com",
    //       "password": "scarletwitch123"
    //      }
    //   ]
      


    console.log(formData)

    const submit = (submitData) => {
        // fetch('http://localhost:3000/auth/register', {
        fetch('https://magazine-api.vercel.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        submit(formData)

        setFormData({
            username: '',
            email: '',
            password: '',
          })
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
                value={formData.username}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                onChange={handleChange}
                required
            />
            </label>
        </div>
        <button type="submit">Register</button>
        </form>
    );
};

export default Register;