import React, { useEffect, useState } from 'react';
import { isFutureDate, compareDates } from '../../utils/isfutureDate';
import { useNavigate } from 'react-router-dom';

import { DatePicker, Space } from 'antd';

import { TimePicker } from 'antd';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const commonDivStyle = 'flex flex-col my-2';
const commonInputStyle = 'outline-none border-[0.5px] border-white hover:border-blue-300 py-2 px-3 rounded-md transition-all duration-200 ease-linear';
const commonBtnStyle = 'py-2 w-full rounded-md cursor-pointer transition-all duration-200 ease-linear'
const url1 = 'http://localhost:5000/api/get-user';
const url2 = 'http://localhost:5000/api/medicine-schedule';


export default function ScheduleMedicine() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mediceneNames, setMediceneNames] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [times, setTimes] = useState([]);
  const [alltimeEntered, setAlltimeEntered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState(false);
  const [timeSaved, setTimeSaved] = useState(false);

  const handleCaretaker = (careBy) => {
    const token = localStorage.getItem("TakeYourMedicineAuth");
    const {email, contactNo} = user;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const data = { mediceneNames, from, to, frequency, times, careBy, email, contactNo }

    try {
      setSaving(true);
      axios.post(url2, data, {headers})
        .then((response) => {
          setSaving(false)
          if (response.data.success) {
            setTimeSaved(true);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            setServerError(true);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  const fetchUser = (token) => {
    if (!token) {
      setUser(null);
      setLoading(false); // Add this line
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    try {
      axios.get(url1, { headers: headers })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false); // Add this line
        });
    } catch (error) {
      console.log("Error while getting the user", error);
      setLoading(false); // Add this line
    }
  };

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("TakeYourMedicineAuth")) {
      fetchUser(localStorage.getItem("TakeYourMedicineAuth"));
    } else {
      setLoading(false)
    }
  }, []);


  const handleFrom = (date, dateString) => {
    const dateToCompare = new Date(dateString);
    const isUpcoming = isFutureDate(dateToCompare);
    (isUpcoming === "same" || isUpcoming === true) ? setFrom(dateString) : setFrom("past");
  };

  const handleTo = (date, dateString) => {
    const isRightTo = compareDates(from, dateString);
    (isRightTo === "same" || isRightTo === true) ? setTo(dateString) : setTo("wrong");
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
    for (let i = 0; i < newTimes.length; i++) {
      if (newTimes[i] === "") {
        flag = 0;
      }
    }
    if (flag) {
      setAlltimeEntered(true);
    }
  };

  // console.log(user);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <BeatLoader size={30} color='blue' speedMultiplier={2} />
        </div>
      </div>
    )
  }
  if (user === null) {
    navigate("/login")
  }
  return (
    <div className='flex justify-center min-h-full w-full animate-fade-in transition-all duration-300 ease-linear'>
      <div className='w-1/3 max-lg:w-1/2 max-md:w-5/6 max-sm:w-11/12'>
        <div className={commonDivStyle}>
          <p className='text-semibold'>Medicine name<span className='text-red-500'>*</span></p>
          <input type='text' className={commonInputStyle} placeholder='Input mediceneNames name' onChange={(e) => setMediceneNames(e.target.value)} />
          {from && !mediceneNames && <p className='text-red-500 animate-fade-in duration-200 ease-linear'>
            Input mediceneNames name
          </p>}
        </div>

        <div className='flex justify-between my-4'>

          {mediceneNames && (
            <div className='flex flex-col'>
              <p>From date<span className='text-red-500'>*</span></p>
              <Space direction="vertical">
                <DatePicker onChange={handleFrom} />
              </Space>
              {from === "past" && (
                <p className='text-red-500 animate-fade-in'>Input correct 'from date'</p>
              )}
            </div>
          )}

          {(from !== "" && from !== "past") && (
            <div>
              <p>To date<span className='text-red-500'>*</span></p>
              <Space direction="vertical">
                <DatePicker onChange={handleTo} />
              </Space>
              {to === "wrong" && (
                <p className='text-red-500 animate-fade-in'>Input correct 'to date'</p>
              )}
            </div>
          )}
        </div>

        {mediceneNames && from && to && from !== "past" && to !== "wrong" && (
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
              <TimePicker value={times[index]} onChange={(time) => handleTimeChange(time, index)} />
            </div>
          ))}
        </div>

        {alltimeEntered && (
          <div className='w-full flex flex-col my-4 gap-3'>
            <button
              type='button'
              className={`bg-blue-600 hover:bg-blue-500 text-white ${commonBtnStyle}`}
              onClick={() => handleCaretaker('inperson')}
            >Request for caretaker</button>
            <button
              type='button'
              className={`bg-yellow-400 hover:bg-yellow-300 text-black ${commonBtnStyle}`}
              onClick={() => handleCaretaker('self')}
            >Notify on Email and SMS</button>
          </div>
        )}
      </div>
    </div>
  )
}