import React from 'react'

export default function Navbar() {
  return (
    <div
      className='bg-secondaryColor flex justify-between w-full'
    >
      <div className='ml-5 md:ml-10'>Left</div>
      <div className='md:hidden'>Mid</div>
      <div className='mr-5 md:mr-10'>Right</div>

    </div>
  )
}
