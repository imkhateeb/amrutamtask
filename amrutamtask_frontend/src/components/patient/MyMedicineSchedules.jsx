import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5';

// Fake request list
import { requestList } from '../../utils/testrequest';

export default function MyMedicineSchedules() {
   const { userId } = useParams();
   const [mySchedules, setMySchedules] = useState([]);

   useEffect(() => {
      const myArray = requestList?.filter((item) => item._id === userId);
      setMySchedules(myArray);
   }, [])


   return (
      <div className='mt-40 md:mt-52 flex flex-col w-full'>
         <div className='flex flex-wrap justify-evenly mx-auto max-sm:w-11/12 max-md:w-5/6 md:w-2/3 gap-2 md:gap-4'>
            {mySchedules?.map(({ medicineName, from, to, times, postedAt, acceptedBy }) => (
               <div key={medicineName + postedAt} className='p-3 md:p-5 bg-blend-screen shadow-md rounded-md'>
                  <h2 className='text-xl font-semibold md:text-2xl'>{medicineName}</h2>
                  <p className='text-xs text-gray-400'>POSTED AT - {postedAt}</p>
                  <p className='text-xs text-gray-500'>{from} <span className='text-[10px] font-bold'>TO</span> {to}</p>

                  <div className='h-[0.5px] border-b-[0.5px] border-gray-400 w-full my-2' />

                  <div className='flex gap-2'>
                     {times?.map((time) => (
                        <span className='text-xs text-gray-500'>{time}</span>
                     ))}
                  </div>
                  <div className='mt-3'>
                     {acceptedBy?.userId ? (
                        <p className='text-green-600 font-bold flex items-center'>Accpted by - {acceptedBy?.name}<IoCheckmarkDoneCircleSharp fontSize={25} className='mx-2' /></p>
                     ) : (
                        <p className='text-red-500'>Yet to accept.</p>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}