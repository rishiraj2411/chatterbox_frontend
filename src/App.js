import React from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/global/layout/Layout";
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import LoginAccessOtp from './pages/auth/LoginAccessOtp';
import AccountVerify from './pages/auth/AccountVerify';
import Profile from './pages/profile/Profile';
import ChangePassword from './pages/changePassword/ChangePassword';
import UserList from './pages/userList/UserList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/reducer/authSlice";
import {
  fetchChats
} from "./redux/reducer/chatSlice";
import ChatPage from './pages/chat/Chat';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
      dispatch(fetchChats());
    }
  }, [dispatch, user, isLoggedIn]);
  
  return (
    <Router>
      <ToastContainer />
      <Routes>

        <Route exact path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgotPassword" element={ <ForgotPassword/>} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/loginWithCode/:email" element={<LoginAccessOtp />} />
        <Route path="/verify/:verificationToken" element={<Layout><AccountVerify /></Layout>}/>
        <Route path="/profile" element={<Layout><Profile /></Layout>}/>
        <Route path="/changePassword" element={<Layout><ChangePassword /></Layout>}/>
        <Route path="/users" element={<Layout><UserList /></Layout>}/>
        <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
