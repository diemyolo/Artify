// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, FieldArray } from "formik";
// import * as Yup from "yup";
// // import "./ArtUp.css";
// import { Avatar } from "antd";
// import { IoIosPerson } from "react-icons/io";
// import axios from "axios";
// import NavBar from "../../components/NavBar";
// import {
//   UploadOutlined,
//   PlusOutlined,
//   LoadingOutlined,
// } from "@ant-design/icons";
// import { Button, Upload } from "antd";
// import { message, Steps, theme } from "antd";
// import { Watermark } from "antd";
// import { Select } from "antd";
// const AddArts = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const steps = [
//     {
//       title: "First",
//       content: "First-content",
//     },
//     {
//       title: "Second",
//       content: "Second-content",
//     },
//     {
//       title: "Last",
//       content: "Last-content",
//     },
//   ];
//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };
//   const items = steps.map((item) => ({ key: item.title, title: item.title }));
//   const handleBeforeUpload = (file) => {
//     setSelectedFiles([file]);
//     return true;
//   };
//   const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => callback(reader.result));
//     reader.readAsDataURL(img);
//   };
//   const handleFileChange = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       getBase64(info.file.originFileObj, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };
//   console.log(imageUrl);
//   const handleRemoveArtwork = (index) => {
//     setSelectedFiles((prevFiles) => {
//       const newFiles = [...prevFiles];
//       newFiles.splice(index, 1);
//       return newFiles;
//     });
//   };

//   const validationSchema = Yup.object().shape({
//     description: Yup.string().required("Description is required"),
//     artList: Yup.array().of(
//       Yup.object().shape({
//         artName: Yup.string().required("Art name is required"),
//         imagePath: Yup.string().required("Image path is required"),
//         price: Yup.number()
//           .positive("Price must be positive")
//           .required("Price is required"),
//         type: Yup.string().required("Type is required"),
//       })
//     ),
//     interactions: Yup.array().of(
//       Yup.object().shape({
//         name: Yup.string().required("Interaction name is required"),
//         comments: Yup.array().of(
//           Yup.object().shape({
//             comment: Yup.string().required("Comment is required"),
//             userName: Yup.string().required("User name is required"),
//           })
//         ),
//         isLiked: Yup.boolean().required("Is liked is required"),
//       })
//     ),
//   });
//   const token = localStorage.getItem("token");
//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${token}`);
//   console.log(token);
//   const handleSubmit = async (values) => {
//     const formData = new FormData();

//     const fileArray = Array.from(selectedFiles);
//     const updatedValue = {
//       ...values,
//       artList: values.artList.map((art) => ({ ...art, imageUrl: null })),
//     };
//     values.artList.forEach((art) => {
//       if (art.imageFile) {
//         fileArray.push(art.imageFile);
//       }
//     });
//     fileArray.forEach((file) => {
//       formData.append("image", file);
//     });

