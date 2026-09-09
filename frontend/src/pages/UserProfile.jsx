import React, { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import ProfileHeader from '../components/ProfileHeader'
import ProfileTabs from "../components/ProfileTabs"
import { getMyEnrollment } from '../api/enrollmentApi'
import {  getWishlist } from "../api/wishlistApi"
import { getCompleteCourse } from '../api/authApi'


function UserProfile() {

  
     const [enrollment, setEnrollment] = useState([]);
     const [wishlist, setWishlist] = useState([]);
     const[completed, setCompleted] = useState([]);
     const[loading, setLoading] = useState(false);
     const[error, setError] = useState("");

  const fetchCompleted = async () => {
    try {
      const res = await getCompleteCourse();

      setCompleted(res.completeCourse);
      
    } catch (error) {
      console.log(error);
    }
  }


  const fetchEnrollment = async() => {
    try {
      const res = await getMyEnrollment();

      setEnrollment(res.enrollment);
    } catch (error) {
      console.log(error)
    }
  }

  
  const fetchWishlist = async () => {
    try {
       const res = await getWishlist();

       setWishlist(res.wishlist)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllData = async() => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        fetchEnrollment(),
        fetchCompleted(),
        fetchWishlist()
      ]);

    } catch (error) {
      setError("Failed to load courses. please try again");
    } finally{
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    fetchAllData();
  },[]);

  return (
    <MainLayout>
      <ProfileHeader />
      <ProfileTabs enrollment={enrollment} wishlist={wishlist} completed={completed} fetchWishlist={fetchWishlist} loading={loading} error={error} fetchAllData={fetchAllData}/>
      
    </MainLayout>
  )
}

export default UserProfile
