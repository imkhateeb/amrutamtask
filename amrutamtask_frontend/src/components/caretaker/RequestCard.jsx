import React, { useState } from 'react';
import axios from 'axios';

import { IoMdCloudDone } from 'react-icons/io';
import { BeatLoader } from 'react-spinners';

const token = localStorage.getItem('TakeYourMedicineAuth');
const url = 'http://localhost:5000/api/accept-medicine-schedule';

export default function RequestCard({ patientName, caretaker, patientId, caretakerName, caretakerId, contactNo, whatsAppNo, email, courseStatus, medicineNames, from, to, times, postedAt, taken, requestId, careBy }) {
  const [accepting, setAccepting] = useState(false);
  const [internalServerError, setInternalServerError] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'token': token,
      'requestId': requestId,
    };

    try {
      setAccepting(true);
      const response = await axios.get(url, { headers });
      const json = await response.json();
      console.log(json);
      setAccepting(false);
      setAccepted(true);
      handleReloadAfterDelay();
    } catch (error) {
      setAccepting(false);
      setInternalServerError(true);
      handleReloadAfterDelay();
    }
  }

  const handleReloadAfterDelay = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  if (accepting) {
    return (
      <div className='p-3 sm:p-5 bg-blend-screen shadow-md rounded-md flex flex-col max-sm:w-11/12 max-md:w-3/5 max-lg:w-[48%] lg:w-[30%] flex items-center justify-center animate-fade-in duration-200 ease-linear'>
        <BeatLoader size={30} color='green' />
      </div>
    )

  }

  if (accepted) {
    return (
      <div className='p-3 sm:p-5 bg-green-400 shadow-md rounded-md flex flex-col max-sm:w-11/12 max-md:w-3/5 max-lg:w-[48%] lg:w-[30%] flex items-center justify-center animate-fade-in duration-200 ease-linear'>
        <IoMdCloudDone fontSize={30} color='white' />
        <p className='text-center'>Now you will take care</p>
        <h1 className='text-center'>{patientName}</h1>
      </div>
    )
  }
  return (
    <div className='p-3 sm:p-5 bg-blend-screen shadow-md rounded-md flex flex-col max-sm:w-11/12 max-md:w-3/5 max-lg:w-[48%] lg:w-[30%]'>
      <h1 className='text-3xl font-bold max-sm:text-2xl'>{patientName}</h1>
      <p className='text-xs text-gray-400'>POSTED AT - {postedAt.split('T')[0]} {postedAt.split('T')[1].split('.')[0]}</p>
      <hr className='h-[0.5px] border-b-[0.5px] border-gray-400 w-full my-2' />
      <div>
        <h2 className='text-xl font-semibold md:text-2xl'>{medicineNames}</h2>
        <p className='text-xs text-gray-500'>{from} <span className='font-bold'>to</span> {to}</p>
        <div className='flex gap-2 flex-wrap'>
          {times?.map((time) => {
            const newTime = time.split('T')[1].split('.')[0];
            return (
              <span key={time} className='text-xs text-gray-500'>{newTime}, </span>
            );
          })}
        </div>
        <div className='w-full'>
          {!taken ? (
            <button
              type='button'
              className='cursor-pointer py-1 mt-5 px-3 bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 ease-linear rounded-md '
              onClick={handleAccept}
              disabled={accepting}
            >
              {accepting ? 'Accepting...' : 'Accept!'}
            </button>
          ) : (
            <div>
              {courseStatus === 'running' && caretaker && (
                <div className='flex gap-2'>
                  <button
                    type='button'
                    className='cursor-pointer py-1 mt-5 px-3 bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 ease-linear rounded-md '
                    onClick={handleAccept}
                    disabled={accepting}
                  >
                    {accepting ? 'Pushing...' : 'Push SMS!'}
                  </button>

                  <button
                    type='button'
                    className='cursor-pointer py-1 mt-5 px-3 bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 ease-linear rounded-md '
                    onClick={handleAccept}
                    disabled={accepting}
                  >
                    {accepting ? 'Emailing...' : 'Push Email!'}
                  </button>
                </div>
              )}
              {courseStatus === 'completed' && caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600'>Cogratulations, you have done a nice job and completed {patientName}'s course</h1>
                </div>
              )}
              {courseStatus === 'running' && careBy !== 'self' && !caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600'>Your course is running!</h1>

                  <h1 className='font-bold text-green-600'>Your caretaker is {caretakerName}</h1>
                </div>
              )}
              {courseStatus === 'running' && careBy === 'self' && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600'>Your course is running!</h1>

                  <h1 className='font-bold text-blue-600'>We will notify you on time!</h1>
                </div>
              )}
              {courseStatus === 'completed' && !caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600'>Congratulations your course is completed!</h1>
                </div>
              )}
              {courseStatus !== 'completed' && courseStatus !== 'running' && !caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-red-600'>Yet to accept!</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}