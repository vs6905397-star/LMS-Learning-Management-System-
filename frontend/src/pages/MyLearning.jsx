import React, { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import CoursesBox from '../components/CoursesBox'
import { MdDone } from 'react-icons/md'
import { getMyEnrollment } from '../api/enrollmentApi'
import { getCompleteCourse } from '../api/authApi'

const MyLearning = () => {

  const [course, setCourse] = useState([]);
  const [completed, setCompleted] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");

  const fetchEnrollment = async () => {
    try {
      const res = await getMyEnrollment();

      setCourse(res.enrollment);
    } catch (error) {
      console.log(error);
    } 
  }

  const fetchCompleted = async () => {
      try {
        const res = await getCompleteCourse();
  
        setCompleted(res.completeCourse);
        
      } catch (error) {
        console.log(error);
      } 
    }

    const fetchAllData = async() => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        fetchEnrollment(),
        fetchCompleted(),
      ]);

    } catch (error) {
      setError("Failed to load courses. please try again");
    } finally{
      setLoading(false);
    }
  }
  

  useEffect(()=>{
    fetchAllData();
  },[])

  return (
    <div className='bg-gray-100'>
    <MainLayout>
      
     <div className='m-6  '>
      <h1 className='text-2xl font-bold p-2'>My Learning</h1>
      <p className=' font-medium  text-gray-600 p-2'>Continue where you left off and keep learning</p>
     </div>

     <div className='m-5 bg-white p-6 rounded-xl shadow-xl'>
      <h1 className='text-xl font-bold'>Continue Learning</h1>
       <span className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 m-5 justify-center  gap-8  '>

        {loading ? (
          <p className='text-center justify-center text-gray-500 p-5'>loading courses...</p>
        ) : error ? (
          <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchEnrollment} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
        ) : course.length === 0 ? (
          <p className='text-center justify-center text-gray-500 p-5'>
            You haven't Enrolled in any Course
        </p>
        ) : ( 
          
             course?.map((item) => (
              <CoursesBox courses={item.course} id={item._id} type={"learning"} enrolled={true}/>
             ))
           
             )}
       </span>
     </div>

     <div className='mx-5 my-7 bg-white p-6 rounded-xl shadow-xl'>
      <h1 className='text-xl font-bold flex items-center gap-2'><MdDone size={30} className='bg-green-300 p-0.5 text-green-800 rounded-full'/> Completed Courses</h1>
       <span className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 justify-center  gap-8  '>
        {loading ? (
          <p className='text-center justify-center text-gray-500 p-5'>loading courses...</p>
        ) : error ? (
          <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchCompleted} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
        ) : completed.length === 0 ? (
          <p className='text-center justify-center text-gray-500 p-5'>
            You not have any Completed Course
        </p>
        ) : (

             completed?.map((item) => (
              <CoursesBox courses={item} id={item._id} type={"completed"} />
             ))
            )}
       </span>
     </div>
     
       
    </MainLayout>
    </div>
  )
}

export default MyLearning
