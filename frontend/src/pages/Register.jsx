import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App"; //manages user credentials securely within the React Application
import { handleErrors } from "./Login";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    fetch(`https://ticktick-lite-mern-api2.vercel.app/register`, { //expressJS server communicates through this port
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        // history.push("/");
        navigateTo('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const navigateTo = useNavigate();

  return (
    <div className="reg-container">
      <h1 style={{marginTop:'15px', marginBottom:'10px', color:'white'}}>Register</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={register}>
        <input style={{marginTop:'15px', marginBottom:'10px', padding:'8px'}}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <br />
        <input style={{ marginBottom:'10px', padding:'8px'}}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />
        <button style={{ marginTop:'10px', padding:'8px'}} type="submit">Register</button>
      </form>
    </div>
  );
}