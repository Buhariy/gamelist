import logo from './logo.svg';
import './App.css';
import React, { Component, useState,useEffect } from 'react';
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

  useEffect(() => {
    const token = getToken();
    if (token && token.message === "connected") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);
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
  const [isLogged,setIsLogged] = useState(false);
  const handleLogout = () => {
    setIsLogged(false);
  }
  return (
      <Router>
        <div>
          <Navbar isLogged={isLogged} />
          <Routes>
            <Route path='/Signin' element={<Login setToken={setToken} />} />
            <Route path='/Collection' element={<MyCollection />} />
            {/* <Route path='/' element={<SearchBar />} /> */}
            <Route path='/Home' element={<Gamelist />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route path='/Logout' element={<Logout onLogout={handleLogout}/>} />
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
