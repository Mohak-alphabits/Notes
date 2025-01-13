import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './pages/dashboard';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />

        <nav>
              <Link to="/"></Link>           
        </nav>
        <Routes>
          <Route path='/' element = {<Register/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element = {<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
