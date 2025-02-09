import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io(
  "https://eventmanagement-mmpi.onrender.com" || "http://localhost:8000",
  {
    transports: ["websocket", "polling"],
    withCredentials: true,
  }
);

function Chat() {
  const { eventId } = useParams();
  const storedUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("guest"));
  const userName = storedUser?.name || "Guest";
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", eventId);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [eventId]);

const sendMessage = () => {
  if (!newMessage.trim()) return;

  const messageData = {
    eventId,
    user: userName,
    message: newMessage,
  };

  socket.emit("sendMessage", messageData);
  setNewMessage("");
};


  return (
    <div className="container">
      <h2 className="text-center">Event Chat</h2>
      <div className="card shadow-lg p-3 mb-2">
        <div
          className="chat-box d-flex flex-column"
          style={{ height: "400px", overflowY: "auto" }}
        >
          {messages.length === 0 ? (
            <p className="text-center text-muted">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex ${
                  msg.user === userName ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className="p-2"
                  style={{
                    maxWidth: "60%",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "5px",
                    backgroundColor: msg.user === userName ? "#007bff" : "#e0e0e0",
                    color: msg.user === userName ? "white" : "black",
                    textAlign: msg.user === userName ? "right" : "left",
                  }}
                >
                  <strong>{msg.user === userName ? "Me" : msg.user}</strong>:{" "}
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
