import React, { useEffect, useState } from 'react'
import { navLinks } from '../constants';
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {
  const [active, setActive] = useState("Home");
  // const [toggle, setToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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


  return (
    <header className='w-full bg-purple-300 fixed top-0 left-0 right-0'>
      <nav className='navbar px-10'>
        <div className='space-x-16 h-[100px] flex justify-between items-center'>
          <a href='/home'>
            <img src={logo} className='w-[124px] h-[124px]' alt="Logo" />
          </a>

          <ul className="list-none space-x-12 sm:flex hidden justify-center items-center flex-1">
            {
              navLinks.map(({link, path}) => 
                <Link to={path} key={path} className='block text-base'>{link}</Link>
              )
            }
          </ul>
          
          <div className='bg-gray-200 rounded-full sm:flex hidden items-center px-4 lg:w-[350px]'>
            <AiOutlineSearch className='cursor-pointer' size={20} />
            <input className='bg-transparent p-2 focus:outline-none' type='text' placeholder='Search for art...'/>
          </div>

          <div className='space-x-12 lg:flex items-center'>
            <a href='/' className='lg:flex items-center hover:text-red'>Login</a>
            <button className='text-white bg-red-500 py-2 px-4 transition-all duration-300 rounded '>Sign Up</button>
          </div>
        </div>

        {/* <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-black" : "text-red"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      </nav>
    </header >

  )
}

export default NavBar;