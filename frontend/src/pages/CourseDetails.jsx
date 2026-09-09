import { h1 } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from "../layout/MainLayout"
import CourseInfo from '../components/CourseInfo';
import Tabs from "../components/Tabs"
import StudentReview from "../components/StudentRewiev"
import { getCourseById } from "../api/courseApi"
import { deleteReview, getReviews } from  "../api/reviewApi"
import { TruckElectricIcon } from 'lucide-react';

function CourseDetails() {

  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");

  const { id } = useParams();
  
  const fetchCourse = async () =>{
    try {
      const data = await getCourseById(id);

      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchReview = async () => {
    try {
      const data = await getReviews(id);

      setReviews(data.review)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllData = () =>{
    try {
      setLoading(true);
      setError("");

      fetchCourse();
      fetchReview();
    } catch (error) {
      setError("Failed to load data. please try again")
    }finally{
      setLoading(false)
    }
    
  }

  useEffect(() => {
    fetchAllData();
  },[])
  
  return (
    <MainLayout>
      <div className='flex flex-col gap-6 px-4 md:px-6 py-6 max-w-7xl mx-auto w-full'>

{loading ? (
  <p className='text-center justify-center text-gray-500 p-5'>loading courses...</p>
) : error ? (
  <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchEnrollment} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
) : (

      <>
        <CourseInfo course={course} loading={loading} error={error} />

        <Tabs course={course} reviews={reviews} fetchReview={fetchReview}/>
        </>
       )}
      </div>
    </MainLayout>
  )
}

export default CourseDetails
