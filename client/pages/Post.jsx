import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const [post, setPost] = useState(null)
    const { id } = useParams()

    useEffect(() => {

        const fetchPost = async () => {
            try {
              // const response = await fetch(`http://localhost:3000/users/post/${id}`);
              const response = await fetch(`https://magazine-api.vercel.app/users/post/${id}`);
              const data = await response.json();
              setPost(data);
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
        }

        fetchPost()
    }, [])

    return (
        <div>
          {post ? (
            <>
              <h1>{post.title}</h1>
              <p>{post.summary}</p>
              <p>Author: {post.author.username}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <hr />
            </>
          ) : ''}
        </div>
    );  
}

export default Post