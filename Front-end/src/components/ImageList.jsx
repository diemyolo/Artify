import React, { useState, useEffect } from 'react'
import { Watermark } from 'antd';
import { Link } from "react-router-dom";
import { Avatar, Modal } from "flowbite-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineFileDownload } from "react-icons/md";

const ImageList = () => {
    const [post, setPost] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [indexImage, setIndexImage] = useState(0);

    let combineArt = []
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    let autoData = []
    useEffect(() => {
        const fetchFData = () => {
            fetch("http://localhost:8080/api/auth/audience/viewAllPosts", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw Error(response.statusText);
                })
                .then((result) => {
                    let DataList = []
                    console.log(result.payload);
                    setPost(result.payload);
                    if (result && result.payload && result.payload.length > 0) {
                        setIsLoading(true);
                    }
                })
                .catch((error) => console.error(error));
        }
        fetchFData();
    }, []);

    useEffect(() => {
        console.log("`POST DATA`", post)
        combineArt = post?.flatMap(p => p.artList)
        setGallery(combineArt)
    }, [post])

    console.log("galarry", autoData)
    const handleImageClick = (imagePath, index) => {
        setSelectedImage(imagePath);
        setOpenModal(true);
        setIndexImage(index)
    };


    return (
        <div>
            <div className="grid grid-cols-3 gap-16 sm:grid-cols-3 px-8 md:px-16 lg:px-28">
                {post?.length > 0 ?
                    gallery.map((p, postIndex) => (
                        <div key={postIndex} className="">
                            {
                                <div key={postIndex} onClick={() => handleImageClick(p, postIndex)}>
                                    <img
                                        src={p.imagePath}
                                        className="rounded-md w-[500px] h-[300px] mx-auto cursor-pointer"
                                        alt={`Post Image - ${p.description}`}
                                    />
                                </div>
                            }
                        </div>
                    ))
                    : null}
            </div>

            {selectedImage && (
                <Modal dismissible className='mt-10 px-72' size={1} show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Body className='flex justify-center items-center'>
                        <div>
                            <Watermark content="Artify" font={{ color: '#ccc' }}>
                                <div style={{ height: 500 }}>
                                    <div className="">
                                        <img
                                            src={selectedImage.imagePath}
                                            alt="Selected Image"
                                            className="w-[700px] h-[480px] mx-auto relative"
                                        />
                                        {selectedImage.type !== "Free" && (
                                            <div className='flex items-center justify-center absolute top-0 left-0 w-1/5 rounded-br-md' style={{ backgroundColor: '#f2f2f2' }}>
                                                <img
                                                    src="https://cdn-icons-png.freepik.com/256/1319/1319983.png"
                                                    className="w-[50px] mr-2"
                                                    alt="Left Top Image"
                                                />
                                                <span className="text-[#F4980A] font-bold"> Premium </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Watermark>

                            <div className="flex justify-between gap-3 w-[700px]">
                                <Link href="">
                                    <Avatar rounded>
                                        <div className="space-y-1 dark:text-white">
                                            <div className='font-medium'>{post[0].creatorName}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{
                                                gallery[indexImage]?.createdDate
                                            }</div>
                                        </div>
                                    </Avatar>
                                </Link>
                                <div className='flex gap-4'>
                                    <div className='cursor-pointer sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 transition-all duration-300 rounded-full my-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        <button type='submit'>Like</button>
                                    </div>
                                    <div className='cursor-pointer sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 transition-all duration-300 rounded-full my-1'>
                                        <AiOutlineUserAdd size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                        <button type='submit'>Follow</button>
                                    </div>

                                    {(selectedImage.type !== "Free") ? (
                                        <div className='cursor-pointer sm:flex gap-2 hidden items-center text-white bg-[#F4980A] px-4 transition-all duration-300 rounded-full my-1'>
                                            <MdOutlineFileDownload size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                            <button type="submit">Download</button>
                                        </div>
                                    ) : (
                                        <div className='cursor-pointer sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 transition-all duration-300 rounded-full my-1'>
                                            <MdOutlineFileDownload size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                            <button type="submit">Download</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    )
}

export default ImageList