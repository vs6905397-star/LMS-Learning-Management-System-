import React, { useState } from 'react'
import ProfileCoursesBox from "../components/ProfileCoursesBox"
import { useAuth } from "../context/authContext"


const ProfileTabs = ({enrollment, wishlist, completed, fetchWishlist, loading, error, fetchAllData}) => {

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Mycourses")

  const getCourseForActiveTab = () => {
    if(!user) return [];

    switch (activeTab){
      case "Mycourses" :
        return enrollment || [];
      case "wishlist" :
        return wishlist || [];
      case "completed" :
        return completed || [];
      default :
      return [];
    }
  }

  const currentCourse = getCourseForActiveTab();

  return (
    <section className='rounded-xl shadow-xl m-10 border border-gray-100 justify-center items-center px-5 py-5'>
      <div className='flex justify-around'>
        <h1 onClick={() => setActiveTab("Mycourses")} className={activeTab === "Mycourses" ? " text-l text-blue-700 font-bold hover:text-blue-500 cursor-pointer" : " text-l font-bold hover:text-blue-500 cursor-pointer"}>My Courses</h1>
        <h1 onClick={() => setActiveTab("wishlist")} className={activeTab === "wishlist" ? " text-l text-blue-700 font-bold hover:text-blue-500 cursor-pointer" : " text-l font-bold hover:text-blue-500 cursor-pointer"}>Whishlist</h1>
        <h1 onClick={() => setActiveTab("completed")} className={activeTab === "completed" ? " text-l text-blue-700 font-bold hover:text-blue-500 cursor-pointer" : " text-l font-bold hover:text-blue-500 cursor-pointer"}>Completed</h1>
      </div>

      <hr className='mx-10 my-5 text-gray-300 '/>
      {loading ? (
         <p className='justify-center items-center mx-15'>loading courses...</p>
      ) : error ? (
              <div>
              <p className='text-red-600 mx-15'>{error}</p>
              <button onClick={fetchAllData} className='mx-15 justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
      ) : currentCourse.length === 0 ? (
        <p className='mx-15'>No courses found...</p>
      ) : (    
        currentCourse.map((course) => (
        <ProfileCoursesBox course={activeTab === "Mycourses" ? course.course : course} id={course._id} type={activeTab} progress={course.progress} fetchWishlist={fetchWishlist}/>
      ))

      )}
 
    </section>
  )
}

export default ProfileTabs
