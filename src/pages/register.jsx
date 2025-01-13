import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (Event) => {
      const {name, value} = Event.target;
      if (name === "email") {
        setEmail(value)
      } else if (name === "username") {
        setUsername(value);
      } else if (name === "password") {
        setPassword (value)
      }
      };

    const validateEmail = (email) => {
      const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        return regex.test(email);
    }
    
    const handlesubmit = async (Event) => {
        Event.preventDefault();
        if (validateEmail (email)) {
            console.log('submitted email');
            console.log('username submitted');
            console.log('password submitted');
            try {
              const response = await fetch("http://localhost:5000/api/users", {
                method: 'POST',
                credentials: "include", 
                 headers : {
                  "Content-Type" : "application/json",
                }, body : JSON.stringify ( {username, email, password})
              });
              if (response.ok) {
                alert ("user registered successfully");
                navigate("/Dashboard");
              } else {
                alert ("user registration failed");
              }
            } catch (error) {
              console.error("error submitting the form", error);
              alert ("error connecting to db");
            }
        } else {
            alert("enter a valid email");
        }
    }
    
    return (
      <div className = " signup-form"> 
    <form onSubmit= { handlesubmit }>
        <h1> REGISTER </h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
        /><br></br>
        <label htmlFor="username"> username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="enter username"
        /><br></br>
        <label htmlFor="password"> password: </label>
        <input 
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="enter password"
        /><br></br>
        <button type="submit">Submit</button><br />
    </form>
    <p> already registered?  
    <Link to={"/Login"}> login now </Link>
    </p>
    </div>
    )
}

export default Register;