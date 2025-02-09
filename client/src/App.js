import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventForm from "./pages/EventForm";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mt-4" style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-event"
            element={user ? <EventForm /> : <Navigate to="/login" />}
          />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/chat/:eventId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
