import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import PostCard from '../../components/PostCard'
import CardProfile from '../../components/CardProfile';
import InputComment from '../../components/InputComment';
import Gallery from '../../components/Gallery';

const ArtistProfile = () => {
  const [activeComponent, setActiveComponent] = useState('post');

  const handlePostButtonClick = () => {
    setActiveComponent('post');
  };

  const handleGalleryButtonClick = () => {
    setActiveComponent('gallery');
  };

  const handleFollowerButtonClick = () => {
    setActiveComponent('follower');
  };

  const renderActiveComponent = () => {
    if (activeComponent === 'post') {
      return <PostCard />;
    } else if (activeComponent === 'gallery') {
      return <Gallery />;
    } else if (activeComponent === 'follower') {
      return <PostCard />;
    }
  };

  return (
    <div className='w-full h-screen bg-gray-100'>
      <NavBar />

      <CardProfile
        onPostButtonClick={handlePostButtonClick}
        onGalleryButtonClick={handleGalleryButtonClick}
        onFollowerButtonClick={handleFollowerButtonClick}
      />

      <div className='w-full mt-72 bg-gray-100'>
        {renderActiveComponent()}
      </div>
    </div>
  )
}

export default ArtistProfile