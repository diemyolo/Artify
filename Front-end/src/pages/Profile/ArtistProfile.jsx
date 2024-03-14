import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import PostCard from '../../components/PostCard'
import CardProfile from '../../components/CardProfile';
import ImageList from '../../components/ImageList';
import RequestArt from '../../components/RequestArt';
import axios from "axios";

const ArtistProfile = () => {
  const [activeComponent, setActiveComponent] = useState('post');
  const [post, setPost] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const creatorId = params.get("creatorId");
 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/auth/getPostByCreator?creatorId=${creatorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost(response.data.payload);
    }
    fetchData();
  }, []);

  console.log(post)

  const handlePostButtonClick = () => {
    setActiveComponent('post');
  };

  const handleGalleryButtonClick = () => {
    setActiveComponent('gallery');
  };

  const handleFollowerButtonClick = () => {
    setActiveComponent('follower');
  };

  const handleRequestButtonClick = () => {
    setActiveComponent('request');
  };

  const renderActiveComponent = () => {
    if (activeComponent === 'post') {
      return <PostCard />;
    } else if (activeComponent === 'gallery') {
      return <ImageList />;
    } else if (activeComponent === 'follower') {
      return <PostCard />;
    } else if (activeComponent === 'request') {
      return <RequestArt creatorId={creatorId} />;
    }
  };

  console.log(activeComponent)

  return (
    <div className='w-full h-screen bg-gray-100'>
      <NavBar />

      <CardProfile
        onPostButtonClick={handlePostButtonClick}
        onGalleryButtonClick={handleGalleryButtonClick}
        onFollowerButtonClick={handleFollowerButtonClick}
        onRequestButtonClick={handleRequestButtonClick}
        p={post}
        creatorId={creatorId}
      />

      <div className='w-full mt-72 bg-gray-100'>
        {renderActiveComponent()}
      </div>
    </div>
  )
}

export default ArtistProfile