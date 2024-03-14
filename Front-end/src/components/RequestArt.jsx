import React, { useState, useEffect } from 'react'
import { Label, Textarea } from 'flowbite-react';
import axios from "axios";

const RequestArt = ({ creatorId }) => {
  const [req, setReq] = useState({
    creatorId: creatorId,
    requirement: "abcdefg"
  });

  const token = localStorage.getItem("token");
  
  const fetchFData = async () => {
    const response = await axios.post(`http://localhost:8080/api/auth/audience/PreOrderRequest`, req, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response);
  }

  return (
    <div className='w-full'>
      <div className="flex flex-col justify-center w-[50%] mx-auto">
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Your Request" />
        </div>
        <Textarea id="comment" placeholder="Leave a request..." required rows={5} />
        <div className="mx-auto w-[100px] cursor-pointer font-semibold border-2 sm:flex gap-2 hidden justify-center items-center text-white bg-[#2f6a81] my-4 px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
          <button type="button" onClick={fetchFData}>Request</button>
        </div>
      </div>
    </div>
  )
}

export default RequestArt