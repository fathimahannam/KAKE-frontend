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
import LandingPage from './components/LandingPage';

function App() {
  const token = getLocal('authtoken')
  if(token){
    const decoded = jwtDecode(token)

  }else{
    
  }
  console.log(token,  "tttttttttttttttttttt");

  return (
    <div>
      <Router>
      
        <Routes>
          
          <Route path='/*' element={<User/>} />

          
         <Route path="/admin/*" element={<Admin />} />
         <Route path="/baker/*" element={<Baker />} />
         {/* <Route path="/activate" element={<Activate1 />} /> */}

          {/* <Route path="/users" element={<UserManagement />} /> */}
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;

 