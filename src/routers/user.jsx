import React, { useEffect } from 'react'
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
import CakeDetail from '../components/user/CakeDetail';
import ProductDetailsPage from '../components/user/ProductDetailsPage'
import Wishlist from '../components/user/WishlistItem';
import Bakerz from '../components/user/Bakerprofiles';
import Signup1 from '../components/Signup'

Wishlist
function User() {
  const token = getLocal('authToken');
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.is_premium) {
        setPremium(true);
      }
    }
  }, [token]);

  return (
    <div>
      <Routes>
          
          <Route path="/" element={ (token!==null)? <LandingPage /> : <Login />} />
          <Route path="/login" element={token ?  <LandingPage /> : <Login />} />
          <Route path="/signup" element={token ?  <LandingPage /> : <Signup1/>} /> 
          {/* <Route path="/activate" element={<Activate1 />} /> */}
         
          <Route path="/home" element={ <LandingPage/>}/>
          <Route path="/baker-register" element={  <BakerApplication /> }/>
          <Route path="/cakedetail" element={<CakeDetail/>} />
          <Route path="/productdetails" element={<ProductDetailsPage/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/cakedetail" element={<CakeDetail />} />
          <Route path="/bakerprofiles/:userId" element={<Bakerz/>} />
          <Route path="/checkout" element={<Checkout/>} />



          <Route path="/checkout/:id" element={  <Checkout/>}/>
          <Route path="/success" element={<SuccessPage/> }/>
          <Route path="/ordelist" element={  <OrderListPage/> }/>
          <Route path="/chat" element={ <Chat/> }/>

          
          
             
          </Routes>
          
    </div>
  )
}

export default User
