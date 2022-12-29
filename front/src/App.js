import logo from './logo.svg';
import './App.css';
import React, {Component, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login.component';
import MyCollection from './components/myCollection.component'
import Navbar from './components/navbar.component';
import Gamelist from './components/game-list.component';
import SignUp from './components/signUp.component';

function setToken(userToken){
  sessionStorage.getItem('accessToken', JSON.stringify(userToken))
}

function getToken(){
  const tokenString = sessionStorage.getItem('accessToken');
  const userToken = JSON.stringify(tokenString);
  return userToken?.accessToken
}
export default function App() {
  const token = getToken();
    // if(!token){
      
    //   return <Login setToken={setToken} />
    // }
    return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/Signin' element={<Login setToken={setToken} />}/>      
        <Route path='/Collection' element={<MyCollection /> }/>      
        <Route path='/Home' element={<Gamelist /> }/>      
        <Route path='/Signup' element={<SignUp /> }/>      
      </Routes>
    </Router>
    </>
    );
}
// export default App;
