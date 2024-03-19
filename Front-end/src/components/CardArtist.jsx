import React, { useState, useEffect } from 'react'
import { Avatar, Card } from "flowbite-react";
import { AiOutlineUserAdd } from "react-icons/ai";

const CardArtist = () => {
    return (
        <div>
            <div className="flex items-center justify-center w-full gap-16">
                <Card className="w-[25%]">
                    <div className="flex flex-col items-center">
                        <Avatar rounded size="lg" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {/* {p[0]?.creatorName} */}abc
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Artist
                        </span>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                <AiOutlineUserAdd
                                    size={20}
                                    className="hover:text-[#2f6a81]"
                                />
                                <button type="submit">Follow</button>
                            </div>
                            <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                <AiOutlineUserAdd
                                    size={20}
                                    className="hover:text-[#2f6a81]"
                                />
                                <button type="button" >Request</button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="w-[25%]">
                    <div className="flex flex-col items-center">
                        <Avatar rounded size="lg" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {/* {p[0]?.creatorName} */}abc
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Artist
                        </span>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                <AiOutlineUserAdd
                                    size={20}
                                    className="hover:text-[#2f6a81]"
                                />
                                <button type="submit">Follow</button>
                            </div>
                            <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                <AiOutlineUserAdd
                                    size={20}
                                    className="hover:text-[#2f6a81]"
                                />
                                <button type="button" >Request</button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="w-[25%]">
                    <div className="flex flex-col items-center">
                        <Avatar rounded size="lg" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {/* {p[0]?.creatorName} */}abc
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Artist
                        </span>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                <AiOutlineUserAdd
                                    size={20}
                                    className="hover:text-[#2f6a81]"
                                />
                                <button type="submit">Follow</button>
                            </div>
                            <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                <AiOutlineUserAdd
                                    size={20}
                                    className="hover:text-[#2f6a81]"
                                />
                                <button type="button" >Request</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CardArtist