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
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit 
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? "": assets.upload_icon}  alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        :<img className="w-36 rounded" src={userData.image} alt="profile" />
      }
      
      {isEdit ? (
        <input
          className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Basic Info */}
      <div>
        <p className="text-neutral-500 underline mt-3 font-semibold">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
          <p className="font-semibold">Email ID: </p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Number:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="number"
              value={userData.Number}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, Number: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.Number}</p>
          )}

          <p className="font-semibold">Address:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.address}</p>
          )}

          <p className="font-semibold">DOB:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}

          <p className="font-semibold">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div>
        {isEdit ? (
          <button
            className="bg-blue-500 rounded-full px-8 py-2 cursor-pointer text-white mb-7 mt-4"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-blue-500 rounded-full px-8 py-2 cursor-pointer text-white mb-7 mt-4"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;