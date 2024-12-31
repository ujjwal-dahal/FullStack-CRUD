"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";

const UserDescription = ({ params }) => {
  const { userId } = use(params);

  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/${userId}`
      );

      const updatedData = {
        ...response.data,
        user_image: `http://127.0.0.1:8000${response.data.user_image}`,
      };

      setUserData([updatedData]); // Ensure it's wrapped in an array for mapping
    } catch (error) {
      console.error("Error Fetching Data:", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
          User Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {userData.map((data, index) => (
            <div
              className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              key={index}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={data.user_image}
                  alt={data.full_name}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">
                {data.full_name}
              </h2>
              <p className="text-gray-400 mb-1">
                <span className="font-medium text-gray-300">Email:</span>{" "}
                {data.email}
              </p>
              <p className="text-gray-400 mb-1">
                <span className="font-medium text-gray-300">Phone:</span>{" "}
                {data.phone_number}
              </p>
              <p className="text-gray-400 mb-1">
                <span className="font-medium text-gray-300">Faculty:</span>{" "}
                {data.faculty}
              </p>
              <p className="text-gray-400">
                <span className="font-medium text-gray-300">Address:</span>{" "}
                {data.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
