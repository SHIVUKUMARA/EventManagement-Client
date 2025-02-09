import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const API_BASE_URL =
    "https://eventmanagement-mmpi.onrender.com/api" || "http://localhost:8000/api";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events/${id}`)
      .then((response) => {
        const event = response.data;
        setName(event.name);
        setDescription(event.description);
        setDate(event.date.split("T")[0]);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        toast.error("Failed to fetch event details.");
      });
  }, [id]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const eventData = { name, description, date };

    if (!user || !user.token) {
      toast.warning("You must be logged in to edit an event.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/events/${id}`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Event updated successfully!");
      setTimeout(() => navigate(`/event/${id}`), 2000);
    } catch (error) {
      console.error("Event update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update event.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Event</h2>
      <form onSubmit={handleUpdateEvent}>
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
        <button type="submit" className="btn btn-success">
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
