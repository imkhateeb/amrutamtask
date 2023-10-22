import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RequestCard from '../caretaker/RequestCard';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';


const url1 = 'http://localhost:5000/api/get-user';
const url2 = 'http://localhost:5000/api/caretaker-request-list';


export default function RequestList() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [requestList, setRequestList] = useState([]);

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

  const fetchMedicineRequests = () => {

    setLoading(true);
    try {
      axios.get(url2)
        .then((response) => {
          if (response.data.success) {
            setRequestList(response.data.requestlist);
            setLoading(false);
          } else {
            setLoading(false);
            setServerError(true);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
    } catch (error) {
      setLoading(false);
    }


  }

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("TakeYourMedicineAuth")) {
      fetchUser(localStorage.getItem("TakeYourMedicineAuth"));
    } else {
      setLoading(false)
    }
    fetchMedicineRequests();
  }, []);


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
    <div className='flex flex-col w-full'>
      <div className='flex flex-wrap justify-evenly mx-auto max-sm:w-11/12 max-md:w-5/6 md:w-2/3 gap-2 md:gap-4'>
        {requestList.length !== 0 && requestList?.map(({ patient:{name}, medicineNames, from, to, frequency, times, postedAt }) => (
          <RequestCard
            key={name + postedAt}
            name={name}
            medicineName={medicineNames}
            from={from}
            to={to}
            frequency={frequency}
            times={times}
            postedAt={postedAt}
            // userId={userId}
            taken={false}
          />
        ))}
      </div>
    </div>
  )
}
