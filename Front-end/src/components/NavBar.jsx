import React, { useEffect, useState } from 'react'
import { navLinks } from '../constants';
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const auth = localStorage.getItem("token")


  useEffect(() => {
    const handleScroll = () => {
      if (Window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className='w-full bg-gray-100 fixed top-0 left-0 right-0'>
      <nav className='navbar px-10'>
      {
        auth ?
        <div className='space-x-16 h-[90px] flex justify-between items-center'>
          <a href='/home'>
            <img src={logo} className='w-[124px] h-[124px]' alt="Logo" />
          </a>

          <ul className="list-none space-x-12 sm:flex hidden justify-center items-center flex-1 font-semibold">
            {
              navLinks.map(({ link, path }) =>
                <Link to={path} key={path} className='block text-base'>{link}</Link>
              )
            }
          </ul>

          <div className='bg-gray-200 rounded-full sm:flex hidden items-center px-4 lg:w-[350px]'>
            <AiOutlineSearch className='cursor-pointer' size={20} style={{ color: '#2f6a81', fontWeight: 'bold' }}/>
            <input
              className=' bg-transparent p-3 lg:w-[350px] appearance-none focus:outline-none border-none'
              type='search'
              placeholder='Search for art...'
              style={{ outline: 'none' }}
            />
          </div>

          <div className="space-x-12 lg:flex items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="font-semibold lg:flex items-center hover:text-[#2f6a81]"
                >
                  Profile
                </Link>
                <button
                  className="text-white bg-[#2f6a81] py-2 px-4 transition-all duration-300 rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="font-semibold lg:flex items-center hover:text-[#2f6a81]"
                >
                  Login
                </a>
                <Link
                  to="/signup"
                  className="text-white bg-[#2f6a81] py-2 px-4 transition-all duration-300 rounded-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      }
      </nav>
    </header >
  )
}

export default NavBar;