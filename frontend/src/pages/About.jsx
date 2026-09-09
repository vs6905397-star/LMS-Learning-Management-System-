import React, { useState } from 'react'
import MainLayout from "../layout/MainLayout"
import HeroSection from "../components/HeroSectionn"
import StudentRewiev from "../components/StudentRewiev"
import { GoalIcon } from 'lucide-react'
import { BiLowVision } from 'react-icons/bi'
import { FaLowVision } from 'react-icons/fa'

const review = [
  {id:1},{id:2},{id:3},{id:4}
]

function About() {

    const [reviews, setReviews] = useState(review);

  return (
    <MainLayout>
      <HeroSection/>
      <div className='flex justify-around'>
      <section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-200 h-fit m-10 justify-center  gap-10 cursor-pointer '>

        <div className='grid grid-cols-2 bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-4  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <GoalIcon size={100} className='bg-blue-300  ml-5 text-blue-600 rounded-full p-2'/>
            <span>
            <h1 className='font-bold text-xl'>Our Mission</h1>
            <p className='text-sm font-medium leading-tight text-gray-700'>To empower students with practical skills and Knowledge through export-led courses and real world learning experiences</p>
            </span>
        </div>

        <div className='grid grid-cols-2 bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-4  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <BiLowVision size={100} className='bg-green-300  ml-5 text-green-600 rounded-full p-2'/>
            <span>
            <h1 className='font-bold text-xl'>Our Vision</h1>
            <p className='text-sm font-medium leading-tight text-gray-700'>To become the world's most trusted online learning platform and help millions of people achieve their dream careers</p>
            </span>
        </div>  
    </section>
    </div>

      <StudentRewiev reviews={reviews}/>
    </MainLayout>
  )
}

export default About
