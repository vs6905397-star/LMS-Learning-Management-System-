import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from "../layout/MainLayout"
import LearningPage from '../components/LearningPage'
import LearingCurriculum from '../components/LearingCurriculum'
import {getEnrolledById, markAsComplete}from "../api/enrollmentApi"
import toast from "react-hot-toast"

function MyLearning() {

    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState("");

   const fetchCourse = async()=>{
    try { 
      setLoading(true);
      setError("");

      const res = await getEnrolledById(id);

      setCourse(res.enrollment);
    } catch (error) {
      setError("Failed to load data. please try again")
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(id) fetchCourse();
  },[id]);

    const lessons = course?.course?.curriculum?.flatMap(chapter => chapter.lessons) || [];
  
    useEffect(() => {
      if(lessons.length > 0 && !currentLesson){
        setCurrentLesson(lessons[0]);
      }
    },[course]);

    const currentIndex = lessons.findIndex(
    lesson => lesson._id === currentLesson?._id
  );

  const handleNext = () => {
    if(currentIndex < lessons.length - 1){
      setCurrentLesson(lessons[currentIndex + 1])
    }
  };

  const handlePrevious = () => {
    if(currentIndex > 0){
      setCurrentLesson(lessons[currentIndex - 1])
    }
  }
 
    const handleComplete = async () => {

      if(!currentLesson?._id || !id){
        return toast.error("Lesson not found");
      }

    try {

      const res = await markAsComplete(id, currentLesson._id);

      if(res?.data.success){
        toast.success(res.message || "mark completed");
        await fetchCourse();
       } else {
        toast.error(res?.message || "faild")
       }

    } catch (error) {
      console.log(error);
      toast.error("server error")
    }
  } 

  return (
    <MainLayout>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_450px] gap-2 lg:flex-row md:flex-row flex-col'>
 {loading ? (
  <p className='text-center justify-center text-gray-500 p-5'>loading courses...</p>
 ) : error ? (
  <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchCourse} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
 ) : (
  <>
  <LearningPage lesson={currentLesson} handleNext={handleNext} handlePrevious={handlePrevious} handleComplete={handleComplete} isCompleted={course?.completedLessons?.includes(currentLesson?.id)}/>
        
        <LearingCurriculum course={course} currentLesson={currentLesson} onLessonSelect={setCurrentLesson} courseId={course?.course._id}/>
  </>
 )}
       
      </div>

    </MainLayout>
  )
}

export default MyLearning
