import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CredentialsContext } from "../App";
import Todos from "../components/todo";

export default function Home() {
  const [credents, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div className="home-container">
      {credents && <button style={{backgroundColor:'red'}} onClick={logout}>Logout!</button>}
      <h2 style={{marginTop:'15px', marginBottom:'10px'}}>TickTick-Lite</h2>
      
      <p style={{color:'pink',marginTop:'15px', marginBottom:'10px'}}>By Farazuddin Mohammed <br /> X, IG, GitHub:(@thefarazxr)</p>
      <p style={{ color:'yellow',marginTop:'15px', marginBottom:'10px'}}>Tech stack: MERN <br /> (MongoDB Atlas, ExpressJS, ReactJS, NodeJS)</p>
      <h3 style={{marginTop:'15px', marginBottom:'10px'}}>Hello, {credents && credents.username}</h3>
     
      {!credents && <Link to="/register">Register</Link>}
      <br />
      {!credents && <Link to="/login">Login</Link>}
      {credents && <Todos />}
    </div>
  );
}