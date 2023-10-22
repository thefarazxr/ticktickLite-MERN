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
      <h3 style={{marginTop:'45px', marginBottom:'5px'}}>TickTick-Lite</h3>
      
      <h4 style={{ marginBottom:'5px'}}>Hello, {credents && credents.username}</h4>
     
      {!credents && <Link to="/register">Register</Link>}
      <br />
      {!credents && <Link to="/login">Login</Link>}
      {credents && <Todos />}
      {credents && <button style={{backgroundColor:'red', marginTop:'10px'}} onClick={logout}>Logout!</button>}

      <p style={{fontSize:'16px',color:'pink',marginTop:'15px', marginBottom:'10px'}}>By Farazuddin Mohammed <br /> X, IG, GitHub:(@thefarazxr)</p>
      <p style={{ fontSize:'16px',color:'yellow',marginTop:'15px', marginBottom:'10px'}}>Tech stack: MERN <br /> (MongoDB Atlas, ExpressJS, ReactJS, NodeJS)</p>
    </div>
  );
}