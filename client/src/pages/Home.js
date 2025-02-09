import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [joiningEventId, setJoiningEventId] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const API_BASE_URL =
    "https://eventmanagement-mmpi.onrender.com/api" || "http://localhost:8000/api";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleJoinEvent = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      alert("You must be logged in to join an event.");
      navigate("/login");
      return;
    }

    const token = user.token;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/events/join/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, attendees: response.data.event.attendees }
            : event
        )
      );

      alert(response.data.message || "Joined event successfully!");
      navigate(`/chat/${eventId}`);
    } catch (error) {
      console.error(
        "Error joining event:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to join event.");
    }
  };

  const handleJoinAsGuest = (eventId) => {
    let guestName = prompt("Enter your name to join as a guest:");

    if (!guestName || guestName.trim() === "") {
      alert("Name is required to join as a guest.");
      return;
    }

    localStorage.setItem("guest", JSON.stringify({ name: guestName }));

    alert(`Joined as ${guestName}`);
    navigate(`/chat/${eventId}`, { state: { username: guestName } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Upcoming Events</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={
                  event.imageUrl ||
                  "https://via.placeholder.com/400x250?text=No+Image+Available"
                }
                className="card-img-top"
                alt={event.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text flex-grow-1">{event.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/event/${event._id}`}
                    className="btn btn-primary me-2"
                  >
                    View Details
                  </Link>

                  {user.userId ? (
                    !event.attendees.some(
                      (att) => att?._id === user.userId
                    ) && (
                      <button
                        className="btn btn-success"
                        onClick={() => handleJoinEvent(event._id)}
                        disabled={joiningEventId === event._id}
                      >
                        {joiningEventId === event._id
                          ? "Joining..."
                          : "Join Event"}
                      </button>
                    )
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleJoinAsGuest(event._id)}
                    >
                      Join as Guest
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
