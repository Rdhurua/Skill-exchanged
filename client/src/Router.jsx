import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "./App.jsx"
import CreateAccount from './components/SignUp.jsx'
import Logindia from './components/Logindia.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminCreate from './components/AdminCreate.jsx'
import UserProfile from './components/UserProfile.jsx'
import { AuthProvider } from './components/Authroute/AuthContext.jsx'
import ProtectedRoute from './components/Authroute/ProtectedRoute.jsx'
import SessionExpired from './components/SessionExpired.jsx'

const Routing = () => {
  return <AuthProvider>
   < Router>
  <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/CreateAccount' element={<CreateAccount/>} />
    <Route path='/AdminLogin' element={<AdminLogin/>} />
    <Route path='/AdminRegister' element={<AdminCreate/>} />
    <Route path='/login' element={<Logindia value={true}/>} />
    <Route path='/session' element={<SessionExpired />} />
    <Route path='/userProfile' 
    element={<ProtectedRoute>
      <UserProfile/>
      </ProtectedRoute>} />
     </Routes>
</Router>
  </AuthProvider>
}

export default Routing
