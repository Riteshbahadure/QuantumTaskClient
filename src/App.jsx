import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
// import UserRegister from './pages/userRegister'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
// import Test from './pages/Test'

const App = () => {
  return <>
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        {/* <Route path='/test' element={<Test />} /> */}
        <Route path='/' element={<UserRegister />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>

  </>
}

export default App