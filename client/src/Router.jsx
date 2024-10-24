import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 import App from "./App.jsx"
 import CreateAccount from './components/SignUp.jsx'
const Routing = () => {
  return < Router>
  <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/CreateAccount' element={<CreateAccount/>} />


  </Routes>
</Router>
}

export default Routing
