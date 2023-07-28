import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Forgot from './Pages/Forgot';
import NewPass from './Pages/NewPass';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/Profile';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/signUp' element={<SignUp/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/forgot' element={<Forgot/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path="/password-reset/:userId/:token" Component={NewPass} />
   </Routes>
   </BrowserRouter>
   <ToastContainer theme='dark' autoClose={3000}/>
   </>
  );
}

export default App;
