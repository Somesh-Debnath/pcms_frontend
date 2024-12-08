import axios from "axios";
import { Plan } from "@/pages/PlansPage";

const PLANS_API_URL = import.meta.env.VITE_APP_PLANS_API_URL || "";

export const addPlan = async (plan: Plan): Promise<Plan> => {
    try {
        const { planId, ...payload } = plan;
        const response = await axios.post(`${PLANS_API_URL}/addPlan`, payload);
        return response.data as Plan;
    } catch (error) {
        console.error("Error adding plan:", error);
        throw error;
    }
};

export const getAllPlans = async (): Promise<Plan[]> => {
    try {
        const response = await axios.get<Plan[]>(`${PLANS_API_URL}/getAllPlans`);
        return response.data;
    } catch (error) {
        console.error("Error fetching plans:", error);
        throw error;
    }
}

export const deletePlan = async (id: number) => {
    try {
        const response = await axios.delete(`${PLANS_API_URL}/deletePlan/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting plan:", error);
        throw error;
    }
}

export const updatePlan = async (plan: Plan, id: number) => {
    try {
        const response = await axios.put(`${PLANS_API_URL}/updatePlan/${id}`, plan);
        return response.data;
    } catch (error) {
        console.error("Error updating plan:", error);
        throw error;
    }
}