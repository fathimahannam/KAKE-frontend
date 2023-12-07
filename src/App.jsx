import React from 'react';
import Login from './components/Login';
import Register from './components/Signup';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Baker from './components/Baker/BakerRegister'
import Baker from './routers/Baker'
import Signup1 from './pages/signup'
import Activate1 from './pages/activate'
import User from './routers/user'
// import UserHome from './components/home'
import jwtDecode from 'jwt-decode';
import { getLocal } from './actions/auth';
import { Navigate } from 'react-router-dom';
import Admin from './routers/admin'
import UserManagement from './components/admin/UserManagement';
import Baker_landingpage from './components/Baker/Baker_landingpage';
import Profile from './components/Baker/profile';
import Wishlist from './components/user/WishlistItem';
import CakeDetails from './components/Baker/CakeDetails';
import ProductDetailsPage from './components/user/ProductDetailsPage';
import Bakerz from './components/user/Bakerprofiles'
import CakeDetail from './components/user/CakeDetail';
import AdminLogin from './components/admin/AdminLogin';
import EditProfile from './components/Baker/EditProfile';
import Checkout from './components/user/Checkout';
import Bakerchat from './components/Baker/baker-chat'
import BakerOrderListPage from './components/Baker/BakerOrderListPage';
function App() {
  const token = getLocal('authtoken')
  if(token){
    const decoded = jwtDecode(token)

  }else{
    
  }

  return (
    <div>
      <Router>
      
        <Routes>
          
          <Route path='/*' element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup1/>} />
          <Route path="/activate" element={<Activate1 />} />
          
         <Route path="/admin/*" element={<Admin />} />
         <Route path="/baker/*" element={<Baker />} />
         <Route path="/bakerhome" element={<Baker_landingpage />} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/cakedetail" element={<CakeDetail/>} />
         <Route path="/CakeDetails" element={<CakeDetails/>} />
         <Route path="/productdetails" element={<ProductDetailsPage/>} />
         <Route path="/wishlist" element={<Wishlist/>} />
         <Route path="/cakedetail" element={<CakeDetail />} />
         <Route path="/bakerprofiles/:userId" element={<Bakerz/>} />
         <Route path="/adminlogin" element={<AdminLogin/>} />
         <Route path="/editprofile" element={<EditProfile/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/baker-chat" element={<Bakerchat/>} />
         <Route path="/order-details" element={<BakerOrderListPage/>} />
          {/* <Route path="/users" element={<UserManagement />} /> */}
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;

 