import logo from './logo.svg';
import './App.css';
import React, {Component, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login.component';
import MyCollection from './components/myCollection.component'
import Navbar from './components/navbar.component';
import Gamelist from './components/game-list.component';
import SignUp from './components/signUp.component';
import SearchBar from './components/searchBar.component';

function setToken(userToken){
  sessionStorage.setItem('accessToken', JSON.stringify(userToken))
}

function getToken(){
  var tokenString = sessionStorage.getItem('accessToken');
  // console.log(tokenString);
  // const userToken = JSON.stringify(tokenString);
  tokenString = JSON.parse(tokenString)
  return tokenString
}
export default function App() {
  const token = getToken();
    // console.log(token);
    if(!token){
      
      // return <Login setToken={setToken} />
      return (
        <>
          <Gamelist />
          {/* <Navbar /> */}
          <Login setToken={setToken}/>
        </>
      )
    }
    // console.log(JSON.stringify(token));
    // console.log((token.id));
    return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/Signin' element={<Login setToken={setToken} />}/>      
        <Route path='/Collection' element={<MyCollection /> }/>      
        <Route path='/' element={<SearchBar />}/>      
        <Route path='/Home' element={<Gamelist /> }/>      
        <Route path='/Signup' element={<SignUp /> }/>      
      </Routes>
    </Router>
    </>
    );
}
// export default App;
