import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import {assets}from "../assets/assets"
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token,backendUrl,loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  
  const [image,setImage] =useState(false)

  const updateUserProfileData = async () =>{
  
    try {
      const formData = new FormData()
      formData.append("name",userData.name)
      formData.append("Number",userData.Number)
      formData.append("address",userData.address)
      formData.append("gender",userData.gender)
      formData.append("dob",userData.dob)


      image && formData.append("image",image)
      //api call to update 
      const {data} = await axios.post(backendUrl + "/api/user/update-profile",formData,{headers:{token}})

      if(data.success){
        toast.success(data.message)
        loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (!userData) return <p>Loading profile...</p>;

return (
  <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-6 mt-12">

   
    <div className="flex flex-col items-center gap-3">
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer relative group">
          <img
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md group-hover:opacity-80 transition"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt=""
          />
          <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md">
            <img src={assets.upload_icon} className="w-4 h-4" />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
          src={userData.image}
          alt="profile"
        />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="text-center text-xl font-semibold bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="text-2xl font-semibold text-gray-800">
          {userData.name}
        </p>
      )}
    </div>

    <hr className="border-gray-200" />

    {/* Info Section */}
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

        {/* Email */}
        <div>
          <label className="text-gray-500">Email</label>
          <p className="text-blue-600 font-medium">{userData.email}</p>
        </div>

        {/* Number */}
        <div>
          <label className="text-gray-500">Phone</label>
          {isEdit ? (
            <input
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              value={userData.Number}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, Number: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium">{userData.Number}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="text-gray-500">Address</label>
          {isEdit ? (
            <input
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium">{userData.address}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="text-gray-500">Date of Birth</label>
          {isEdit ? (
            <input
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium">{userData.dob}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="text-gray-500">Gender</label>
          {isEdit ? (
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="font-medium">{userData.gender}</p>
          )}
        </div>

      </div>
    </div>

    {/* Button */}
    <div className="flex justify-center mt-4">
      {isEdit ? (
        <button
          onClick={updateUserProfileData}
          className="px-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:scale-105 transition"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          className="px-8 py-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-800 transition"
        >
          Edit Profile
        </button>
      )}
    </div>
  </div>
);
}
export default MyProfile;