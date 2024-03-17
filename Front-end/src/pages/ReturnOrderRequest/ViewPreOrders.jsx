import React, { useEffect } from "react";
import axios from "axios";

const ViewPreOrders = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/auth/viewProcessingPreOrder",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
	  console.log(response);
    };
	fetchData();
  },[]);
  
  return <div>ViewPreOrders</div>;
};

export default ViewPreOrders;
