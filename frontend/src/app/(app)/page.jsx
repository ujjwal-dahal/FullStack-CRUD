"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  let [userInfo, setUserInfo] = useState([]);

  const getUserData = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/user/");

      let updatedData = response.data.map((user, index) => {
        return {
          ...user,
          user_image: `http://127.0.0.1:8000${user.user_image}`,
        };
      });

      setUserInfo(updatedData);
      console.log(response.data);
    } catch (error) {
      console.log("Error in Fetching Data", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="main-container grid grid-cols-3 gap-4 p-5">
      {userInfo.map((data) => (
        <div
          className="container cursor-pointer bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          key={data.full_name}
        >
          <img
            alt="image"
            src={data.user_image}
            height={300}
            width={300}
            className="rounded-xl object-cover w-full h-64"
          />
          <p className="text-center mt-2 text-gray-800 font-semibold">
            {data.full_name}
          </p>
          <div className="btn-container flex justify-center gap-4 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
