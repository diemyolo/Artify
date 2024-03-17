import React, { useState, useEffect } from 'react'
import { Card } from 'flowbite-react';
import axios from "axios";

const FollowList = () => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:8080/api/auth/getPostByCreator?creatorId=${creatorId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setPost(response.data.payload);

            const followResponse = await axios.get(
                `http://localhost:8080/api/auth/number_of_follow?CreatorId=${creatorId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setFollow(followResponse.data.payload);
        }
        fetchData();
    }, []);

    return (
        <div className='flex justify-center pb-10' >
            <Card className="w-1/2">
                <div className="mb-4 flex items-center justify-center ">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Followers</h5>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                    <img
                                        alt="Neil image"
                                        height="32"
                                        src="/images/people/profile-picture-1.jpg"
                                        width="32"
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    )
}

export default FollowList