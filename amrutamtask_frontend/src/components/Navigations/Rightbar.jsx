import React, { useState } from 'react';

import { ImCross } from 'react-icons/im';

import Login from '../../container/auth/Login';
import Signup from '../../container/auth/Signup';


export default function Rightbar({ handleRightSidebar }) {

  const [alreadyUser, setAlreadyUser] = useState(false);

  return (
    <div>
      <div className='w-full flex items-center justify-between my-4 px-4'>
        <ImCross fontSize={30} className='font-bold text-green-800 cursor-pointer' onClick={handleRightSidebar} />
      </div>


      <div className='w-full mt-24'>
        {alreadyUser ? (
          <Signup />
        ) : (
          <Login />
        )}

        {alreadyUser ? (
          <div className='px-5'>
            <p className='text-center'>Already a user? <span onClick={()=>setAlreadyUser(!alreadyUser)} className='text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear'>Login here!</span> </p>
          </div>
        ) : (
          <div className='px-5'>
            <p className='text-center'>Not a user? <span onClick={()=>setAlreadyUser(!alreadyUser)} className='text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear'>Register here!</span> </p>
          </div>
        )}
      </div>
    </div>
  )
}
