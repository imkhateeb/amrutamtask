import React from 'react'

export default function RequestCard({ name, medicineName, from, to, frequency, times, postedAt, userId, taken }) {
   return (
      <div className='p-3 sm:p-5 bg-blend-screen shadow-md rounded-md flex flex-col'>
         <h1 className='text-3xl font-bold max-sm:text-2xl'>{name}</h1>
         <p className='text-xs text-gray-400'>POSTED AT - {postedAt}</p>
         <div className='h-[0.5px] border-b-[0.5px] border-gray-400 w-full my-2' />
         <div>
            <h2 className='text-xl font-semibold md:text-2xl'>{medicineName}</h2>
            <p className='text-xs text-gray-500'>{from} <span className='font-bold'>to</span> {to}</p>
            <div className='flex gap-2'>
               {times?.map((time) => (
                  <span className='text-xs text-gray-500'>{time}</span>
               ))}
            </div>
            <div>
               {!taken && (
                  <button
                     type='button'
                     className='cursor-pointer py-1 mt-5 px-3 bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 ease-linear rounded-md '
                  >Accept!</button>
               )}
            </div>
         </div>
      </div>
   )
}
