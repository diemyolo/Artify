import React, { useState, useEffect } from 'react'
import CardItem from '../../components/CardItem';
import NavBar from '../../components/NavBar'

const SinglePost = () => {
    const [post, setPost] = useState([]);

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
                        // setCreatorName(result.payload[0].creatorName);
                    }
                })
                .catch((error) => console.error(error));
        }
        fetchFData();
    }, []);
    console.log(post);

    return (
        <div className='h-screen overflow-hidden'>
            <NavBar />
            <div className="flex flex-row justify-start w-full bg-gray-100">
                <div className="flex flex-row justify-start w-full p-28">
                    <CardItem />
                </div>
            </div>
        </div>

    )
}

export default SinglePost