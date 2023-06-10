import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login.component';
import MyCollection from './components/myCollection.component'
import Navbar from './components/navbar.component';
import Gamelist from './components/game-list.component';
import SignUp from './components/signUp.component';
import SearchBar from './components/searchBar.component';
import Logout from './components/logout.component';

function setToken(userToken) {
  sessionStorage.setItem('accessToken', JSON.stringify(userToken))
}

function getToken() {
  var tokenString = sessionStorage.getItem('accessToken');
  tokenString = JSON.parse(tokenString)
  return tokenString
}
export default function App() {
  const token = getToken();
  // if(token == "null"){
  //   token["message"] = "nothing";
  // }
  // if (!token) {

  //   return (
  //     <>
  //       <Gamelist />
  //       <Navbar />
  //       <Login setToken={setToken}/>
  //     </>
  //   )
  // }
  //islogged={token.message == "connected" ? true : false }
  console.log(token);
  return (
      <Router>
        <div>
          <Navbar  />
          <Routes>
            <Route path='/Signin' element={<Login setToken={setToken} />} />
            <Route path='/Collection' element={<MyCollection />} />
            {/* <Route path='/' element={<SearchBar />} /> */}
            <Route path='/Home' element={<Gamelist />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route path='/Logout' element={<Logout />} />
          </Routes>
        </div>
        {/* <Routes>
          <>
            <Route path='/Signin' element={<Login setToken={setToken} />} />
            <Route path='/Collection' element={<MyCollection />} />
            <Route path='/' element={<SearchBar />} />
            <Route path='/Home' element={<Gamelist />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route path='/Logout' element={<Logout />} />
          </>
        </Routes> */}
      </Router>
  );
}
// export default App;
