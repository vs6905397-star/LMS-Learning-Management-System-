import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Courses from "./pages/Courses"
import About from "./pages/About"
import UserProfile from "./pages/UserProfile"
import CourseDetails from './pages/CourseDetails'
import MyLearning from "./pages/MyLearning"
import MyLearningContinue from './pages/MyLearningContinue'
import ProtectedRoute from "./route/ProtectedRoute"



function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/about' element={<About/>} />

      <Route element={<ProtectedRoute/>}>
      <Route path='/mylearning' element={<MyLearning />} />
      <Route path='/mylearning/:id' element={<MyLearningContinue />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/courses/:id' element={<CourseDetails />} />
      </Route>

    </Routes>
  )
}

export default App
