import { section } from 'framer-motion/client'
import {useState} from 'react'
import { BiCalendar, BiCylinder, BiDownload, BiMobile } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { CiClock1 } from 'react-icons/ci'
import { GiRamProfile, GiVideoCamera, GiVideoConference } from 'react-icons/gi'
import { ImProfile } from 'react-icons/im'
import { MdAccessTime, MdAssignment } from 'react-icons/md'
import { PiCertificateFill } from 'react-icons/pi'
import { createEnrollment } from '../api/enrollmentApi'
import { addToWishlist } from "../api/wishlistApi"
import toast from "react-hot-toast"

function CourseInfo({course, loading, error}) {

  const[loadinggg, setLoadinggg]=useState(false)
  const[loadingg, setLoadingg]=useState(false)

    const enrollCourse = async () => {
      try {
        setLoadingg(true)
        const res = await createEnrollment(course._id);
        
        toast.success("Course Enrolled Successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
      setLoadingg(false)
    }
    }

    const handleWishlist = async () => {
      try {
        setLoadinggg(true)
        const res = await addToWishlist(course._id);
        
        toast.success("course Added to Wishlist");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }finally{
        setLoadinggg(false)
      }
    }

  return (
    <div className='flex flex-col lg:flex-row gap-6 -full m-3'>

      {/*main card */}

{loading ? (
  <p className='text-center justify-center text-gray-500 p-5'>loading courses...</p>
) : error ? (
  <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchEnrollment} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
) : (

<>
    <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full rounded-2xl bg-zinc-100 shadow-2xl  p-4 md:p-6'>
        <div className='flex rounded-xl overflow-hidden w-full h-48 md:h-auto'>
            <img src={course?.thumbnail} alt="" className='w-full h-full object-cover'/>
        </div>

        <div className='flex flex-col mx-3 gap-4'>
           <h1 className='text-2xl md:text-3xl font-bold my-1.5'>{course?.title}</h1>
           <p className='text-base md:text-lg font-semibold text-gray-500 my-2'>{course?.description}</p>

           <span className='flex flex-wrap gap-3 items-center'>
            <img src={course?.instructor?.name} alt="" className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover overflow-hidden' />
            <h1 className='text-sm md:text-base font-semibold'>{course?.instructor?.name}</h1>
           </span>

           <span className='flex flex-wrap gap-2 justify-between items-center'>
             <h1 className='text-lg md:text-xl font-semibold text-gray-600'>⭐{course?.rating}</h1>
             <h1 className='flex gap-3 items-center text-xl font-semibold text-gray-600 border-l-2 border-gray-400'><ImProfile size={20} className='text-blue-500 ml-10'/> {course?.studentsCount} students enrolled</h1>
           </span>

           <div className='flex flex-wrap gap-4 items-centertext-xs md:text-sm font-semibold'>
            <span className='flex gap-2 items-center'>
              <CiClock1 size={20} />25.5 hours
              </span>
            <span className='flex gap-2 items-center border-l pl-2 border-gray-400'>
              <GiVideoConference size={20} /> {course?.curriculum.length} Chapters
              </span>
            <span className='flex gap-2 items-center  border-l pl-2 border-gray-400'>
              <BiCalendar size={20}/>Last updated Apr 2025
              </span>
           </div>
        </div>
    </section>

    <section className='w-full lg:w-65 shrink-0 flex flex-col  gap-3 border border-gray-100 shadow-lg rounded-xl p-5 bg-zinc-100 mt-3 '>
      <div className='flex justify-between items-center'>
      <h1 className='text-sm font-semibold'>Course Status</h1>
      <span className='bg-green-200 text-green-500 font-semibold rounded-2xl p-1 shadow-sm'>Avilable</span>
      </div>

      <h1 className='text-xl md:text-2xl font-bold'> Free</h1>
      <button disabled={loadingg || !course?._id} onClick={enrollCourse} className='text-white bg-[#2563EB] p-1 rounded-lg items-center mx-3 hover:bg-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-150 shadow-xl cursor-pointer'>{loadingg ? "Enrolling..." : "Enroll Now"}</button>
      <button disabled={loadinggg || !course?._id} onClick={handleWishlist} className='text-sm font-semibold bg-white rounded-lg p-1 mx-3  border-2 border-blue-300 text-blue-900 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-blue-300 hover:text-white transition-all duration-150'>{loadinggg ? "Adding...": "Add to Wishlist"}</button>
      
      <hr className=' text-gray-300 my-2'/>

     <div className='space-y-3 text-sm font-semibold text-gray-700'></div>
      <span className='flex gap-2 items-center '>
        <MdAccessTime size={20}/>
        Full lifetime Access
      </span>

      <span className='flex gap-2 items-center '>
        <BiMobile size={20}/>
        Access on mobile and TV
      </span>

      <span className='flex gap-2 items-center '>
        <BiDownload size={20}/>
       Downloadable resources
      </span>

      <span className='flex gap-2 items-center '>
        <MdAssignment size={20}/>
        Assignment & quizzes
      </span>

      <span className='flex gap-2 items-center'>
        <PiCertificateFill size={20}/>
         Certificate of complrtion
      </span>

      
    </section>
</>
  )}
    </div>
    
  )
}

export default CourseInfo
