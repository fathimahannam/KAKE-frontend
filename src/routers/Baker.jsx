import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

function Baker() {
  return (
    <div>
      <Routes>
          
         
         
     
          <Route path="/" element={< BakerProfile/>} />

          </Routes>
          
    </div>
  )
}

export default Baker
