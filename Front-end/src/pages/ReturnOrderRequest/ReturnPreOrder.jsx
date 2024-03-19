import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { Table } from "flowbite-react";

const ReturnPreOrder = () => {
  const [waitingList, setWaitingList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8080/api/auth/creator/viewAllPreOrder",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWaitingList(waitingList);
    };
    fetchData();

  },[]);
  return (
<div className="w-full h-full bg-gray-100">
      <NavBar />
      <div className="h-full p-28 mt-5">
        <h1 className="text-center text-3xl font-semibold mb-10 text-[#2f6a81]">
          Request History
        </h1>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Creator</Table.HeadCell>
              <Table.HeadCell>Pre-order Date</Table.HeadCell>
              <Table.HeadCell>Requirement</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Artwork</Table.HeadCell>
              <Table.HeadCell>Creator Note</Table.HeadCell>
              <Table.HeadCell>Audience Feedback</Table.HeadCell>
              <Table.HeadCell>Audience Rating</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Cancel</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {waitingList.length > 0 && waitingList.map((item, index) =>
                <Table.Row key={item.preOrderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{item.creatorName}</Table.Cell>
                  <Table.Cell>{item.preOrderDate}</Table.Cell>
                  <Table.Cell>{item.requirement}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>{item.status}</Table.Cell>
                  <Table.Cell><img src={item.artworkImagePath} alt="art" /></Table.Cell>
                  <Table.Cell>{item.creatorNote}</Table.Cell>
                  <Table.Cell>{item.audienceFeedback}</Table.Cell>
                  <Table.Cell>{item.audienceRating}</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Cancel
                    </a>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
};

export default ReturnPreOrder;
