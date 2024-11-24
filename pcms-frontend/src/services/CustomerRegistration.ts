import axios from "axios";
import { FormData} from "../pages/RegistrationForm";

const API_URL = "http://localhost:8080/api/registration";

export const registerCustomer = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error;
  }
};