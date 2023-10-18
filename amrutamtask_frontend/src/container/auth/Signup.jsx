import React from 'react'

const commonDivStyle = 'flex flex-col my-2';
const commonInputStyle = 'outline-none border-[0.5px] border-white hover:border-blue-300 py-2 px-3 rounded-md transition-all duration-200 ease-linear';

export default function Signup() {





  return (


    <div className='flex items-center justify-center h-full w-full animate-fade-in transition-all duration-300 ease-linear'>
      <div className='w-1/3 max-lg:w-1/2 max-md:w-5/6 max-sm:w-11/12'>
        <h1 className='text-black text-3xl font-bold'>Register here</h1>
        <div className='my-4 px-2'>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Name<span className='text-red-500'>*</span></p>
            <input type='text' className={commonInputStyle} placeholder='Input your full-name' />
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Name<span className='text-red-500'>*</span></p>
            <input type='text' className={commonInputStyle} placeholder='Input your full-name' />
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Name<span className='text-red-500'>*</span></p>
            <input type='text' className={commonInputStyle} placeholder='Input your full-name' />
          </div>

          <div className={commonDivStyle}>
            <button
            type='button'
            className='py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded-md transition-all duration-300 ease-linear text-white'
            >
              Signup here!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
