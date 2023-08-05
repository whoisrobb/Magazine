import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
// import jwtDecode from 'jwt-decode'

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [postId, setPostId] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('health')
    const [success, setSuccess] = useState(false)
    const { id } = useParams()
    
    const formData = { title, summary, content, _id: postId, categories: selectedCategory };
    // console.log(formData)

    const handleChange = (value) => {
        setContent(value);
    };


    useEffect(() => {

        const fetchPost = async () => {
            try {
              const response = await fetch(`http://localhost:3000/users/post/${id}`);
              const data = await response.json();
              setTitle(data.title)
              setSummary(data.summary)
              setContent(data.content)
              setSelectedCategory(data.categories)
              setPostId(id)
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
        }

        fetchPost()

    }, [])

    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/delete/${id}`, {
          method: 'DELETE',
        })
        .then ((response) => {
          alert("Deleted Successfully!")
          setSuccess(true)
      })
      } catch (err) {
        console.error(err);
      }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3000/users/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then ((response) => {
                alert("Post patched Successfully!")
                setSuccess(true)
            })
        } catch (err) {
            console.error(err)
        }

        console.log(formData)
    }

    if (success) return <Navigate to={'/test'} />

  return (
    <div>
        <form
            onSubmit={handleSubmit}
        >
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
          <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default EditPost