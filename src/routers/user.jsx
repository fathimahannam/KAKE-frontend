import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import BakerApplication from '../components/Baker/BakerRegister'
import Login from '../components/Login';
import jwtDecode from 'jwt-decode'
import { getLocal } from '../actions/auth'
import LandingPage from '../components/LandingPage'
import Baker_landingpage from '../components/Baker/Baker_landingpage';
import Checkout from '../components/user/Checkout'
import SuccessPage from '../components/user/success';
import Chat from '../components/user/chat'
import OrderListPage from '../components/user/OrderListPage';
function Baker() {
    const token = getLocal('authtoken')

    if(token){
      const decoded = jwtDecode(token)
  
    }else{
      
    }
    console.log(token);
  return (
    <div>
      <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/bakerhome" element={ (token!==null)? <Baker_landingpage /> : <Login />}/>
          <Route path="/home" element={ (token!==null)? <LandingPage /> : <Login />}/>
          <Route path="/baker-register" element={ (token!==null)? <BakerApplication /> : <Login />}/>
          <Route path="/checkout/:id" element={ (token!==null)? <Checkout/> : <Login />}/>
          <Route path="/success" element={ (token!==null)? <SuccessPage/> : <Login />}/>
          <Route path="/ordelist" element={ (token!==null)? <OrderListPage/> : <Login />}/>
          <Route path="/chat" element={ (token!==null)? <Chat/> : <Login />}/>

          
          
             
          </Routes>
          
    </div>
  )
}

export default Baker
