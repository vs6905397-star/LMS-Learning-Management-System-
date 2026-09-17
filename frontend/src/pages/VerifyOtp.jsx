import { ArrowLeft, ArrowRight, GraduationCap, Mail, Shield, VerifiedIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import {useNavigate, Link, useLocation } from 'react-router-dom';
import { forgotPassword, resendotp, verifyotp, verifyResetOtp } from '../api/authApi';
import toast from "react-hot-toast"

const VerifyOtp = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const mode = location.state?.mode || "signup";

  {mode === "signup" ? 
    (useEffect(()=>{
    if(!email){
      navigate(mode === "forgot-password" ? "/login" : "/signup");
    }
  },[email, navigate, mode])) : (
    <></>
  )
  }
  
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [otp, setOtp] = useState("");
  const[userEmail, setUserEmail] = useState("");

  const handleVerifyotp = async() => {
    try {
      setLoading(true);

      if(mode === "signup"){
        await verifyotp({
        email,
        otp
      });

      toast.success("email verified ");
      navigate("/login");
      } 
      if(mode === "forgot-password"){

        const email = userEmail;
        const res = await verifyResetOtp({
          email,
          otp
        });

        toast.success("OTP verified!");

        navigate("/reset-password", {
          state: { email, otp: otp, resetToken: res?.resetToken }
        });
        } 
      
    } catch (error) {
      toast.error(error.response?.message)
      console.log(error)
    }finally{
      setLoading(false);
    }
  };
 
 const handleResendOtp = async () => {
  try {
    setLoadingg(true);

    if(mode === "signup"){
    await resendotp({email});
    } 
    if(mode === "forgot-password"){
      const email = userEmail
      await forgotPassword({email});
    }

    toast.success("OTP has been resent to your email");
  } catch (error) {
    toast.error(error.response?.data.message);
  }finally{
    setLoadingg(false);
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
          <h1 className='font-bold text-2xl'>{mode === "signup0" ? "Verify Your Email" : "verify Reset-Password OTP"}</h1>
        </div>
        <div className='justify-center flex items-center m-5'>
          <p className='font-semibold text-gray-600 leading-tight'>
            We sent a 6-digit verification code to your email address. Please enter it below to {""}{mode === "signup" ? "complete your registration" : "reset your password"}.
          </p>
        </div>
        </div>

        <h1 className='text-lg font-bold px-2'>Email Address</h1>
          
            {mode === "signup" ? (
              <div className='relative'>
              <Mail size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
            <input type="email" readOnly value={email || ""} className='w-full items-center m-3 border border-blue-200  bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
              </div>
            ) : (
              <>
              <div className='relative'>
              <Mail size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
            <input type="email" value={email} onChange={(e)=>setUserEmail(e.target.value)} placeholder='Enter your email...' className='w-full items-center m-3 border border-blue-200  bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
             </div>
            <h1 onClick={handleResendOtp} className='text-blue-700 font-medium text-sm cursor-pointer flex justify-end m-3'>{loadingg ? "Sending..." : "Send OTP"}</h1>
            </>
            )}
          


        <h1 className='text-lg font-bold px-2'>Verification Code</h1>
          <div className='relative'>
            <Shield size={18} className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 '/>
            <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter 6-digit code..' className='w-full items-center m-3 border border-blue-200  bg-white rounded-xl pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 shadow-xl'/>
          </div>
        
        <div className='items-center flex flex-col gap-4'>
         <button disabled={loading} onClick={handleVerifyotp} type='button' className='flex text-white bg-[#2563EB] rounded-lg items-center mt-5 px-5 py-1.5 max-w-fit hover:bg-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-150 shadow-xl'>{mode === "signup" ? "Verify Email" : "Verify OTP"}</button>
         </div>

         <div className='mt-5 justify-center flex '>
          <h1 className='text-gray-600 font-semibold'>Didn't receive the code?<button disabled={loadingg} onClick={handleResendOtp} type='button' className='text-blue-800 font-bold '> {loadingg ? "Sending..." : "Resend OTP"}</button></h1>
         </div>

         <hr className='text-gray-500 m-3'/>
        <div className='mt-5 justify-center flex '>
          <Link to={mode === "signup" ? "/signup" : "/login"}>
          <h1 className='flex justify-center items-center curs text-blue-600 font-semibold'><ArrowLeft/>{mode === "signup" ? "Back to Sign Up" : "Back to Login"}</h1>
          </Link>
         </div>

      </form>
    </section>

  )
}

export default VerifyOtp
