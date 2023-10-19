import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { isFutureDate, compareDates } from '../../utils/isfutureDate';

import { DatePicker, Space } from 'antd';


import { TimePicker } from 'antd';

const commonDivStyle = 'flex flex-col my-2';
const commonInputStyle = 'outline-none border-[0.5px] border-white hover:border-blue-300 py-2 px-3 rounded-md transition-all duration-200 ease-linear';
const commonBtnStyle = 'py-2 w-full rounded-md cursor-pointer transition-all duration-200 ease-linear'

export default function ScheduleMedicine() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [medicene, setMedicene] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [times, setTimes] = useState([]);
  const [alltimeEntered, setAlltimeEntered] = useState(false);

  const handleFromDate = (date, dateString) => {
    const dateToCompare = new Date(dateString);
    const isUpcoming = isFutureDate(dateToCompare);
    (isUpcoming === "same" || isUpcoming === true) ? setFromDate(dateString) : setFromDate("past");
  };

  const handleToDate = (date, dateString) => {
    const isRightToDate = compareDates(fromDate, dateString);
    (isRightToDate === "same" || isRightToDate === true) ? setToDate(dateString) : setToDate("wrong");
  }

  const handleFrequency = (e) => {
    if (parseInt(e.target.value) <= 0) {
      setFrequency(-1);
    } else {
      setFrequency(parseInt(e.target.value))
      setTimes(new Array(parseInt(e.target.value) ? parseInt(e.target.value) : 0).fill(''));
    }
  }

  const handleTimeChange = (time, index) => {
    const newTimes = [...times];
    newTimes[index] = time;
    setTimes(newTimes);
    let flag = 1;
    for ( let i = 0; i < newTimes.length; i++ ){
      if ( newTimes[i] === "" ){
        flag = 0;
      }
    }
    if ( flag ) {
      setAlltimeEntered(true);
    }
  };

  console.log(times);


  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-full w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='w-1/3 max-lg:w-1/2 max-md:w-5/6 max-sm:w-11/12'>
          <div className={commonDivStyle}>
            <p className='text-semibold'>Medicine name<span className='text-red-500'>*</span></p>
            <input type='text' className={commonInputStyle} placeholder='Input medicene name' onChange={(e) => setMedicene(e.target.value)} />
            {fromDate && !medicene && <p className='text-red-500 animate-fade-in duration-200 ease-linear'>
              Input medicene name
            </p>}
          </div>

          <div className='flex justify-between my-4'>
            <div className='flex flex-col'>
              <p>From date<span className='text-red-500'>*</span></p>
              <Space direction="vertical">
                <DatePicker onChange={handleFromDate} />
              </Space>
              {fromDate === "past" && (
                <p className='text-red-500 animate-fade-in'>Input correct 'from date'</p>
              )}
            </div>

            {(fromDate !== "" && fromDate !== "past") && (
              <div>
                <p>To date<span className='text-red-500'>*</span></p>
                <Space direction="vertical">
                  <DatePicker onChange={handleToDate} />
                </Space>
                {toDate === "wrong" && (
                  <p className='text-red-500 animate-fade-in'>Input correct 'to date'</p>
                )}
              </div>
            )}
          </div>

          {medicene && fromDate && toDate && fromDate !== "past" && toDate !== "wrong" && (
            <div className={commonDivStyle}>
              <p>How often in a day?<span className='text-red-500'>*</span></p>
              <input type='number' className={commonInputStyle} onChange={handleFrequency}
                placeholder='Input daily dose frequency'
              />
              {frequency === -1 && (
                <p className='text-red-500 animate-fade-in'>Frequency should be greater than 0</p>
              )}
            </div>
          )}

          <div className='flex flex-wrap gap-4 justify-center'>
            {times.length !== 0 && times.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p className='mr-2'>{`Time ${index + 1}:`}</p>
                <TimePicker value={times[index]} onChange={(time)=>handleTimeChange(time, index)} />
              </div>
            ))}
          </div>

          {alltimeEntered && (
            <div className='w-full flex flex-col my-4 gap-3'>
              <button
              type='button'
              className={`bg-blue-600 hover:bg-blue-500 text-white ${commonBtnStyle}`}
              >Request for caretaker</button>
              <button
              type='button'
              className={`bg-yellow-400 hover:bg-yellow-300 text-black ${commonBtnStyle}`}
              >Notify on Email and SMS</button>
            </div>
          )}




        </div>
      </div>
    )
  }
}
