import React, { useEffect, useState } from 'react';

const useCategoryPosts = () => {
  const categories = ['health', 'career', 'technology', 'food', 'travel']; // List of categories you want to fetch

  // Create an object to store posts for each category
  const [categoryPosts, setCategoryPosts] = useState({});

  useEffect(() => {
    // Define a function to fetch posts for a single category
    const fetchPostsForCategory = async (category) => {
      try {
        // const response = await fetch(`http://localhost:3000/users/posts?cat=${category}`);
        const response = await fetch(`https://magazine-api.vercel.app/users/posts?cat=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching posts for category "${category}": ${error.message}`);
        return [];
      }
    };

    // Create an array of promises for each category
    const promises = categories.map((category) => fetchPostsForCategory(category));

    // Use Promise.all to execute all requests concurrently
    Promise.all(promises)
      .then((results) => {
        // Combine the results into the categoryPosts object
        const categoryPostsData = categories.reduce((acc, category, index) => {
          acc[category] = results[index];
          return acc;
        }, {});
        setCategoryPosts(categoryPostsData);
      })
      .catch((error) => {
        console.error('Error fetching posts for all categories:', error.message);
      });
  }, []); // Make sure to add dependencies if needed

  return categoryPosts;
};

const NewTest = () => {
  const categoryPosts = useCategoryPosts();

  // Render the component as needed
  return (
    <div>
      {/* Your rendering logic here */}
      {/* Access posts for each category through categoryPosts */}
      {Object.keys(categoryPosts).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {categoryPosts[category].map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              {/* ... other post details */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewTest;