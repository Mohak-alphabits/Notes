import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the toast CSS is imported

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const UserData = {
      identifier,
      password,
    };
    console.log("userdata", UserData);

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(UserData),
    })
      .then((Response) => {
        if (Response.ok) {
          return Response.json();
        } else {
          throw new Error("login failed");
        }
      })
      .then((data) => {
        console.log("login successful");
        toast.success("Login successful!"); 
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.error("error logging in", error);
        toast.error("Login failed! Please check your credentials.");
      });

    setIdentifier('');
    setPassword('');
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleLogin}>
        <h1>LOGIN</h1>
        <label htmlFor="identifier">Email/Username:</label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          placeholder="Enter your email or username"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
        />
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      <p>
        Not registered? <Link to={"/"}>Register now</Link>
      </p>
    </div>
  );
};

export default Login;

