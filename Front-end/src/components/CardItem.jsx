import React, { useState, useEffect } from 'react'
import { Avatar, Card, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import CommentBar from './CommentBar';
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Carousel } from 'flowbite-react';

const CardItem = () => {
    const [post, setPost] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


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
            fetch("http://localhost:8080/api/auth/audience/viewAll", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw Error(response.statusText);
                })
                .then((result) => {
                    console.log(result.payload);
                    setPost(result.payload);
                    if (result && result.payload && result.payload.length > 0) {
                    }
                })
                .catch((error) => console.error(error));
        }
        fetchFData();
    }, []);
    console.log(post);

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                {post.length > 0 ?
                    post.map((p) =>
                        <Card key={p.postId} className="flex justify-center bg-white mb-5 w-full" >
                            <div className='flex flex-row gap-6'>
                                <div className='flex flex-col w-[65%] ' >
                                    <div className="flex gap-3">
                                        <div>
                                            <Link href="">
                                                <span className="cursor-pointer">
                                                    <Avatar />
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="grow">
                                            <p>
                                                <Link>
                                                    <span className="font-semibold cursor-pointer">{p.creatorName}</span>
                                                </Link>
                                                <span className="ml-1.5">shared a post</span>

                                            </p>
                                            <p className="text-gray-500 text-sm">5 mins ago</p>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='sm:flex  gap-2 hidden items-center text-white bg-[#2f6a81] py-2 px-4 transition-all duration-300 rounded-full'>
                                                <AiOutlineUserAdd className='cursor-pointer' size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                                <button type='submit'>Follow</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm my-2">{p.description}</p>
                                        <div className="w-full h-screen max-h-[50vh]">
                                            <Carousel pauseOnHover className="w-full mx-auto" infiniteLoop={true}>
                                                {p.artList.map((item, index) => (
                                                    <div key={index} onClick={() => handleImageClick(item.imagePath)}>
                                                        <img
                                                            src={item.imagePath}
                                                            className="rounded-md w-full"
                                                            alt={`Post Image - ${p.description}`}
                                                        />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-between">
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
                                <Modal dismissible className='mt-10 px-28' size={1} show={openModal} onClose={() => setOpenModal(false)}>
                                    <Modal.Body className='flex justify-between items-start mx-10'>
                                        <div>
                                            <img src={selectedImage} alt="Selected Image" className="h-[480px] mx-auto"/>

                                            <div className="flex justify-between gap-3 mt-5 w-[650px]">
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
                                                </div>
                                            </div>
                                        </div>

                                        <Card className="max-w-sm p-6">
                                            <h5 className="text-2xl font-semibold tracking-tight text-[#F4980A] dark:text-white">
                                                Premium Image
                                            </h5>

                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                Unlock this file and get unlimited access.
                                            </p>

                                            {p.artList.map(item => item.type === "Free") ? (
                                                <div className="flex justify-center mt-4">
                                                    <button className="flex items-center px-4 py-2 text-white bg-[#F4980A] rounded-full transition-all duration-300">
                                                        <MdOutlineFileDownload className="mr-2" size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                                        Download
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center mt-4">
                                                    <button className="flex items-center px-4 py-2 text-white bg-[#2f6a81] rounded-full transition-all duration-300">
                                                        <MdOutlineFileDownload className="mr-2" size={20} style={{ color: '#fff', fontWeight: 'bold' }} />
                                                        Download
                                                    </button>
                                                </div>
                                            )}
                                        </Card>
                                    </Modal.Body>
                                </Modal>
                            )}
                        </Card>

                    )

                    : null}
            </div>

        </>
    )
};

export default CardItem;
