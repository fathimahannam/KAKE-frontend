import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Baker_landingpage from '../components/Baker/Baker_landingpage';
import Profile from '../components/Baker/profile';
import CakeDetails from '../components/Baker/CakeDetails';
import EditProfile from '../components/Baker/EditProfile';
import Bakerchat from '../components/Baker/baker-chat'
import BakerOrderListPage from '../components/Baker/BakerOrderListPage';
import { getLocal } from '../actions/auth';
import jwtDecode from 'jwt-decode';
import Bakerprofiles from '../components/user/Bakerprofiles';



function Baker() {
const token = getLocal('authtoken')

  return (
    <div>
      <Routes>
     
          <Route path="/bakerhome" element={< Bakerprofiles/>} />
          <Route path="/" element={ <Baker_landingpage /> }/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/CakeDetails" element={<CakeDetails/>} />
          <Route path="/editprofile" element={<EditProfile/>} />
          <Route path="/baker-chat" element={<Bakerchat/>} />
          <Route path="/order-details" element={<BakerOrderListPage/>} />


          </Routes>
          
    </div>
  )
}

export default Baker
