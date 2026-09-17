import { ArrowLeft, ArrowRight, GraduationCap, InfoIcon, Mail, Shield, VerifiedIcon } from 'lucide-react'
import React, { useState } from 'react'
import {useNavigate, Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../api/authApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {

  const navigate = useNavigate();
  const location = useLocation();

   const email = location.state?.email;
   const resetToken = location.state?.resetToken;
  const mode = location.state?.mode || "forgot-password";
console.log(resetToken, email)
  const[newPassword, setNewPassword] = useState("");
  const[loading, setLoading] = useState(false)

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      await resetPassword({
        resetToken,
        newPassword
      });

      toast.success("Password Reset Successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data.message)
    }finally{
      setLoading(false);
    }
  }

  return (
    <section className='flex flex-col justify-center items-center bg-blue-50 min-h-screen w-ful overflow-x-hidden'>

      <form  className='lg:w-120 md:w-110 w-auto flex flex-col bg-white m-12 p-8 rounded-3xl shadow-lg '>
        <div className='space-y-3'>
        <div className='justify-center flex'>
        <h1 className='text-black font-bold text-2xl flex'><GraduationCap size={40} className='text-blue-700'/>Study <span className='text-blue-700 '>Hub</span></h1>
        </div>
        <div className='justify-center flex'> 
          <h1 className='font-bold text-2xl'>Reset Password</h1>
        </div>
        <div className='justify-center flex items-center m-5'>
          <p classNoame='font-swemibold text-gray-600 leading-tight'>
            Enter your new password below. Make sure it's strong and easy to remember
          </p>
        </div>
        </div>

        <h1 className='text-lg font-bold px-2'>Email Address</h1>
          <div className='relative'>
            <Mail size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
            <input type="email" readOnly value={email || ""} className='w-full items-center m-3 border border-blue-200  bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
          </div>
  
        <h1 className='text-lg font-bold px-2'>New Password</h1>
          <div className='relative'>
            <Shield size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
            <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter new password...' className='w-full items -center m-3 border border-blue-200  bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
          </div>
         
        <div className='items-center flex flex-col gap-4'>
          <button onClick={handleResetPassword} disabled={loading}  type='button' className='flex text-white bg-[#2563EB] rounded-lg items-center mt-5 px-5 py-1.5 max-w-fit hover:bg-blue-400 hover:sceale-105 hover:shadow-xl transition-all duration-150 shadow-xl'>{loading ? "Resetting..." : "Reset Password"}{loading? "" : <ArrowRight size={20}/>}</button>
         </div>

         <hr className='text-gray-500 m-3'/>
        
           <div className='mt-5 justify-center flex'>
         <h1 className='flex bg-blue-100 text-blue-400 rounded-lg shadow-xl m-5 p-2 text-sm gap-2'><InfoIcon size={20}/>Your password must be different from your previous passwords for better security</h1> 
         </div>
      </form>
    </section>

  )
}

export default ResetPassword
