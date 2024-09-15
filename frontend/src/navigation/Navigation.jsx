import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import ProtectedRoute from '../component/ProtectedRoute'
import State from '../pages/State'
import City from '../pages/City'
import Warehouse from '../pages/Warehouse'

const Navigation = () => {
  return (
    <div className='content'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/state' element={<ProtectedRoute><State /></ProtectedRoute>} />
        <Route path='/city' element={<ProtectedRoute><City /></ProtectedRoute>} />
        <Route path='/warehouse' element={<ProtectedRoute><Warehouse /></ProtectedRoute>} />

        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />


        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default Navigation
