import { BadgeCheck, BriefcaseBusiness, GraduationCap, MonitorSmartphone, Infinity } from 'lucide-react'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { ImProfile } from 'react-icons/im'

function StudentRewiev({reviews}) {
  
  return (
    <>
    <div className='flex justify-center items-center px-4 '>
        <h1 className='text-2xl font-bold mt-3 p-2'>Why Choose us</h1>
    </div> 

    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-7 justify-center  gap-3 cursor-pointer '>

        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <GraduationCap size={50} className='bg-blue-300 text-blue-600 rounded-full p-2'/>
            <span>
            <h1 className='font-bold text-lg'>Expert Mentors</h1>
            <p className='text-sm font-medium leading-tight text-gray-700'>Learn from industry professionals</p>
            </span>
        </div>

        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <Infinity size={50} className='bg-green-300 text-green-600 rounded-full p-2'/>
            <span>
            <h1 className='font-bold text-lg'>Lifetime Access</h1>
            <p className='text-sm font-medium leading-tight text-gray-700'>Learn anytime, anywhere</p>
            </span>
        </div>

        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <BadgeCheck size={50} className='bg-orange-300 text-orange-600 rounded-full p-2'/>
            <span>
            <h1 className='font-bold text-lg'>Certificates</h1>
            <p className='text-sm font-medium leading-tight text-gray-700'>Get recognized and buildtrust</p>
            </span>
        </div>
      
      <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <BriefcaseBusiness size={50} className='bg-violet-300 text-violet-600 rounded-full p-2'/>
            <span>
            <h1 className='font-bold text-lg'>Placement Support</h1>
            <p className='text-sm font-medium leading-tight text-gray-700'>Boost your career prospects</p>
            </span>
        </div>
    </section>

    <div className='flex justify-center items-center px-4 my-5'>
        <h1 className='text-2xl font-bold mt-3 p-2'>What Our Students Say</h1>
    </div> 

    <div className='flex flex-row overflow-x-scroll scrollbar-none justify-center  gap-4 shadow-lg min-h-fit mx-8'>
    {reviews.map((review) => (
      <section kry={review.id} className='grid  min-w-100 bg-whitesmoke rounded-xl shadow-2xl bg-blue-50 border border-gray-200 items-center p-3  space-y-3 hover:scale-105 hover:shadow-xl transition-all duration-150 mx-3 my-6'>
        <p className='font-semibold text-sm'>"Stydy Hub has completely transformed the way I learn. the courses are top-notch!"</p>
        <div className='flex justify-between'>
            <span className='flex gap-3'>
            <CgProfile size={60}/>
            <span>
            <h1 className='text-lg font-bold'>Sarah Wilson</h1>
            <h1 className='text-sm font-semibold text-gray-600'>MCA Student</h1>
            </span>
            </span>
            <span>⭐⭐⭐⭐</span>
        </div>
    </section>
    ))}
    </div>
    </>
  )
}

export default StudentRewiev
