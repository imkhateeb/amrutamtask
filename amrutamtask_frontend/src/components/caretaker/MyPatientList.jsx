import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../caretaker/RequestCard';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

const url = 'http://localhost:5000/api/my-patient-list';


export default function MyPatientList() {
  const [patientList, setPatientList] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [seaechEnd, setSearchEnd] = useState(false);

  const fetchMedicineRequests = (token) => {

    const headers = {
      'Content-Type':'application/json',
      'token':token
    }

    setLoading(true);
    try {
      axios.get(url, {headers})
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user)
            setPatientList(response.data.patientList);
          } else {
            setServerError(true);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error while fetching medicine requests", error);
        })
        .finally(() => {
          setSearchEnd(true);
          setLoading(false);
          // console.log(patientList);
        });
    } catch (error) {
      console.error("Error while fetching medicine requests", error);
      setLoading(false);
    }
  };

  // console.log(localStorage.getItem("TakeYourMedicineAuth"));

  useEffect(() => {
    if (localStorage.getItem("TakeYourMedicineAuth")) {
      fetchMedicineRequests(localStorage.getItem("TakeYourMedicineAuth"));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (seaechEnd && user === null) {
      navigate("/login");
    }
  }, [user]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <BeatLoader size={30} color='blue' speedMultiplier={2} />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-wrap mx-auto max-sm:w-11/12 max-md:w-5/6 md:w-2/3 gap-2 md:gap-4 justify-center'>
        {patientList.length > 0 && patientList?.map(({patient, caretaker, medicineNames, from, to, frequency, times, postedAt, contactNo, whatsAppNo, courseStatus, email, _id, careBy})=>(
          <RequestCard 
            key={postedAt}
            patientName={patient.name}
            patientId={patient.userId}
            caretakerName={caretaker ? caretaker.name : ''}
            caretakerId={caretaker ? caretaker.userId : ''}
            contactNo={contactNo}
            whatsAppNo={whatsAppNo}
            email={email}
            courseStatus={courseStatus}
            medicineNames={medicineNames}
            from={from}
            to={to}
            frequency={frequency}
            times={times}
            postedAt={postedAt}
            requestId={_id}
            careBy={careBy}
            taken={true}
            caretaker={true}
          />
        ))}
      </div>
    </div>
  )
}