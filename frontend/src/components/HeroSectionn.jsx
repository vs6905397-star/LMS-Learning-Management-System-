import React from 'react'
import { BiBookOpen, BiSolidBookOpen, BiStar } from 'react-icons/bi'
import { BsArrowRight, BsPeople } from 'react-icons/bs'
import { FaBookOpen } from 'react-icons/fa'
import Image from "../assets/bg1.jpeg"
import { Link } from 'react-router-dom'

function HeroSectionn() {
  return (
    <section className='grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 items-center min-h-[60vh] bg-blue-0 shadow-xl px-8 '>

        <div className='space-y-3 '>

        <h1 className='text-5xl font-bold leading-tight'>Learn Without <span className='text-[#2563EB]'>Limits</span></h1>
        <p className='text-gray-500 '>Discover courses from expert instructors and build real-world skills to achieve your goals</p>
        <Link to="/courses" >
        <button className='text-white bg-[#2563EB] p-3 rounded-lg flex items-center gap-2 hover:bg-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-150 shadow-xl'>Explore Courses <BsArrowRight size={20}/></button>
        </Link>
        <div className='grid grid-cols-2  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 space-3 gap-2 mt-6'>
            <div className='flex space-x-3  p-3 shadow-xl rounded-3xl hover:scale-105 hover:shadow-xl transition-all duration-150'>
                <BiSolidBookOpen size={60} className='bg-blue-200 text-blue-800 rounded-full p-3' />
                <span>
                <h1 className='font-bold text-2xl'>120+</h1>
                <h2 className='text-sm text-gray-500 font-semibold'>Courses</h2>
                </span>
            </div>
            <div className='flex space-x-3  p-3 shadow-xl rounded-3xl hover:scale-105 hover:shadow-xl transition-all duration-150'>
                <BsPeople size={60} className='bg-blue-200 text-blue-800 rounded-full p-3' />
                <span>
                <h1 className='font-bold text-2xl'>5,000+</h1>
                <h2 className='text-sm text-gray-500 font-semibold'>Students</h2>
                </span>
            </div>
            <div className='flex space-x-3   p-3 shadow-xl rounded-3xl hover:scale-105 hover:shadow-xl transition-all duration-150'>
                <BiStar size={60} className='bg-blue-200 text-blue-800 rounded-full p-3'/>
                <span>
                <h1 className='font-bold text-2xl'>4.9</h1>
                <h2 className='text-sm text-gray-500 font-semibold'>Average Rating</h2>
                </span>
            </div>
        </div>
        </div>

        <div className='flex justify-center'>
            <img src={Image} alt="" className='rounded-xl shadow-xl p-2'/>
        </div>

    </section>
  )
}

export default HeroSectionn
