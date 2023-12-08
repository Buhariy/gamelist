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
import SearchBarResults from './components/SearchBarResults.component';
import Logout from './components/logout.component';
import MyProfil from './components/update-user.component';

function setToken(userToken) {
  sessionStorage.setItem('accessToken', JSON.stringify(userToken))
}

function getToken() {
  var tokenString = sessionStorage.getItem('accessToken');
  tokenString = JSON.parse(tokenString)
  return tokenString
}
export default function App() {
  const [isLogged,setIsLogged] = useState(false);
  const [id,setId] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token && token.message === "connected") {
      setIsLogged(true);
      setId(token.id);
      console.log(token.id)
    } else {
      setIsLogged(false);
    }
  }, []);
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
            <Route path={'/MyProfil/'+id} element={<MyProfil />} /> 
            {/* <Route path='/' element={<SearchBar />} /> */}
            <Route path='/result' element={<SearchBarResults/>} />
            <Route path='/Home' element={<Gamelist />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route path='/Logout' element={<Logout onLogout={handleLogout}/>} />
          </Routes>
        </div>
      </Router>
  );
}
// export default App;
