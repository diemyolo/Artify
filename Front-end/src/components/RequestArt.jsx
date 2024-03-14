import React, { useState, useEffect } from 'react'
import { Label, Textarea } from 'flowbite-react';
import axios from "axios";

const RequestArt = ({ creatorId }) => {
  const [requirementText, setRequirementText] = useState("");
  const [requirementDTO, setRequirementDTO] = useState({
    creatorId: creatorId,
    requirement: "",
  });

  const token = localStorage.getItem("token");

  const handleKeyPress = async (event) => {
    event.preventDefault();
    setRequirementDTO({
      requirement: requirementText
    });
    const response = await axios.post(`http://localhost:8080/api/auth/audience/PreOrderRequest`, requirementDTO,
      {
        headers: { Authorization: `Bearer ${token}` }
      });
    console.log(response.data);
  }

  const handleChange = (event) => {
    setRequirementText(event.target.value);
  };

  return (
    <div className='w-full'>
      <div className="flex flex-col justify-center w-[50%] mx-auto">
        <div className="mb-2 block">
          <Label htmlFor="requirement" value="Your Request" />
        </div>
        <Textarea value={requirementText} id="requirement" placeholder="Leave a request..." required rows={5} onChange={handleChange}/>
        <div className="mx-auto w-[100px] cursor-pointer font-semibold border-2 sm:flex gap-2 hidden justify-center items-center text-white bg-[#2f6a81] my-4 px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
          <button type="button" onClick={handleKeyPress}>Request</button>
        </div>
      </div>
    </div>
  )
}

export default RequestArt