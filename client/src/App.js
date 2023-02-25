import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

import Recovery from './components/Recovery'
import Password from './components/Password'
import Username from './components/Username'
import Register from './components/Register'
import Reset from './components/Reset'
import PageNotFound from './components/PageNotFound'
import Profile from './components/Profile'

// auth middleware
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

export const App = () => {
  return (
//     <h1 className="text-3xl font-bold underline">
//     Hello world!
//   </h1>
   <Router>
    <Routes>
        <Route exact path="/register" element={<Register/>}   />
        <Route exact path="/username" element={<Username/>}   />
        <Route exact path="/password" element={ < ProtectRoute><Password/> </ProtectRoute>}   />
        <Route exact path="/" element={<AuthorizeUser><Profile/></AuthorizeUser>}   />
        <Route exact path="/recovery" element={<Recovery/>}   />
        <Route exact path="/reset" element={<Reset/>}   />
        <Route exact path="/pagenotfound" element={<PageNotFound/>}   />
    </Routes>
   </Router>

  )
}
