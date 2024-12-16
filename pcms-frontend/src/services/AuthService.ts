import axios from "axios";

const AUTH_API_URL = import.meta.env.VITE_APP_AUTH_API_URL || "";

export const loginApi = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
      console.log("Response from loginApi:", response);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };