import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
const AddPost = () => {
  const token = localStorage.getItem("token");
  const [postDTO, setPostDTO] = useState({
    description: "string",
    creatorName: "string",
    emailAddress: "string",
    creatorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    artList: [
      {
        type: "free123",
        price: 12,
        artName: "abc",
        imagePath: "abc",
      },
    ],
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
  };
  console.log(files);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
//   myHeaders.append("Content-Type", "application/json");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("post", new Blob([JSON.stringify(postDTO)], {type: "application/json"}));
    const response = await axios.post(
      "http://localhost:8080/api/auth/addArtwork",
      formData,
      {
        headers: myHeaders
      }
    );
    console.log(response.data);
  };

  return (
    <div>
      <h2>Add Artwork</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter post details..."
            onChange={(e) =>
              setPostDTO({ ...postDTO, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
          <p>Choose file</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddPost;
