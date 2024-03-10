import React, { useState, useEffect } from 'react'
import { Avatar, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import login from "../assets/login.jpg";
import InputComment from './InputComment';
import { Spin } from "antd";
const PostCard = () => {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
            fetch("http://localhost:8080/api/auth/audience/viewAllPosts", requestOptions)
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
                        // setCreatorName(result.payload[0].creatorName);
                        setIsLoading(true);
                    }
                })
                .catch((error) => console.error(error));
        }
        fetchFData();
    }, []);
    console.log(post);
    return (
        <>
        <Spin spinning={!isLoading} fullscreen />
            <div className='flex flex-col justify-center items-center'>
                {post.length > 0 ?
                    post.map((p) =>
                        <Card key={p.postId} className="justify-center flex bg-white shadow-md shadow-gray-300 rounded-md mb-5 w-1/2 gap-1">
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
                                    <p className="text-gray-500 text-sm">{p.artList.map(item => item.createdDate)}</p>
                                    
                                </div>
                            </div>

                            <div>
                                <p className="my-2 text-sm">{p.description}</p>
                                <Link to={`/singlePost`}>
                                    <img src={p.artList.map(item => item.imagePath)} className="rounded-md w-2x overflow-hidden" />
                                </Link>
                            </div>

                            <div className="mt-1 flex justify-between">
                                <div className="flex justify-between gap-16">
                                    <button className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        {/* {p.interactions.map((interaction) => interaction.interactionPost.numberOfLikes)} */}
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
                            <InputComment />
                        </Card>
                    )
                    : null}
            </div>



        </>
    )


};


export default PostCard;
