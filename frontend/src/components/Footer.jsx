import React from 'react'
import { BookCheck, BookOpen, CircleUser, GraduationCap, HardHat, House, Info, Search, X } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa'
import { CgInstagram, CgYoutube } from 'react-icons/cg'
import { BsLinkedin, BsTwitterX } from 'react-icons/bs'

function Footer() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6 py-10     border-t border-[#E8ECF2] bg-[#FCFCFD] shadow-xl  '>
      <div className=' space-y-2'>
        <h1 className='text-black font-bold text-2xl flex'><span className='text-[#2563Eb] font-bold text-2xl'><GraduationCap className='h-9 font-extrabold'/></span>Study<span className='text-[#2563Eb] font-bold text-2xl'>Hub</span></h1>
        <p className='text-sm text-gray-500 font-semibold'>Empowering learners to achieve their goals and build successful careers.</p>
        <span className='flex gap-2'>
        <FaFacebook size={35} className='text-blue-900 bg-blue-100 p-2 rounded-full items-center'/>
        <CgInstagram size={35} className='text-blue-900 bg-blue-100 p-2 rounded-full items-center'/>
        <BsTwitterX size={35} className='text-blue-900 bg-blue-100 p-2 rounded-full items-center'/>
        <CgYoutube size={35} className='text-blue-900 bg-blue-100 p-2 rounded-full items-center'/>
        <BsLinkedin size={35} className='text-blue-900 bg-blue-100 p-2 rounded-full items-center'/>
        </span>
      </div>
      <div className=' space-y-2'>
        <h1 className='text-lg font-bold mb-2 '>Explore</h1>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Courses</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Instructor</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>About us</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Pricing</h2>
      </div>
      <div className=' space-y-2'>
        <h1 className='text-lg font-bold mb-2'>Support</h1>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Help Center</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Terms of Use</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Privacy Policy</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Contact us</h2>
      </div>
      <div className=' space-y-2'>
        <h1 className='text-lg font-bold mb-2'>Company</h1>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>About</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Blog</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Careers</h2>
        <h2 className='text-sm text-gray-500 hover:text-blue-600 cursor-pointer hover:font-semibold'>Press</h2>
      </div>
      <div className=' space-y-2'>
        <div className='flex flex-col gap-3 mt-3'>
        <h1 className='text-lg font-bold mb-2'>Newsletter</h1>
        <p className='text-sm text-gray-500 '>Subscribe to get updates on new courses and offers</p>
        <input type="text" placeholder='Enter your email' className='border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-300'/>
        <button className='bg-[#2563EB] text-white rounded-lg py-2 hover:bg-blue-700 transition'>Subscribe</button>
        </div>
      </div>
      <div className='border-t mt-5 pt-2 text-center text-gray-500 text-sm'>@ 2026 StudyHub All rights reserved</div>
    </div>
  )
}

export default Footer
