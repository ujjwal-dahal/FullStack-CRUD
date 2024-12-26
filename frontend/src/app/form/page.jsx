"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function FormPage() {
  const [userFormData, setUserFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    faculty: "",
    user_image: null,
    address: "",
  });

  const [optionsOfForm, setOptionsOfForm] = useState({});

  const formOptions = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/api/faculty-choices/"
      );
      setOptionsOfForm(response.data); // Assumes response is a dictionary
    } catch (error) {
      console.error(
        "Error in Fetching Option Data",
        error.response || error.message
      );
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    setUserFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let formData = new FormData();

      // Append form data
      //Since our userFormData is Object so Eslai Array ma Lageko
      Object.entries(userFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let response = await axios.post(
        "http://localhost:8000/api/user/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data Uploaded Successfully", response.data);

      // Reset form after successful submission
      setUserFormData({
        full_name: "",
        email: "",
        phone_number: "",
        faculty: "",
        user_image: null,
        address: "",
      });
    } catch (error) {
      console.error("Failed to Upload Data", error.response || error.message);
    }
  };

  useEffect(() => {
    formOptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <form
        className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full text-gray-100"
        onSubmit={handleSubmit}
        method="POST"
      >
        <h2 className="text-4xl text-center font-bold mb-6 text-gray-100">
          User Registration Form
        </h2>

        <div className="mb-4">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={userFormData.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="mt-1 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userFormData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-1 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="phone_number"
            name="phone_number"
            value={userFormData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="mt-1 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="faculty"
            className="block text-sm font-medium text-gray-300"
          >
            Faculty
          </label>
          <select
            id="faculty"
            name="faculty"
            value={userFormData.faculty}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Faculty</option>
            {Object.entries(optionsOfForm).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="user_image"
            className="block text-sm font-medium text-gray-300"
          >
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="user_image"
            name="user_image"
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-300"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={userFormData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="mt-1 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-gray-100 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
