import React from 'react'
import { useState } from 'react'
import { ArrowRight, GraduationCap, Lock, Mail, User } from 'lucide-react'
import {useNavigate, Link } from 'react-router-dom'
import LoginImg from "../assets/login.jpeg"
import { useAuth } from "../context/authContext"
import toast from "react-hot-toast"

const Login = () => {

    const  { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[errors, setErrors] = useState({});
    const[loading, setLoading]= useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

      if(!validateLogin()) return;

      try {
        setLoading(true)
        await login({
          email,
          password
      });

        toast.success("login successfully");
        navigate("/");
        
      } catch (error) {
        console.log(error.response?.data )
        toast.error(error.response?.data.message)
      }finally{
        setLoading(false)
      }
    }

    const validateLogin = () => {
    const newErrors = {};

    if(!email.trim()){
      newErrors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(email)){
      newErrors.email = "Enter a Valid email";
    }

    if(!password){
      newErrors.password = "Password is required";
    }else if(password.length < 6){
      newErrors.password = "Password is invalid";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-blue-50 min-h-screen w-ful overflow-x-hidden'>
      <div className='flex flex-col m-5 p-3 justify-between min-h-screen w-full'>
        <div className='justify-between'>
          <h1 className='text-black font-bold text-2xl flex'><GraduationCap size={40} className='text-blue-700'/>Study <span className='text-blue-700 '>Hub</span></h1>
        </div>
         <div className='justify-center items-center'>
          <h1  className='text-black font-bold text-4xl mt-7'>Welcome<span className='text-blue-700 '>Back 👋</span></h1>
          <p className='text-gray-400 font-semibold text-xl mt-2'>Login to continue your learning journey</p>
        </div>
    
        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col bg-white m-12 p-8 rounded-3xl shadow-lg '>
          <h1 className='text-lg font-bold px-2'>Email Address</h1>
          <div className='relative'>
          <Mail size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
          <input type="text" placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full items-center m-3 border border-blue-200  bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
          {errors.email && (
            <p className='text-red-600 text-sm mt-1 px-2'>{errors.email}</p>
          )}
          </div>
          <h1 className='text-lg font-bold px-2'>Password</h1>
          <div className='relative'>
          <Lock size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
          <input type="text" placeholder='Password..' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full items-center m-3 border border-blue-200   bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
          {errors.password && (
            <p className='text-red-600 text-sm mt-1 px-2'>{errors.password}</p>
          )}
          </div>
          <div className='items-center flex flex-col gap-4'>
          <button disabled={loading} onClick={handleLogin} className='flex text-white bg-[#2563EB] rounded-lg items-center mt-5 px-5 py-1.5 max-w-fit hover:bg-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-150 shadow-xl'>{loading ? "Logging in..." : "Login"}<ArrowRight size={20}/></button>
          <span className='text-gray-500 font-semibold'>Don't have an account? <Link to="/signup" className='text-blue-700 '>  Sign up</Link></span>
          </div>
        </form>
      </div>

      <div className='max-h-screen w-full items-center justify-center hidden lg:block md:block p-6'>
        <img src={LoginImg} alt=""  className="w-full object-fit rounded-3xl shadow-xl h-[calc(100vh-60px)]"/>
      </div>
    </section>
  )
}

export default Login
