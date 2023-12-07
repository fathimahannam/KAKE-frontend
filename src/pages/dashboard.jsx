import React from 'react'
import AdminPanel from '../components/admin/AdminPanel'
import Dashboard from '../components/admin/Dashboard'

function dashboard() {
  return (
    <div className='flex'>
      <AdminPanel/>
      <Dashboard/>
    </div>
  )
}

export default dashboard



