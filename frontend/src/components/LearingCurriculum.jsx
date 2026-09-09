import { CrossIcon, Folder, PlayCircle, Plug, Plus, Star, StarCheck, StarIcon } from 'lucide-react';
import React, {useState} from 'react'
import { BiSolidDownArrow, BiSolidUpArrow, BiStar } from 'react-icons/bi';
import { CgStark } from 'react-icons/cg';
import { GiCancel } from 'react-icons/gi';
import { MdCancel } from 'react-icons/md';
import { createReview } from "../api/reviewApi"
import toast from "react-hot-toast"

function LearingCurriculum({course, currentLesson, onLessonSelect, courseId}) {


  const[comment, setComment] = useState("");

  const [openChapter, setOpenChapter] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const[loading, setLoading]=useState(false)

  const[rating, setRating] = useState(0);

  const handleReviewPost = async () => {
    if(!courseId){
      toast.error("select a enrolled course")
      return;
    }
    try {
      setLoading(true)
      const reviewData = {
        comment: comment,
        rating: rating,
        courseId: courseId
      };

      const res = await createReview(reviewData);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col items-center">
    <div className='border border-gray-300 rounded-xl shadow-lg m-5 p-5 max-h-fit'>
      
      <h1 className='text-xl font-bold'>Course Curriculum</h1>

      <hr className='text-gray-300 my-4'/>

      {course?.course?.curriculum.map((chapter) => (
              <div key={chapter._id} className='border border-gray-300 rounded-xl overflow-hidden my-4 shadow-xl'>
                <button onClick={() => setOpenChapter(openChapter === chapter._id ? null : chapter._id)}
                 className='w-full  p-4 text-left font-bold hover:bg-blue-200 '>
                  <div className='flex justify-between items-center'>
                    
                  <span className='flex gap-3'><Folder  className='text-blue-600  '/><h1>{chapter.id}.</h1> {chapter.title}</span>
                  <span className='text-gray-600 text-sm font-semibold flex gap-3'>{chapter.lessons.length} Lessons
                    <span className='text-xl text-blue-700'>{openChapter === chapter._id ? <BiSolidDownArrow/> : <BiSolidUpArrow/>}</span>
                  </span>     
                  </div>
                </button>

                {openChapter === chapter._id && (
                  <div className='border-t'>
                    {chapter.lessons.map((lesson, index) => {
                      const isSelected = currentLesson?._id === lesson._id;
                      const isDone = course?.completedLessons.includes(lesson._id);
                      
                      return (
                      <div key={lesson._id} onClick={()=>onLessonSelect(lesson)} className={`cursor-pointer border-b border-gray-100 last:border-0 p-4 transition-all ${isSelected ? "bg-blue-100 border-l-4 border-l-blue-600" : "hover:bg-gray-50"}`}>
                        <div className='flex items-center justify-between px-6 py-4'>
                        <div className='flex items-center justify-between'>
                          <span className='flex gap-3 items-center'>
                            <PlayCircle className={isDone ? "text-green-600" : "text-blue-600"}/>
                            <h1>{lesson.id}.</h1>
                            <span className={`text-sm font-medium ${isSelected ? "font-bold text-blue-900" : "text-gray-700"}`}>{index+1}. {lesson.title}</span>
                          </span>                      
                        </div>
                        <div className='flex items-center gap-2'>
                          {isDone && <span className='text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded'>Completed</span>}
                          <span className='text-sm font-medium text-gray-600 '>{lesson.duration}</span>
                        </div>                   
                        </div> 

                        <hr className='text-gray-300 mx-6 my-1'/>   
                      </div>
                      )
                    })}
                  </div>
                )}
               
                
              </div>
            ))}
    </div>

      <div className='m-5 p-5 justify-center items-center'>
         <button onClick={()=>setReviewOpen(true)} className='flex gap-1 rounded-xl shadow-xl text-white font-medium p-2 bg-blue-700 hover:bg-blue-500 hover:scale-110 cursor-pointer'><Plus/>Add Review</button>
      </div>
    
     
     {reviewOpen && (
      <div className="fixed inset-0 bg-slate-900/40  backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className='bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-100 p-6'>
        <span className='flex justify-between space-y-5'>
        <h1 className='font-bold text-lg'>Add Your Review</h1>
        <MdCancel size={25} className='text-blue-700' onClick={()=>setReviewOpen(false)}/>
        </span>

        <div className='flex space-y-3'>
          {[1, 2, 3, 4, 5].map((star)=>(
            <Star fill="currentColor" key={star} onClick={()=>setRating(star)} className={`cursor-pointer text-3xl text-gray-300 space-x-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}/>
          ))}
        </div>
        <textarea onChange={(e)=>setComment(e.target.value)} placeholder='write review.....' className='h-28 border border-gray-300 rounded-xl outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition w-full p-4'/>
         
         <span className='flex justify-around mt-5'>
        <button onClick={()=>setReviewOpen(false)} className='py-1 px-5 font-medium rounded-xl shadow-xl bg-white border border-gray-200 hover:text-white hover:bg-red-500 hover:scale-110 cursor-pointer'>cancle</button>
        <button disabled={loading} onClick={()=>{
          handleReviewPost();
          setReviewOpen(false);
        }} className='py-1 px-5 font-medium text-white rounded-xl shadow-xl bg-blue-700 hover:bg-blue-500 hover:scale-110 cursor-pointer'>{loading ? "Submitting..." : "Save"}</button>
        </span>
        </div>
      </div>
     )}

    </div>
  )
}

export default LearingCurriculum
