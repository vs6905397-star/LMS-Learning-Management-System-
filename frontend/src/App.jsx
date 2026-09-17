import { lazy, Suspense} from "react"
import './App.css'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(()=>import("./pages/Home"));
const Courses = lazy(()=>import("./pages/Courses"))
const About = lazy(()=>import("./pages/About"))
const UserProfile = lazy(()=>import("./pages/UserProfile"))
const CourseDetails = lazy(()=>import("./pages/CourseDetails"))
const MyLearning = lazy(()=>import("./pages/MyLearning"))
const MyLearningContinue = lazy(()=>import("./pages/MyLearningContinue"))
const Login = lazy(()=>import("./pages/Login"))
const Signup = lazy(()=>import("./pages/Signup"))
import ProtectedRoute from "./route/ProtectedRoute"
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";



function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/about' element={<About/>} />
      <Route path="/verifyotp" element={<VerifyOtp/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>

      <Route element={<ProtectedRoute/>}>
      <Route path='/mylearning' element={<MyLearning />} />
      <Route path='/mylearning/:id' element={<MyLearningContinue />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/courses/:id' element={<CourseDetails />} />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default App
