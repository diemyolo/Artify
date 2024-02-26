import React from 'react'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center max-w-[1240px] h-24 mx-auto text-black'>
        <h1 className='w-full text-3xl font-bold'>Artwork</h1>
        <ul className='flex'>
            <li className='p-4'>Home</li>
            <li className='p-4'>Art</li>
            <li className='p-4'>About</li>
            <li className='p-4'>Contact</li>
        </ul>
        <ul className='flex'>
            <li className='p-4'>Login</li>
            <li className='p-4'>Register</li>
        </ul>
    </div>
  )
}

export default NavBar