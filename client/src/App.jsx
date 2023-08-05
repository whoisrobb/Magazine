import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ProtectedPage from '../pages/ProtectedPage'
import CreatePost from '../pages/CreatePost'
import Post from '../pages/Post'
import EditPost from '../pages/EditPost'
import HomeTest from '../pages/HomeTest'
import NewTest from '../pages/NewTest'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<HomeTest />} />
      <Route path='/new-test' element={<NewTest />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/protected' element={<ProtectedPage />} />
      <Route path='/post/:id' element={<Post />} />
      <Route path='/edit/:id' element={<EditPost />} />
    </Routes>
  )
}

export default App
