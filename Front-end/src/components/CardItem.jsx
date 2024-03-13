import React, { useState, useEffect } from 'react'
import { Avatar, Card, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import CommentBar from './CommentBar';
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Carousel } from 'flowbite-react';
import { Spin } from "antd";
import { Watermark } from 'antd';
import { saveAs } from 'file-saver';
import axios from "axios";

const CardItem = () => {
    const [p, setPost] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const postId = params.get("postId");

    const handleImageClick = (imagePath) => {
        setSelectedImage(imagePath);
        setOpenModal(true);
    };

    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    useEffect(() => {
        const fetchFData = () => {
            fetch(`http://localhost:8080/api/auth/getPostById?postId=${postId}`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw Error(response.statusText);
                })
                .then((result) => {
                    console.log(result.payload);
                    setPost(result.payload);
                })
                .catch((error) => console.error(error));
        }
        fetchFData();
    }, []);
  
  
  
    if (p != undefined) {
        console.log(p);
    }
  
  
    const downloadArt = async (image) => {
        const response = await axios.get(`http://localhost:8080/api/auth/downloadArt?artId=${image.artId}`);
        saveAs(`${response.data.payload}`, 'image.jpg');
    }
  
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                {p != null || p != undefined ?
                    <Card key={p.postId} className="flex justify-center bg-white mb-5 w-full" >
                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col w-[65%] '>
                                <div className="flex justify-between gap-3">
                                    <Link to="/artistProfile" >
                                        <Avatar rounded>
                                            <div className="space-y-1 dark:text-white">
                                                <div className='font-medium'>{p.creatorName}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{p.artList.map(item => item.createdDate)}</div>
                                            </div>
                                        </Avatar>
                                    </Link>
                                    <div className='cursor-pointer sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 transition-all duration-300 rounded-full my-1'>
                                        <AiOutlineUserAdd size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                        <button type='submit'>Follow</button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm my-2" style={{ maxHeight: '3.6em', width: '800px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {p.description}
                                    </p>
                                    <div className="w-full h-screen max-h-[50vh]">
                                        <Carousel pauseOnHover className="w-full mx-auto" infiniteLoop={true}>
                                            {p.artList.map((item, index) => (
                                                <div key={index} onClick={() => handleImageClick(item)}>
                                                    <img
                                                        src={item.imagePath}
                                                        className="rounded-md w-[800px] mx-auto"
                                                        alt={`Post Image - ${p.description}`}
                                                    />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-between">
                                    <div className="flex justify-between gap-16">
                                        <button className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                            20
                                        </button>
                                        <button className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                            </svg>
                                            20
                                        </button>
                                    </div>

                                    <button className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                        20
                                    </button>
                                </div>
                            </div>

                            <div className='flex flex-col items-center justify-start w-[35%] gap-[70px] p-10  bg-slate-200'>
                                <CommentBar />
                            </div>
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
                                                        <div className='font-medium'>{p.creatorName}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{p.artList.map(item => item.createdDate)}</div>
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
                    </Card>
                    : <Spin spinning={!isLoading} fullscreen />}
            </div>

        </>
    )
};

export default CardItem;