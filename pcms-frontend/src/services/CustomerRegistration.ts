import axios from "axios";
import { FormData } from "../pages/RegistrationForm";

const REGISTER_API_URL = import.meta.env.REACT_APP_REGISTRATION_API_URL || "";

export const registerCustomer = async (formData: FormData) => {
  try {
    const response = await axios.post(REGISTER_API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error;
  }
};