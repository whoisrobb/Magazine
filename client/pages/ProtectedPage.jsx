import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const ProtectedPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // Get the token from local storage (you can use your own storage mechanism)
        const token = localStorage.getItem('accessToken');

        // If there is no token, redirect to the login page or handle unauthorized access
        if (!token) {
          // For example, using React Router for redirection
          // Replace '/login' with the path to your login page
          window.location.replace('/login');
          return;
        }

        // Decoding the token to extract user information (optional)
        const decodedToken = jwtDecode(token);
        console.log('Token:', token);
        console.log('Decoded Token:', decodedToken);

        const response = await fetch('http://localhost:3000/users/posts', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`, // Include the token in the 'Authorization' header
        //   },
        });

        // Check if the response status is 200 (OK)
        if (!response.ok) {
          throw new Error('Failed to fetch protected data.');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  console.log(data)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
};

export default ProtectedPage;