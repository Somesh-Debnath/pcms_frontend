import axios from "axios";

const BILL_API_URL = import.meta.env.VITE_APP_BILL_API_URL || "";

export const calculateAndStoreBill = async (userPlanId: number | undefined, from: string, to: string) => {
  try {
    const response = await axios.post(`${BILL_API_URL}/calculate`, {
      userPlanId,
      from,
      to,
    });
    return response.data;
  } catch (error) {
    console.error("Error calculating and storing bill:", error);
    throw error;
  }
};

export const getCumulativeBill = async (userId: number) => {
  try {
    const response = await axios.get(`${BILL_API_URL}/cumulative/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cumulative bill:", error);
    throw error;
  }
};