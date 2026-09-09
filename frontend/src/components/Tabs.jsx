import { BookAIcon, Check, ChevronDown, CornerRightUp, Delete, Dot, DotIcon, Folder, PlayCircle, Plus } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { MdAccessTime, MdAssignment, MdDeleteForever } from 'react-icons/md'
import LoginImg from "../assets/login.jpeg"
import { ImProfile } from 'react-icons/im';
import { BiDownArrow, BiSolidDownArrow, BiSolidUpArrow, BiUpArrow } from 'react-icons/bi';
import { FcDown } from 'react-icons/fc';
import { useAuth } from "../context/authContext"
import { deleteReview } from '../api/reviewApi';
import toast from "react-hot-toast"

function Tabs({course, reviews, fetchReview}) {

   const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);
  const [openChapter, setOpenChapter] = useState(null);

  const handleDeleteReview = async (id) => {
      try {
        const res = await deleteReview(id);
        
        toast.success(res.data.message)
        await fetchReview();
      } catch (error) {
        toast.error("somthing went wrong")
        console.log(error)
      }
    }

  return (

   <div className='flex flex-col lg:flex-row gap-6 w-full'>

    <div className='flex-1 w-full mt-5'>

    <section className='rounded-2xl bg-zinc-100 shadow-lg p-3 md:p-5 overflow-x-auto '>
      <div className='flex justify-start md:justify-around item-center gap-3 min-w-max borber-b border-gray-300 pb-3'>
        <NavLink onClick={() => setActiveTab("overview")} className="font-bold text-gray-800 hover:text-[#1D4ED8] whitespace-nowrap">Overview</NavLink>
        <NavLink onClick={() => setActiveTab("circulum")} className="font-bold text-gray-800 hover:text-[#1D4ED8] whitespace-nowrap">Circulum</NavLink>
        <NavLink onClick={() => setActiveTab("instructor")} className="font-bold text-gray-800 hover:text-[#1D4ED8] whitespace-nowrap">Instructor</NavLink>
        <NavLink onClick={() => setActiveTab("fa&q")} className="font-bold text-gray-800 hover:text-[#1D4ED8] whitespace-nowrap">FA&Q</NavLink>
      </div>

      <hr className='text-gray-400 my-3'/>

      <div>
        { activeTab === "overview" && (
          <div className='m-2.5 p-2'>
            <h1 className='font-bold text-xl mt-1.5'>About the Course</h1>
            <p className='text-sm font-medium my-2.5'>{course?.description}</p>

            <hr className='text-gray-400 my-9'/>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3'>

            <div>
            <h1 className='text-lg font-bold my-5'>What You'll Learn</h1>
            {course?.whatYouLearn.map((e) => (
              <h1 key={e.index} className='flex gap-2 my-3 text-l font-medium'><Check size={25} className=' text-green-800 bg-green-300 rounded-full p-1'/>{e}</h1>
            ))}
           </div>

            <span className='border-l-2 ml-17 border-gray-300 min-w-fit'></span>

           <div className=''>
            <h1 className='text-lg font-bold my-5'>Requirments</h1>
            {course?.requirments.map((e) => (
              <h1 key={e.index} className='flex gap-2 my-3 text-l font-medium'><Dot size={30}/>{e}</h1>
            ))}
           </div>               
           </div>

           <hr className='text-gray-400 mt-9'/>

          </div>       
        )}



        { activeTab === "fa&q" && (
          <div className='m-2.5 p-2'>
            <h1 className='font-bold text-xl mt-1.5'>Frequently Asked Questions</h1>
            
            <hr className='text-gray-400 my-5'/>

            {course?.faqs.map((faq,index) => (
              <div key={index} className='border border-gray-300 rounded-xl overflow-hidden my-4 shadow-xl'>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                 className='w-full flex items-center justify-between p-4 text-left font-bold hover:bg-blue-200'>

                  <span>{faq.question}</span>
                  <span className='text-xl'>{openFaq === index ? "-" : "+"}</span>

                </button>

                {openFaq === index && (
                 
                  <div className=' px-4 pb-4 text-gray-800 my-2 items-center justify-center font-semibold'>
                     <hr className='text-gray-400 my-3'/>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
           <hr className='text-gray-400 mt-9'/>

          </div>       
        )}



        { activeTab === "instructor" && (
          <div className='m-2.5 p-2'>
            <div className='flex gap-6 items-center'>
              <img src={course?.instructor.image} className='w-30 h-30 rounded-full object-cover'/>
              <span >
              <h1 className='text-2xl font-bold '>{course?.instructor.name}</h1>
              <p className='text-xl font-semibold pb-4 text-gray-700'>{course?.instructor.qualification}</p>
              <p className='text-sm font-semibold'>⭐ 4.8  Instructor Rating</p>
              </span>
            </div>

            <hr className='text-gray-400 mt-4' />

            <div className='flex justify-around my-6'>
              <span className='flex items-center gap-5 '>
                <ImProfile size={20} className='text-blue-700'/>
                <span>
                  <h1 className='text-xl  font-bold'>25k+</h1>
                  <h1 className='text-l  text-gray-600 font-semibold'>Students</h1>
                </span>            
             </span>

             <span className='flex items-center gap-5 '>
                <BookAIcon size={20} className='text-blue-700'/>
                <span>
                  <h1 className='text-xl  font-bold'>12</h1>
                  <h1 className='text-l  text-gray-600 font-semibold'>Courses</h1>
                </span>            
             </span>

             <span className='flex items-center gap-5'>
                <CgProfile size={20} className='text-blue-700'/>
                <span>
                  <h1 className='text-xl  font-bold'>{course?.instructor.experience}</h1>
                  <h1 className='text-l  text-gray-600 font-semibold'>Years Experience</h1>
                </span>            
             </span>
            </div>

            <hr className='text-gray-400 mt-6' />


            <div>
              <h1 className='text-xl font-bold px-5 pt-5'>About Instructor</h1>
              <p className='text-l text-gray-700 font-semibold px-5 py-2'>{course?.instructor.description}
              </p>
            </div>

            <div>
              <h1 className='text-xl font-bold px-5 pt-5'>Top Skills</h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-4 justify-center items-center gap-3'>
                {course?.instructor.skills.map((skill)=>(
                  <span className='flex leading-tight text-xl font-bold text-blue-600 bg-blue-200 rounded-xl px-3 py-1 shadow-xl hover:scale-105 hover:shadow-xl transition-all duration-150'>{skill}</span>
                ))}
              </div>
            </div>
          </div>       
        )}


        
         { activeTab === "circulum" && (
          <div className='m-2.5 p-2'>
            <h1 className='font-bold text-xl mt-1.5'>Course Curriculum</h1>
            
            <hr className='text-gray-400 my-5'/>

            {course?.curriculum.map((chapter) => (
              <div key={chapter._id} className='border border-gray-300 rounded-xl overflow-hidden my-4 shadow-xl'>
                <button onClick={() => setOpenChapter(openChapter === chapter._id ? null : chapter._id)}
                 className='w-full  p-4 text-left font-bold hover:bg-blue-200 '>
                  <div className='flex justify-between items-center'>
                    
                  <span className='flex gap-3'><Folder  className='text-blue-600  '/><h1><DotIcon/></h1> {chapter.title}</span>
                  <span className='text-gray-600 text-sm font-semibold flex gap-3'>{chapter.lessons.length} Lessons
                    <span className='text-xl text-blue-700'>{openChapter === chapter._id ? <BiSolidDownArrow/> : <BiSolidUpArrow/>}</span>
                  </span>     
                  </div>
                </button>

                {openChapter === chapter._id && (
                  <div className='border-t'>
                    {chapter.lessons.map((lesson) => (

                      <div key={lesson.id} >
                        <div className='flex items-center justify-between px-6 py-4'>
                        <div className='flex items-center justify-between'>
                          <span className='flex gap-3 items-center'>
                            <PlayCircle className='text-blue-600'/>
                            <h1><DotIcon/></h1>
                            <span className='text-sm font-medium '>{lesson.title}</span>
                          </span>                      
                        </div>
                        <span className='text-sm font-medium text-gray-600 '>{lesson.duration}</span>
                        </div> 

                        <hr className='text-gray-300 mx-6 my-1'/>   
                      </div>                 
                    ))}
                  </div>
                )}          
              </div>
            ))}
           <hr className='text-gray-400 mt-9'/>
          </div>       
        )}
      </div>
    </section>

      <div className='mt-8'>
      <h1 className='text-xl md:text-2xl font-bold mx-2 my-4'>Top Reviews</h1>
     <div className='flex flex-row overflow-x-scroll gap-4 p-2 scrollbar-none '>
          
          {reviews.length > 0 ? (

             reviews?.map((review) => (
            <section kry={review._id} className='min-w-70 md:min-w-[320px] border border-gray-200 rounded-xl p-4 shadow-lg bg-white '>
              <p className='font-semibold text-sm my-2'>"{review.comment}!"</p>
              <div className='flex gap-1 my-2'>
                  {[1, 2, 3, 4, 5].map((star)=>(
                    <span key={star} className={star<=review.rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>⭐</span>
                  ))}
                  </div>
              <div className='flex justify-between items-center mt-4'>
                  <div className='flex gap-3 items-center'>
                  <img src={review.user.dp} alt="" className='w-10 h-10 rounded-full object-cover '/>
                  <div>
                  <h1 className='text-sm font-bold'>{review.user.name}</h1>
                  <h1 className='text-xs  text-gray-600'>{review.user.email}</h1>
                  </div>
                  </div>
                  
                  {review.user._id === user?._id && (
                    <div onClick={()=>handleDeleteReview(review._id)} className='justify-center items-center cursor-pointer'>
                    <MdDeleteForever size={25}/>
                  </div>
                  )}
                               
              </div>
          </section>
          ))
          ) : (
            <p className='text-center text-gray-500 p-5 w-full'>
          No review yet. Be the first to review!
          
        </p>
          )}
          </div>
         </div>
      </div>    


    <section className='w-full lg:w-70 shrink-0 flex flex-col gap-4'>
      <div className='border border-gray-100 shadow-lg rounded-xl bg-zinc-100 p-4 '>
        <h1 className='text-lg mb-3 font-bold'>This Course Includes</h1>
        
        <div className='space-y-3 text-sm font-semibold'>
        <span className='flex gap-2 items-center '>
                <MdAccessTime size={20}/>
                65 Lessons
        </span>

        <span className='flex gap-2 items-center'>
                <MdAccessTime size={20}/>
                10 Assignment
        </span>

        <span className='flex gap-2 items-center '>
                <MdAccessTime size={20}/>
                8 Quizzes
        </span>

        <span className='flex gap-2 items-center '>
                <MdAccessTime size={20}/>
                Downloadable Resources
        </span>

        <span className='flex gap-2 items-center '>
                <MdAccessTime size={20}/>
                Full lifetime Access
        </span>
        </div>
      </div>


      <div className='h-40 shadow-lg rounded-xl bg-blue-500 p-4 text-white flex flex-col justify-center '>
        <h1 className='text-lg font-bold'>Learn at your own pace</h1>
        <p className='font-semibold text-sm  my-3'>Start Learning today and become job ready developers</p>
      </div>

      <div className='h-100  w-full p-10 border border-gray-100 shadow-lg rounded-xl bg-blue-100 overflow-hidden justify-center items-center'>
        <img src={LoginImg} alt="" className='object-cover' />
      </div>

    </section>
   </div>  
  )
}


export default Tabs
