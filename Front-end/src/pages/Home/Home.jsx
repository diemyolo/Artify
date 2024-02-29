import React from 'react'
import NavBar from '../../components/NavBar'
import Hero from '../../components/Hero'

export default function Home() {

  return (
    <div className='w-full'>
      <div className="px-16 sm:px-16 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <NavBar />
        </div>
      </div>
      <div className="px-16 sm:px-16 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <Hero />
        </div>
      </div>

    </div>

  )

}
