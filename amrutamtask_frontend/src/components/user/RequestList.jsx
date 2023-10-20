import React from 'react';
import { useParams } from 'react-router-dom';

import RequestCard from '../caretaker/RequestCard';

// Fake request list
import {requestList} from '../../utils/testrequest';

export default function RequestList() {
  const {userId}  = useParams();

  return (
    <div className='mt-40 md:mt-52 flex flex-col w-full'>
      <div className='flex flex-wrap justify-evenly mx-auto max-sm:w-11/12 max-md:w-5/6 md:w-2/3 gap-2 md:gap-4'>
        {requestList?.map(({name, medicineName, from, to, frequency, times, postedAt})=>(
          <RequestCard 
            key={name+postedAt}
            name={name}
            medicineName={medicineName}
            from={from}
            to={to}
            frequency={frequency}
            times={times}
            postedAt={postedAt}
            userId={userId}
            taken={false}
          />
        ))}
      </div>
    </div>
  )
}
