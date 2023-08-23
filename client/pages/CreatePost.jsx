import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import jwtDecode from 'jwt-decode'
import { Navigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState(false)
    const [id, setId] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('health')
    
    const formData = { title, summary, content, _id: id, categories: selectedCategory };
    // console.log(formData)

    const handleChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // const response = await fetch('http://localhost:3000/users/create', {
            const response = await fetch('https://magazine-api.vercel.app/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then ((response) => {
                if (response.ok) {
                    setTitle('')
                    setSummary('')
                    setContent('')
                }

                alert("Post created Successfully!")
                setSuccess(true)
            })
        } catch (err) {
            console.error(err)
        }

        console.log(formData)
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (!token) {
            window.location.replace('/login')
            return
        }

        const decodedToken = jwtDecode(token)
        setId(decodedToken.id)
    }, [title, summary, content])
    
    if (success) return <Navigate to={'/'} />
    
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
              </label>
            </div>
    
            <div>
              <label>
                <input
                  type="text"
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary"
                  required
                />
              </label>
            </div>
    
            <div>
              <label htmlFor="categories">Select a Category:</label>
              <select
                id="categories"
                name="categories"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="health">Health</option>
                    <option value="career">Career</option>
                    <option value="technology">Technology</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                </select>
            </div>
    
            <ReactQuill value={content} onChange={handleChange} />

            <button type="submit">Create post</button>
          </form>
        </div>
      );
    };
    
    export default CreatePost;    