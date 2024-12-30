"use client";

import axios from "axios";
import { use, useEffect } from "react";

const UserDescription = ({ params }) => {
  const { userId } = use(params);
  // console.log(userId);

  const getUserData = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/api/user/${userId}`
      );
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);
};

export default UserDescription;
