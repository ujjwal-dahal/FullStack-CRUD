"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/");
      const updatedData = response.data.map((user) => ({
        ...user,
        user_image: `http://127.0.0.1:8000${user.user_image}`,
      }));
      setUserInfo(updatedData);
    } catch (error) {
      console.log("Error in Fetching Data", error.message);
    }
  };

  const openLink = (route) => {
    router.replace(route);
  };

  const deleteUserData = async (deleteId) => {
    try {
      let response = await axios.delete(
        `http://localhost:8000/api/user/${deleteId}/`
      );
      console.log(`User Data of Id : ${deleteId} is Successfully Deleted`);
    } catch (error) {
      console.log("Unable to Delete Data of Id :", deleteId);
    }
  };

  useEffect(() => {
    getUserData();
  }, [deleteUserData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
          User Directory
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userInfo.map((data) => (
            <div
              className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-4 cursor-pointer"
              key={data.full_name}
            >
              <img
                alt={data.full_name}
                src={data.user_image}
                onClick={() => openLink(`/${data.id}`)}
                className="rounded-lg object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
              />
              <p className="text-center mt-4 text-xl font-semibold text-gray-100">
                {data.full_name}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={() => openLink(`/edit-form/${data.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                  onClick={() => deleteUserData(data.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
