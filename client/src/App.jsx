import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ProtectedPage from '../pages/ProtectedPage'
import CreatePost from '../pages/CreatePost'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/protected' element={<ProtectedPage />} />
    </Routes>
  )
}

export default App
