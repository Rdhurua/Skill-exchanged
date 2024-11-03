import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "./App.jsx"
import CreateAccount from './components/SignUp.jsx'
import Logindia from './components/Logindia.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminCreate from './components/AdminCreate.jsx'

const Routing = () => {
  return < Router>
  <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/CreateAccount' element={<CreateAccount/>} />
    <Route path='/AdminLogin' element={<AdminLogin/>} />
    <Route path='/AdminRegister' element={<AdminCreate/>} />

  </Routes>
</Router>
}

export default Routing
