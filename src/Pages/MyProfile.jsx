import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Suman roka ",
    image: assets.profile_pic,
    phone: "09876554",
    email: "roka7362@gmail.com",
    address: " 77/81 church street Lidcombe",
    DOB: "2001-01-04",
    gender: "Male",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg flex flex-col  gap-2 text-sm">
      <img className=" w-36 rounded" src={userData.image} alt="" />
      {isEdit ? (
        <input className="bg-gray-100 text-3xl font-medium max-w-60 mt-4" 
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => prev({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3 font-semibold">BASIC INFORMATION </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500 ">
          <p className="font-semibold">Email ID: </p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52"
              type="number"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => prev({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.phone}</p>
          )}
          <p className="font-semibold">Address:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52"
              type="text"
              value={userData.address}
              onClick={(e) =>
                setUserData((prev) =>
                  prev({ ...prev, address: e.target.value })
                )
              }
            />
          ) : (
            <p className="text-gray-500">{userData.address}</p>
          )}
          <p className="font-semibold">DOB:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52"
              type="date"
              value={userData.DOB}
              onChange={(e) =>
                setUserData((prev) => prev({ ...prev, DOB: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.DOB}</p>
          )}
          <p className="font-semibold">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => prev({ ...prev, gender: e.target.value }))
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
      <div>
        {
          isEdit
          ?<button className="bg-blue-500 rounded-full px-8 py-2 cursor-pointer text-white mb-7 mt-4" onClick={()=>setIsEdit(false)}>Save Information</button>
          :<button className="bg-blue-500 rounded-full px-8 py-2 cursor-pointer text-white mb-7 mt-4" onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
