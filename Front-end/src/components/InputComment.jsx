import React, { useState } from "react";
import { Avatar } from "flowbite-react";
import axios from "axios";

const InputComment = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [commentDTO, setCommentDTO] = useState({
    comment: "",
  });


  const token = localStorage.getItem("token");

  const handleKeyPress = async (event) => {
    event.preventDefault();
    const updatedCommentDTO = { comment: commentText }; // Lấy giá trị mới của commentText
    setCommentDTO(updatedCommentDTO);
    const response = await axios.post(
      `http://localhost:8080/api/auth/comment/add?postId=${postId}`,
      updatedCommentDTO,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log(response.data);
    console.log(postId);

  };

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };
  return (
    <div className="flex mt-4 gap-3">
      <div>
        <Avatar rounded />
      </div>
      <div className="grow rounded-lg border">
        <form>
          <input
            value={commentText}
            onChange={handleChange}
            className="block w-full px-4 overflow-hidden h-10 rounded-lg"
            placeholder="Leave a comment..."
          />
          <div
            onClick={handleKeyPress}
          >
            <button>send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputComment;
