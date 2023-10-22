import React, { useState } from 'react'
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";


export const CredentialsContext = React.createContext();


function App() {
    const credentialsState=useState(null);
  return (
    <>
      <div className="App">
        <CredentialsContext.Provider value={credentialsState}>
          <Router>
            <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />} />
            </Routes>
          </Router>
          </CredentialsContext.Provider>
      </div>
    </>
  )
}

export default App
