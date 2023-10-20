import React, { useState } from 'react';
import LoginImage from '../assets/images/login3d.png';
import AddScheduleImage from '../assets/images/addschedule3d.png';

import {Link} from 'react-router-dom';

const commonBtnStyle = 'py-2 cursor-pointer transition-all duration-200 ease-linear w-5/6 rounded-md';

export default function Home() {
  const [user, setUser] = useState(null);


  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-1/3 max-md:w-5/6 max-sm:w-11/12 py-6 px-3 bg-blend-multiply shadow-md rounded-3xl flex flex-col items-center justify-start'>
        <img 
          src={user ? LoginImage : AddScheduleImage}
          alt='caring-img'
          className='w-5/6'
        />

        {!user ? (
          <Link to={`/medicine/kasdhfkash/request-list`} className={`bg-yellow-300 hover:bg-yellow-200 text-black ${commonBtnStyle} flex items-center justify-center`}>Request List</Link>
        ):(
          <button
          type='button'
          className={`bg-blue-600 hover:bg-blue-500 text-white ${commonBtnStyle}`}
          >Login here!</button>
        )}
      </div>
    </div>
  )
}
