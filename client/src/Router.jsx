import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "./App.jsx"
import CreateAccount from './components/SignUp.jsx'
import Logindia from './components/Logindia.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminCreate from './components/AdminCreate.jsx'
import UserProfile from './components/UserProfile.jsx'
import { AuthProvider}  from './Authroute/AuthContext.jsx'
// import ProtectedRoute from './Authroute/ProtectedRoute.jsx'
import {SocketContextProvider} from "./Authroute/SocketContext.jsx"
import SessionExpired from './components/SessionExpired.jsx'
import SkillsMatching from './components/SkillsMatching.jsx'
import Dashboard from './pages/Dashbard.jsx'
import MessageContainer from "./components/MessageContainer.jsx"
const Routing = () => {
  return <AuthProvider>
    <SocketContextProvider>
   < Router>
  <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/CreateAccount' element={<CreateAccount/>} />
    <Route path='/AdminLogin' element={<AdminLogin/>} />
    <Route path='/AdminRegister' element={<AdminCreate/>} />
    <Route path='/login' element={<Logindia value={true}/>} />
    <Route path='/session' element={<SessionExpired />} />
    <Route path='/userProfile/:userId' element={<UserProfile/>} />
   <Route path='/skills' element={ <SkillsMatching/>} />
   <Route path='/dashboard/:userId' element={ <Dashboard/>} />
   <Route path='/conversation/:participant1/:participant2' element={ <MessageContainer/>} />
   </Routes>
</Router>
</SocketContextProvider>
  </AuthProvider>
}

export default Routing
