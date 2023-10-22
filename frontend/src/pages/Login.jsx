import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
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
    <div>
      <h1 style={{marginTop:'15px', marginBottom:'10px', color:'white'}} >Login</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
        <input style={{ marginBottom:'10px', padding:'8px'}}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}