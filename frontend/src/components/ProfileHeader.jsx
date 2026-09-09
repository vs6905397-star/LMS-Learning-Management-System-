import React, { useEffect, useState } from "react";
import {useNavigate, Link } from 'react-router-dom'
import {  Heart} from "lucide-react";
import { BiEdit, BiLogOut } from "react-icons/bi";
import { CgCalendar } from "react-icons/cg";
import { PiBookOpenBold } from "react-icons/pi";
import { MdDoneAll } from "react-icons/md";
import { Logout, updateProfile } from "../api/authApi"
import { useAuth } from "../context/authContext"
import toast from "react-hot-toast"

const ProfileHeader = () => {

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, settName] = useState("");
  const [bio, setBio] = useState("");
  const [dp, setDp] = useState("");
  const [editForm, setEditForm] = useState(false);
  const[loading,setLoading] =useState(false)

  const handleLogout = async () => {
    try {
      await Logout();
      toast.success("logout sucessfully")
      navigate("/login");

    } catch (error) {
      console.log(error.response?.data || error.message)
        toast.error("server error try again")
    }
  };

  useEffect(()=>{
    if(user){
      settName(user.name || "");
      setBio(user.bio || "");
    }
  },[user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData;

      formData.append("name", name);
      formData.append("bio", bio);

      if(dp){
        formData.append("dp", dp);
      }

      const res = await updateProfile(formData);
      setUser(res.user)

      toast.success(res.message);
      handleToggleModal();
    } catch (error) {
      console.log(error);
      toast.error(error.res?.message)
    }finally{
      setLoading(false)
    }
  };

  const handleToggleModal = () => {
    setEditForm(!editForm);
  };
  return (
    <div>
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 border border-gray-100 mx-10 my-8 px-10 py-7 rounded-xl shadow-xl space-y-5 items-center justify-center">
        <div className="max-h-60 max-w-60 rounded-full object-cover overflow-hidden justify-center items-center">
          <img src={user?.dp } alt="Profile Picture" className="" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <h1 className="text-xl font-semibold text-gray-500">
           {user?.email}
          </h1>
          <p className="text-sm font-medium">
            {user?.bio}
          </p>
          <span className="flex gap-3 text-sm font-medium items-center">
            {" "}
            <CgCalendar />
            {new Date(user?.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col m-10 gap-5 max-w-fit justify-center items-center">
          <button
            onClick={() => setEditForm(true)}
            className="bg-blue-600 text-white flex gap-2 rounded-xl shadow-xl px-3 py-1 items-center cursor-pointer hover:scale-105 hover:bg-blue-400"
          >
            <BiEdit />
            Edit Profile
          </button>
          <button onClick={handleLogout} className="bg-blue-600 text-white flex gap-2 rounded-xl shadow-xl px-3 py-1 items-center cursor-pointer hover:scale-105 hover:bg-blue-400">
            <BiLogOut />
            Logout
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-10 mx-15 justify-center  gap-6 cursor-pointer ">
        <div className="flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-5 hover:scale-105 hover:shadow-xl transition-all duration-150 justify-center">
          <PiBookOpenBold
            size={50}
            className="bg-blue-300 text-blue-600 rounded-full p-2"
          />
          <span>
            <h1 className="font-bold text-lg">{user?.enrolled.length}</h1>
            <p className="text-sm font-medium leading-tight text-gray-700">
              Enrolled Courses
            </p>
          </span>
        </div>

        <div className="flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-5 hover:scale-105 hover:shadow-xl transition-all duration-150 justify-center">
          <MdDoneAll
            size={50}
            className="bg-green-300 text-green-600 rounded-full p-2"
          />
          <span>
            <h1 className="font-bold text-lg">{user?.completedCourses.length}</h1>
            <p className="text-sm font-medium leading-tight text-gray-700">
              Completed Courses
            </p>
          </span>
        </div>

        <div className="flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-5 hover:scale-105 hover:shadow-xl transition-all duration-150 justify-center">
          <Heart
            size={50}
            className="bg-orange-300 text-orange-600 rounded-full p-2"
          />
          <span>
            <h1 className="font-bold text-lg">{user?.wishlist.length}</h1>
            <p className="text-sm font-medium leading-tight text-gray-700">
              Wishlist
            </p>
          </span>
        </div>
      </section>

      {editForm && (
        <section className="fixed inset-0 bg-slate-900/40  backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-bold text-slate-900">
                Update Profile
              </h1>
              <button
                onClick={() => setEditForm(!editForm)}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ✕
              </button>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleToggleModal();
              }}
            ></form>
            <div>
              <label className="mt-4 block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => settName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
              />
            </div>
             <div>
              <label className="mt-4 block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Bio
              </label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
              />
            </div>
             <div>
              <label className="mt-4 block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setDp(e.target.files[0])}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 mt-4">
                <button type="button" onClick={handleToggleModal} className="px-4 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-100 transition">Cancel</button>
                <button disabled={loading} onClick={handleUpdate}  type="submit" className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm">{loading ? "Saving..." : "Save Changes"}</button>
              </div>
            
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfileHeader;
