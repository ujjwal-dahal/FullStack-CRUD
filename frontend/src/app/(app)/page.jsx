"use client";

import { useState } from "react";

export default function HomePage(){

  const [userFormData , setUserFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    faculty: "",
    user_image: null,
    address: "",
  })
  return <>
    Home
  </>
}
