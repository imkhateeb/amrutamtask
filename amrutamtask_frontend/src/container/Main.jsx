import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ScheduleMedicine from '../components/user/ScheduleMedicine';

export default function Main() {
   return (
      <Routes>
         <Route exact path='/*' element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/schedule/:userId/medicine' element={<ScheduleMedicine />}/>
      </Routes>
   )
}
