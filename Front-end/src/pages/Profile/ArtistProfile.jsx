import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import PostCard from '../../components/PostCard'
import CardProfile from '../../components/CardProfile';

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
      return <PostCard onCreatorNameClick={handleCreatorNameClick}
      />;
    } else if (activeComponent === 'gallery') {
      return <PostCard />;
    } else if (activeComponent === 'follower') {
      return <PostCard />;
    }
  };

  const [creatorName, setCreatorName] = useState('');

  const handleCreatorNameClick = (name) => {
    setCreatorName(name);
  };

  return (
    <div className='w-full h-screen bg-gray-100'>
      <NavBar />

      <CardProfile
        creatorName={creatorName} 
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