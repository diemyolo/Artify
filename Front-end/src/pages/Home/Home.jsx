import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import Hero from '../../components/Hero'
import PostCard from '../../components/PostCard'

export default function Home() {

  const [selectedCreatorName, setSelectedCreatorName] = useState(null);
  const handleCreatorNameClick = (creatorName) => {
    setSelectedCreatorName(creatorName);
  };

  return (
    <div className='w-full bg-gray-100'>
      <div className="flex justify-center items-center ">
        <div className="w-full">
          <NavBar />
          <Hero />
          <div className='m-10 flex flex-col items-center justify-center'>
            <PostCard onCreatorNameClick={handleCreatorNameClick} />
          </div>
        </div>
      </div>
    </div>

  )

}
