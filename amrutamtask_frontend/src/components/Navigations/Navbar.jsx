import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { HiMenuAlt1 } from 'react-icons/hi';

import Sidebar from './Sidebar';

import { navigations } from '../../utils';

export default function Navbar() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  



  const NavigationItem = ({ name, url }) => {
    return (
      <Link
        to={url}
        className='px-3 py-2 text-green-800 hover:text-green-600 transition-all duration-300 ease-linear'>{name}</Link>
    )
  }


  return (
    <div
      className='flex flex-col justify-between w-full'
    >
      <div className='w-full flex items-center justify-center bg-green-800 text-white'>
        <p className='py-4 px-5 text-center texlg font-semibold'>Get Personalised Prescription with a Free Chat Consultation from Ayurveda experts on the Amrutam App! 🌿 Download Now 🌼</p>
      </div>
      <div className='bg-secondaryColor flex flex-col w-full'>
        <div className='flex justify-between w-[80%] mx-auto py-3 items-center my-3 max-sm:my-1 max-sm:w-11/12 max-md:w-5/6'>
          <div>
            <p className='max-md:hidden'>+91 9713171999</p>
            <HiMenuAlt1 fontSize={40} className='md:hidden font-bold cursor-pointer' onClick={() => {
              setToggleSidebar(true)
            }} />
          </div>

          <h1 className='text-3xl max-sm:text-2xl text-green-900 font-bold tracking-widest'><Link to="/">AMRUTAM</Link></h1>
          <div className='flex gap-4 max-md:hidden'>

            <div className='cursor-pointer'><BsSearch fontSize={35} className='font-bold' /></div>

            <div className='cursor-pointer'><FiUser fontSize={35} className='font-bold' /></div>


            <div className='relative cursor-pointer'>
              <AiOutlineHeart fontSize={35} className='font-bold' />
              <div className='bg-red-500 rounded-full text-white text-xs flex items-center justify-center absolute top-0 right-0 shadow-xl'>
                <span className='py-[2px] px-[5px]'>1</span>
              </div>
            </div>


            <div className='relative cursor-pointer'>
              <FiShoppingCart fontSize={35} className='font-bold' />
              <div className='bg-red-500 rounded-full text-white text-xs flex items-center justify-center absolute top-0 right-0 shadow-xl'>
                <span className='py-[2px] px-[5px]'>1</span>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[0.5px] border-b-[0.5px] border-gray-400 w-[80%] mx-auto max-md:hidden' />

        <div className='flex items-center justify-center gap-5 my-3 max-md:hidden'>
          {navigations.map((navigation) => (
            <NavigationItem
              key={navigation.name + navigation.url}
              name={navigation.name}
              url={navigation.url}
            />
          ))}
        </div>
      </div>

      {toggleSidebar && (
        <div className='fixed top-0 left-0 w-5/6 animate-slide-in bg-tertiaryColor h-screen'>
          <Sidebar
            handleSidebar={() => setToggleSidebar(false)}
          />
        </div>
      )}

      
    </div>
  )
}
