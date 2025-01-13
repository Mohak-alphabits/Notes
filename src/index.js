<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
=======
const express = require("express");
const userRoutes = require("../Routes/userRoutes");
const connectMongoose = require("../database/dbConnect")
const cors = require("cors");
const cookieParser = require("cookie-parser");

require('dotenv').config()
connectMongoose()
const app = express();
app.use(cookieParser());
const port = 5000;

app.use(express.json());
  app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log('Server running');
});
>>>>>>> 8540135 (Commit untracked files before pulling)
