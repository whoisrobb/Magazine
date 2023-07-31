import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [id, setId] = useState('')
    
    const formData = { title, summary, content, _id: id }
    // console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/users/create', {
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
            })
        } catch (err) {
            console.error(err)
        }
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

    
  return (
    <div>
        <form
            onSubmit={handleSubmit}
        >
            <div>
                <label>
                    <input
                        type="text"
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Title'
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="text"
                        name='summary'
                        value={summary}
                        onChange={e => setSummary(e.target.value)}
                        placeholder='Summary'
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    <textarea
                        placeholder="Content"
                        name="postContent"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Create post</button>
        </form>
    </div>
    
  )
}

export default CreatePost