import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // const response = await fetch('http://localhost:3000/users/posts');
      const response = await fetch('https://magazine-api.vercel.app/users/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
          </Link>
          {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
          <p>Category: {post.categories}</p>
          <p>Author: {post.author.username}</p>
          <Link to={`/edit/${post._id}`}>Edit Post</Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Home