import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/user/Login';
import SignUp from './Pages/user/SignUp';
import Home from './Pages/user/Home';
import Forgot from './Pages/user/Forgot';
import NewPass from './Pages/user/NewPass';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/user/Profile';
import Like from './Pages/user/Liked';
import Admin from './Pages/admin/adminLogin'
import AdminHome from './Pages/admin/adminDashboard'
import AdminUsers from './Pages/admin/adminUsers';
import UserProfiles from './Pages/user/UserProfiles';
import Matches from 'Pages/user/Match';
import ChatPage from 'Pages/user/Chat';
import Plans from 'Pages/user/Plans';
import ProfileDet from 'Pages/user/profileDet';
import AdminPremium from 'Pages/admin/adminPremium';
import NotFoundTitle from 'Components/common/error';
import VerifyNumber from 'Pages/user/verifyNumber';
import VerifyOtp from 'Pages/user/verifyOtp';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>

    {/* User side */}
    <Route path='/' element={<Home/>}></Route>
    <Route path='/signUp' element={<SignUp/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/verifyNumber' element={<VerifyNumber/>}></Route>
    <Route path='/verifyOtp/:phonenumber' element={<VerifyOtp/>}></Route>
    <Route path='/forgot' element={<Forgot/>}></Route>
    <Route path="/password-reset/:userId/:token" Component={NewPass} />

    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/profileDet/:id' element={<ProfileDet/>}></Route>
    <Route path='/liked' element={<Like/>}></Route>
    <Route path='/matches' element={<Matches/>}></Route>
    <Route path='/userProfile' element={<UserProfiles/>}></Route>
    <Route path='/chat' element={<ChatPage/>}></Route>
    <Route path='/plans' element={<Plans/>}></Route>

    {/* Admin side  */}
    <Route path="/admin" element={<Admin/>} />
    <Route path="/adminHome" element={<AdminHome/>} />
    <Route path="/users" element={<AdminUsers/>} />
    <Route path="/adminPremium" element={<AdminPremium/>} />
    <Route path='*' element={<NotFoundTitle/>} />

   </Routes>
   </BrowserRouter>
   <ToastContainer theme='dark' autoClose={3000}/>
   </>
  );
}

export default App;
