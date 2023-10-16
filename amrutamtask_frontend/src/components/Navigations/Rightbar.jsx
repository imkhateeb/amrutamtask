import React from 'react';

import { ImCross } from 'react-icons/im';

import Login from '../../container/auth/Login';
import Signup from '../../container/auth/Signup';


export default function Rightbar({handleRightSidebar}) {
  return (
    <div>
      <div className='w-full flex items-center justify-between my-4 px-4'>
        <ImCross fontSize={30} className='font-bold text-green-800 cursor-pointer' onClick={handleRightSidebar} />
      </div>
      <div className='mt-20 w-11/12'>
        <h1>Login here</h1>
        <div>
          <p>Username OR email<span className='text-red-500 text-xl'>*</span></p>
          <input type='text'  />
        </div>

      </div>
    </div>
  )
}
