import axios from "axios";

const API_BASE_URL =
  "https://eventmanagement-mmpi.onrender.com/api" || "http://localhost:8000/api";

export const getChatMessages = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chat messages:",
      error.response?.data?.message || error.message
    );
    return [];
  }
};
