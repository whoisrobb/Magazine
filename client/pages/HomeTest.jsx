import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeTest = () => {
  const [health, setHealth] = useState(null);
  const [career, setCareer] = useState(null);
  const [technology, setTechnology] = useState(null);
  const [food, setFood] = useState(null);
  const [travel, setTravel] = useState(null);

  useEffect(() => {
    // Define a function to fetch the data
    const fetchPosts = async (category) => {
      try {
        const response = await fetch(`http://localhost:3000/users/posts/cat?cat=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    // Call the fetch function to get the data
    Promise.all([
      fetchPosts('health'),
      fetchPosts('career'),
      fetchPosts('technology'),
      fetchPosts('food'),
      fetchPosts('travel')
    ])
      .then(([healthData, careerData, technologyData, foodData, travelData]) => {
        // Set the state for each category using the resolved data
        setHealth(healthData);
        setCareer(careerData);
        setTechnology(technologyData);
        setFood(foodData);
        setTravel(travelData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="top-row">
        {/* Content for the top row */}
      </div>
      <div className="bottom-row">
        {health ? (
          <div className="column health">
            {health.map((post) => (
                <div className='post' key={post._id}>
                <Link to={`/post/${post._id}`}>
                    <h2 className='title'>{post.title}</h2>
                </Link>
                    <p className='author'>By {post.author.username}</p>
                    <p className='summary'>{post.summary}</p>
                {/* <p>Category: {post.categories}</p> */}
                {/* <Link to={`/edit/${post._id}`}>Edit Post</Link> */}
            </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}

        {career ? (
          <div className="column health">
            {career.map((post) => (
                <div className='post' key={post._id}>
                <Link to={`/post/${post._id}`}>
                    <h2 className='title'>{post.title}</h2>
                </Link>
                    <p className='author'>By {post.author.username}</p>
                    <p className='summary'>{post.summary}</p>
                {/* <p>Category: {post.categories}</p> */}
                {/* <Link to={`/edit/${post._id}`}>Edit Post</Link> */}
                </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}

        {technology ? (
          <div className="column health">
            {technology.map((post) => (
                <div className='post' key={post._id}>
                <Link to={`/post/${post._id}`}>
                    <h2 className='title'>{post.title}</h2>
                </Link>
                    <p className='author'>By {post.author.username}</p>
                    <p className='summary'>{post.summary}</p>
                {/* <p>Category: {post.categories}</p> */}
                {/* <Link to={`/edit/${post._id}`}>Edit Post</Link> */}
                </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}

        {food ? (
          <div className="column health">
            {food.map((post) => (
                <div className='post' key={post._id}>
                <Link to={`/post/${post._id}`}>
                    <h2 className='title'>{post.title}</h2>
                </Link>
                    <p className='author'>By {post.author.username}</p>
                    <p className='summary'>{post.summary}</p>
                {/* <p>Category: {post.categories}</p> */}
                {/* <Link to={`/edit/${post._id}`}>Edit Post</Link> */}
                </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}

        {travel ? (
          <div className="column health">
            {travel.map((post) => (
                <div className='post' key={post._id}>
                    <Link to={`/post/${post._id}`}>
                        <h2 className='title'>{post.title}</h2>
                    </Link>
                        <p className='author'>By {post.author.username}</p>
                        <p className='summary'>{post.summary}</p>
                    {/* <p>Category: {post.categories}</p> */}
                    {/* <Link to={`/edit/${post._id}`}>Edit Post</Link> */}
                </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default HomeTest;
