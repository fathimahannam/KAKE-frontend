import React from 'react'
import Adminpanel from '../components/admin/AdminPanel'
import { Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import UserManagement from '../components/admin/UserManagement'
// import BakerManagement from '../components/admin/BakerManagement'
import BakerRequest from '../components/admin/adminrequest'
import Dashboard from '../components/admin/Dashboard'
import Bakers from '../components/admin/BakerManagement'
function Admin() {
  return (
    <div>
      
     
      
        <Routes>
          
         
         
     
          <Route path="/" element={< Adminpanel/>} />
          <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/users" element={<UserManagement />} />
          {/* <Route path ="/bakers" element={<BakerManagement/>} /> */}
          <Route path ="/bakers-request" element={<BakerRequest/>} />
          <Route path ="/bakers" element={<Bakers/>} />
        
           </Routes>
      
    </div>
  )
}

export default Admin
