import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const API_BASE_URL ="https://eventmanagement-mmpi.onrender.com/api" ||"http://localhost:8000/api";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        toast.error("Event not found!");
        setError("Event not found");
        setLoading(false);
      });
  }, [id]);

  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = user.token;
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event deleted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Event deletion failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete event.");
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-80 mt-1 mb-5">
      <div className="card shadow-lg p-4" style={{ width: "600px" }}>
        <h2 className="text-center">{event.name}</h2>

        <div className="d-flex justify-content-center">
          <img
            src={
              event.imageUrl ||
              "https://via.placeholder.com/400x250?text=No+Image"
            }
            alt={event.name}
            className="img-fluid mb-4 rounded"
            style={{ width: "50%", objectFit: "cover" }}
          />
        </div>

        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>

        <p>
          <strong>Created by:</strong>{" "}
          {event.createdBy ? event.createdBy.name : "Unknown"}
        </p>

        <h4>Attendees ({event.attendees?.length || 0})</h4>
        <ul className="list-group">
          {event.attendees && event.attendees.length > 0 ? (
            event.attendees.map((attendee, index) => (
              <li key={index} className="list-group-item">
                {attendee?.name || "Anonymous User"}
              </li>
            ))
          ) : (
            <p className="text-muted">No attendees yet</p>
          )}
        </ul>

        {user?.userId === event?.createdBy?._id && (
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/edit-event/${id}`)}
            >
              Edit Event
            </button>
            <button className="btn btn-danger" onClick={handleDeleteEvent}>
              Delete Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
