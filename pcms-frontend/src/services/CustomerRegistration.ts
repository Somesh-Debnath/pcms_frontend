import axios from "axios";
import { FormData } from "../pages/RegistrationForm";
import { User } from "@/context/AuthContext";

const USER_API_URL = import.meta.env.VITE_APP_USER_API_URL || "";

export const registerCustomer = async (formData: FormData) => {
  try {
    const response = await axios.post(`${USER_API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error;
  }
};

export const getRegistrations = async () => {
  try {
    const response = await axios.get(`${USER_API_URL}/getAllUsers`);
    const unapprovedRegistrations = response.data.filter((registration: any) => registration.status === null);
    return unapprovedRegistrations;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

export const approveRegistration = async (id: number | undefined) => {
  try {
    const response = await axios.put(`${USER_API_URL}/update/${id}`, { status: 'APPROVE' });
    return response.data;
  } catch (error) {
    console.error("Error approving registration:", error);
    throw error;
  }
}

export const rejectRegistration = async (id: number| undefined) => {
  try {
    const response = await axios.put(`${USER_API_URL}/rejectUser/${id}`, { status: 'REJECT' });
    return response.data;
  } catch (error) {
    console.error("Error rejecting registration:", error);
    throw error;
  }
}

export const getUserByEmail = async (email: string) : Promise<User> => {
  try {
    const response = await axios.get<User>(`${USER_API_URL}/getUser/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}
