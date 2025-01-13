import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const [note_title, setNote_title] = useState('');
  const [note, setNote] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include", 
      });

      if (response.ok) {
        console.log("User logged out successfully");
        navigate("/login"); 
        toast("Logout successful");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="note" > 
    <container>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout} className="logout-button"> Logout </button>
      <h4> Create note </h4>
      <input 
        type="text"
        id="note_title"
        name="note_title"
        value={note_title}
        onChange={(e) => setNote_title(e.target.value)}
        placeholder="Enter your note title"
      ></input><br />
      <br />
      <input
        type="text"
        id="note" 
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note"
      ></input>
      </container>
    </div>
  );
}

export default Dashboard;