//     formData.append(
//       "post",
//       new Blob([JSON.stringify(updatedValue)], { type: "application/json" })
//     );
//     console.log(updatedValue);
//     console.log(selectedFiles);
//     // const response = await axios.post(
//     //   "http://localhost:8080/api/auth/addPost",
//     //   formData,
//     //   {
//     //     headers: myHeaders,
//     //   }
//     // );
//     // console.log(response.data);
//   };

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );
//   return (
//     <div>
//       <NavBar />
//       <div className="bg-gray-100 mx-auto max-w-screen-xl p-4">
//         <div className="bg-gray-100 mt-40 min-h-screen">
//           <h1>Add Post</h1>
//           <Steps
//             current={current}
//             items={items}
//             className="mx-auto max-w-4xl py-24 sm:py-8"
//           />
//           <div
//             className="flex items-center justify-center"
//             style={{ marginBottom: "-20px" }}
//           >
//             <Avatar size="large" icon={<IoIosPerson />} />
//           </div>
//           <div className="flex bg-slate-200 rounded-md flex-col mx-auto max-w-4xl py-24 sm:py-8 justify-center items-center">
//             <Formik
//               initialValues={{
//                 description: "",
//                 artList: [
//                   {
//                     artName: "",
//                     imagePath: "",
//                     price: 0,
//                     type: "Free",
//                     imageUrl: "",
//                     imageFile: null,
//                   },
//                 ],
//               }}
//               // validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ values, setFieldValue }) => (
//                 <Form>
//                   {current == 0 ? (
//                     <div>
//                       <Field
//                         type="text"
//                         name="description"
//                         className="bg-slate-200 w-[500px]"
//                         autocomplete="off"
//                         placeholder="Description..."
//                       />
//                     </div>
//                   ) : current == 1 ? (
//                     <FieldArray name="artList">
//                       {({ push, remove }) => (
//                         <div>
//                           <h3>Art List</h3>
//                           {values.artList.map((artwork, index) => (
//                             <div key={index}>
//                               <div>
//                                 <label htmlFor={`artList.${index}.artName`}>
//                                   Art Name
//                                 </label>
//                                 <Field
//                                   type="text"
//                                   name={`artList.${index}.artName`}
//                                 />
//                               </div>
//                               <div>
//                                 <Upload
//                                   action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
//                                   name="avatar"
//                                   listType="picture-card"
//                                   className="avatar-uploader"
//                                   showUploadList={false}
//                                   beforeUpload={(file) => {
//                                     setFieldValue(
//                                       `artList.${index}.imageFile`,
//                                       file
//                                     );
//                                     return true; 
//                                   }}
//                                   onChange={(info) => {
//                                     if (info.file.status === "uploading") {
//                                       setLoading(true);
//                                       return;
//                                     }
//                                     if (info.file.status === "done") {
//                                       getBase64(
//                                         info.file.originFileObj,
//                                         (url) => {
//                                           setLoading(false);
//                                           setFieldValue(
//                                             `artList.${index}.imageUrl`,
//                                             url
//                                           );
//                                         }
//                                       );
//                                     }
//                                   }}
//                                 >
//                                   {values.artList[index].imageUrl ? (
//                                     <img
//                                       src={values.artList[index].imageUrl} // Sử dụng imageUrl tương ứng với art hiện tại
//                                       alt="avatar"
//                                       style={{ width: "100%" }}
//                                     />
//                                   ) : (
//                                     uploadButton
//                                   )}
//                                 </Upload>
//                               </div>

//                               <div>
//                                 <label htmlFor={`artList.${index}.type`}>
//                                   Type
//                                 </label>
//                                 <Select
//                                   defaultValue="Free"
//                                   style={{ width: 120 }}
//                                   name={`artList.${index}.type`}
//                                   options={[
//                                     { value: "Free", label: "Free" },
//                                     { value: "Premium", label: "Premium" },
//                                   ]}
//                                   value={values.artList[index].type}
//                                   onChange={(value) =>
//                                     setFieldValue(
//                                       `artList.${index}.type`,
//                                       value
//                                     )
//                                   }
//                                 />
//                                 {/* <Field
//                                   type="text"
//                                   name={`artList.${index}.type`}
//                                 /> */}
//                               </div>
//                               <div>
//                                 <label htmlFor={`artList.${index}.price`}>
//                                   Price
//                                 </label>
//                                 <Field
//                                   type="number"
//                                   name={`artList.${index}.price`}
//                                 />
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   remove(index);
//                                   handleRemoveArtwork(index);
//                                 }}
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           ))}
//                           <button
//                             type="button"
//                             onClick={() =>
//                               push({
//                                 artName: "",
//                                 imagePath: "",
//                                 price: 0,
//                                 type: "",
//                               })
//                             }
//                           >
//                             Add Artwork
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>
//                   ) : (
//                     <div>Hello</div>
//                   )}
//                   <button type="submit">Submit</button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//           {current < steps.length - 1 && (
//             <Button onClick={() => next()}>Next</Button>
//           )}
//           {current === steps.length - 1 && (
//             <Button
//               type="primary"
//               onClick={() => message.success("Processing complete!")}
//             >
//               Done
//             </Button>
//           )}
//           {current > 0 && (
//             <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
//               Previous
//             </Button>
//           )}
//         </div>
//       </div>
//       <Watermark content="Ant Design">
//         <img
//           className="relative"
//           src="http://res.cloudinary.com/diak7ssve/image/upload/v1710039220/ipebqnfuldhrp1bmnlyj.png"
//         />
//       </Watermark>
//     </div>
//   );
// };

// export default AddArts;
