import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FiDelete } from 'react-icons/fi'
import { LuDelete } from 'react-icons/lu'
import { PiCertificate } from 'react-icons/pi'
import { TiTick } from 'react-icons/ti'
import { removeFromWishlist } from '../api/wishlistApi'
import toast from "react-hot-toast"

const ProfileCoursesBox = ({course,id, type, progress, fetchWishlist}) => {

  const handleRemoveWishlist = async () => {
    try {
      await removeFromWishlist(course._id)
      await fetchWishlist();
      toast.success("course removed from wishlist")
    } catch (error) {
      console.log(error);
      toast.error("server error")
    }
  }
 
  return (
    <div className='flex overflow-auto scrollbar-none items-center gap-4 border border-gray-100 py-4 px-6 rounded-xl shadow-xl my-3 mx-8'>

      <img src={course.thumbnail} alt="" className='w-30 h-20 object-cover rounded' />

      <div className='flex-1 mx-5'>
        <h3 className='font-bold text-xl my-1.5'>{course.title}</h3>
        <p className='text-sm font-semibold text-blue-500 my-1.5'>by {course.instructor?.name}</p>

        {type === "Mycourses" && (
          <p className='text-sm text-gray-600'>{progress}% Completed</p>
        )}

         {type === "completed" && (
          <p className='text-sm font-medium text-gray-400 items-center flex gap-2'><TiTick size={20} className='bg-green-300 text-green-700 rounded-full p-0.5'/> Completed</p>
        )}
      </div>

      {type === "Mycourses" && (
        <Link to={`/mylearning/${id}`}> 
        <button className='text-sm font-semibold bg-white rounded-lg p-2 mx-3  border-2 border-blue-300 text-blue-600 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-blue-300 hover:text-white transition-all duration-150'>Continue Learning</button>
        </Link>
      )}

      {type === "wishlist" && (
        <span className='flex gap-3'>
        <button onClick={handleRemoveWishlist} className='bg-gray-200 text-gray-700 flex gap-2 rounded-xl shadow-xl px-3 py-1 items-center cursor-pointer hover:scale-105 hover:bg-red-600 hover:text-white'> Remove</button>
        <Link to={`/courses/${course._id}`}> 
        <button className='bg-blue-600 text-white flex gap-2 rounded-xl shadow-xl px-3 py-1 items-center cursor-pointer hover:scale-105 hover:bg-blue-400'>View Courses</button>
        </Link>
        </span>
      )}

      {type === "completed" && (
        <button className='flex items-center gap-2 text-sm font-medium bg-white rounded-lg p-2 mx-3  border-2 border-blue-300 text-blue-600 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-blue-300 hover:text-white transition-all duration-150'><PiCertificate/> View Certificate</button>
      )}
      
    </div>
  )
}

export default ProfileCoursesBox
