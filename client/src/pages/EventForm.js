import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL =
    "https://eventmanagement-mmpi.onrender.com/api" || "http://localhost:8000/api";

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("date", date);
    if (image) formData.append("image", image);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      toast.warn("You must be logged in to create an event.");
      navigate("/login");
      return;
    }

    const token = user.token;

    try {
      await axios.post(`${API_BASE_URL}/events`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Event creation failed:", error);
      toast.error(error.response?.data?.message || "Failed to create event.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center">Create Event</h2>
        <form onSubmit={handleCreateEvent}>
          <div className="mb-3">
            <label>Event Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Date:</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Image:</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
