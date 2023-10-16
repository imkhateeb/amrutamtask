import React from 'react';
import { Link } from 'react-router-dom';

import { ImCross } from 'react-icons/im';

import { navigations } from '../../utils';


const NavigationItem = ({ name, url, handleSidebar }) => {
  return (
    <Link
      to={url}
      onClick={handleSidebar}
      className='px-3 py-2 text-green-800 hover:text-green-600 transition-all duration-300 ease-linear text-base font-bold'>{name}</Link>
  )
}



export default function Sidebar({handleSidebar}) {
  return (
    <div>
      <div className='w-full flex items-center justify-between my-4 px-4'>
        <h1 className='text-3xl font-bold text-green-900'><Link to="/" onClick={handleSidebar}>AMRUTA</Link></h1>
        <ImCross fontSize={30} className='font-bold text-green-800 cursor-pointer' onClick={handleSidebar} />
      </div>

      <div className='flex flex-col items-center justify-center gap-3 mt-10'>
          {navigations.map((navigation) => (
            <NavigationItem
              key={navigation.name + navigation.url}
              name={navigation.name}
              url={navigation.url}
              handleSidebar={handleSidebar}
            />
          ))}
        </div>

    </div>
  )
}
