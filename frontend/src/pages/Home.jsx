import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from "../layout/MainLayout"
import HeroSectionn from '../components/HeroSectionn'
import CategoriesBox from '../components/CategoriesBox'
import CoursesBox from '../components/CoursesBox'
import StudentRewiev from '../components/StudentRewiev'
import { ArrowRight } from 'lucide-react'
import {getCourses} from "../api/courseApi"


const review = [
  {id:1},{id:2},{id:3},{id:4}
]

const Home = () => {

  const [reviews, setReviews] = useState(review);
  const [courses, setCourses] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] =  useState("");

      const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCourses();

        setCourses(data.courses);
      } catch (error) {
        setError("Failed to load data. please try again")
        console.log(error);
      } finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      fetchCourses();
    },[]);

  
  return (
    <MainLayout>
      <div className='overflow-x-hidden '>
      <HeroSectionn/>

      <div className='flex justify-between items-center px-4 my-5'>
        <h1 className='text-2xl font-bold m-3 p-2'>Top Categories</h1>
        <span className='text-blue-700 font-semibold flex cursor-pointer'>View all<ArrowRight size={20}/></span>
      </div> 
      <CategoriesBox/>

      <div className='flex justify-between items-center px-4 my-5'>
        <h1 className='text-2xl font-bold m-3 p-2'>Popular Courses</h1>
        <Link to="/courses">
        <span className='text-blue-700 font-semibold flex cursor-pointer'>View all Courses<ArrowRight size={20}/></span>
        </Link>
      </div> 
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5 justify-center  gap-3'>
       {loading ? (
        <p className='text-center justify-center text-gray-500 p-5'>loading courses...</p>
       ) : error ? (
            <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchCourses} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
       ) : courses.length === 0 ? (
        <p className='text-center justify-center text-gray-500 p-5'>
            no courses found...
        </p>
       ) : (
       courses?.slice(0,4).map((item) => (
        <CoursesBox courses={item} key={item._id}/>
       ))
       )}
      </div>      
      
       <StudentRewiev reviews={reviews}/>
      
    </div>
    </MainLayout>
  )
}

export default Home
