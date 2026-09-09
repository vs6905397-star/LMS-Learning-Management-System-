import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import react from "../assets/react.png"
import { BiStar } from 'react-icons/bi'
import { Link, Navigate } from 'react-router-dom'
import { MdDone } from 'react-icons/md'
import { VideoIcon } from 'lucide-react'
import { createEnrollment } from "../api/enrollmentApi"

function CoursesBox({courses,id, type , enrolled = false}) {

  return (
    <section key={courses?._id} className='grid  min-w-60 bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2   hover:scale-105 hover:shadow-xl transition-all duration-150'>
      <Link to={enrolled ? `/mylearning/${id}` : `/courses/${courses._id}`}>
        <div className='items-center justify-items-center  ' >
            <img src={courses?.thumbnail} alt="" className='rounded-xl shadow-xl'/>
        </div>
       
        <div className='flex flex-col p-2 space-y-3 '>
            <h1 className='font-bold text-lg leading-tight'>{courses?.title}</h1>
            <div className='flex items-center justify-between'>
           <span className='text-sm font-semibold flex gap-2 text-gray-600'><CgProfile size={25} className='text-black'/>{courses?.instructor.name}</span>
           <span className='text-gray-600'>{courses?.rating}⭐</span>
           </div>
           <div className={`flex ${enrolled ? "justify-center pt-3" : "justify-between"}  items-center`}>
            
            {type === "courses" && (
              <p className='text-xl font-bold text-green-600'>${courses?.price}</p>
            )}
            {type === "courses" && (
              <button  className='text-sm font-semibold bg-blue-200 rounded-lg px-1 py-1  border-2 border-blue-500 text-blue-900 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-150' >Read more</button>
            )}

            {type === "learning" && (
              <button  className='text-sm font-semibold bg-blue-200 rounded-lg px-1 py-1  border-2 border-blue-500 text-blue-900 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-150 flex items-center gap-1.5' ><VideoIcon size={15}/> Continue Learning</button>
            )}

            {type === "completed" && (
              <button  className='text-sm font-semibold gap-2 text-green-600 cursor-pointer hover:scale-105  transition-all duration-150 flex items-center' > <MdDone size={20} className='bg-green-300 p-0.5 text-green-800 rounded-full'/>Completed</button>
            )}
            </div>
        </div>
      </Link>
    </section>
  )
}

export default CoursesBox
