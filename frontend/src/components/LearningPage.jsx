import { ArrowLeft, ArrowRight, Check, CheckIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MdDone } from 'react-icons/md'

function LearningPage({lesson, handlePrevious, handleNext, handleComplete, isCompleted}) {

  return (
    <div className='flex flex-col'>
      <video src={lesson?.videoUrl} controls key={lesson?._id} className='border border-gray-300 rounded-2xl shadow-lg m-5'></video>

      <div className='border border-gray-100 rounded-xl shadow-lg m-5 px-7 py-7 space-y-3'>
        <h1 className='font-bold text-2xl'>{lesson?.title || "Select a Lesson"}</h1>
        <p className='font-medium text-gray-500'>{lesson?.description}</p>
        
            <button onClick={(e)=>{
              e.preventDefault();
              handleComplete();
            }} disabled={isCompleted} className={` text-white flex gap-2 rounded-xl shadow-xl px-3 py-1 items-center cursor-pointer   ${isCompleted ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700 hover:scale-105"}`}>{isCompleted ? <CheckIcon size={20}/> : <MdDone/>} {isCompleted ? "Completed" : "Mark as Complete" }</button>

        <hr className='text-gray-300 my-5' />

        <span className='flex justify-between mt-10'>
            <button onClick={handlePrevious} className='text-sm font-medium bg-blue-200 rounded-lg px-1 py-1  border-2 border-blue-500 text-blue-900 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-150 flex items-center gap-1.5'><ArrowLeft/> Previous Lesson</button>
            <button onClick={handleNext} className='text-sm font-medium bg-blue-200 rounded-lg px-1 py-1  border-2 border-blue-500 text-blue-900 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-150 flex items-center gap-1.5'><ArrowRight/> Next Lesson</button>
        </span>
      </div>

      <div className='border border-gray-100 rounded-xl shadow-lg m-5 px-7 py-7 space-y-3'>
        <h1 className='font-bold text-xl'>What You Learn</h1>
        <ul className='spce-y-2'>
         {lesson?.whatYouLearn.map((item, index) => (
          <li key={index} className='font-medium flex items-center mt-2'><Check className='ml-2 space-x-3 bg-blue-200 rounded-full text-blue-600 p-0.5'/>{item}</li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default LearningPage
