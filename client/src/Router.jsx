import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "./App.jsx"
import CreateAccount from './pages/SignUp.jsx'
import Logindia from './pages/Login.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminCreate from './pages/AdminCreate.jsx'
import UserProfile from './components/Users/UserProfile.jsx'
import { AuthProvider}  from './Authroute/AuthContext.jsx'
import {SocketContextProvider} from "./Authroute/SocketContext.jsx"
import SessionExpired from './components/Users/SessionExpired.jsx'
import SkillsMatching from './components/Users/SkillsMatching.jsx'
import Dashboard from './pages/Dashbard.jsx'
import MessageContainer from "./components/Users/MessageContainer.jsx"
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import Contact from './components/Home/Contact.jsx'

const Routing = () => {
  return <AuthProvider>
    <SocketContextProvider>
   < Router>
  <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/CreateAccount' element={<CreateAccount/>} />
    <Route path='/AdminLogin' element={<AdminLogin/>} />
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/adminDashboard' element={<AdminDashboard/>} />

    <Route path='/AdminRegister' element={<AdminCreate/>} />
    <Route path='/login' element={<Logindia value={true}/>} />
    <Route path='/session' element={<SessionExpired />} />
    <Route path='/userProfile/:userId' element={<UserProfile/>} />
   <Route path='/skills' element={ <SkillsMatching/>} />
   <Route path='/dashboard/:userId' element={ <Dashboard/>} />
   <Route path='/conversation/:participant1/:participant2' element={ <MessageContainer/>}/>
   </Routes>
</Router>
</SocketContextProvider>
  </AuthProvider>
}

export default Routing
