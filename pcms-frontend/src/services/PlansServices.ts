import axios from "axios";
import { UserPlan, Plan } from "@/interfaces/interfaces";

const USER_PLAN_API_URL = import.meta.env.VITE_APP_USER_PLAN_API_URL;
const PLAN_API_URL = import.meta.env.VITE_APP_PLANS_API_URL || "";

export const getAllPlans = async (): Promise<Plan[]> => {
    try {
        const response = await axios.get<Plan[]>(`${PLAN_API_URL}/getAllPlans`);
        return response.data;
    } catch (error) {
        console.error("Error fetching plans:", error);
        throw error;
    }
}

export const assignPlanToUser = async (userPlan: UserPlan): Promise<UserPlan> => {
  try {
    console.log('payload', userPlan);
    const response = await axios.post<UserPlan>(`${USER_PLAN_API_URL}/assign`, 
      userPlan
    );
    console.log('responseassign', response);
    return response.data;
  } catch (error) {
    console.error('Error assigning plan to user:', error);
    throw error;
  }
};

export const getUserPlans = async (): Promise<UserPlan[]> => {
  try {
    const response = await axios.get<UserPlan[]>(`${USER_PLAN_API_URL}/findAll`);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user plans:', error);
    throw error;
  }
};

export const updateUserPlanStatus = async (id: number | undefined, status: string) => {
  try {
    const response = await axios.put(`${USER_PLAN_API_URL}/update-status/${id}`, {status});
    return response.data;
  } catch (error) {
    console.error('Error updating user plan status:', error);
    throw error;
  }
};

export const createPlan = async (plan: Plan) : Promise<Plan> => {
  try {
    const { planId, ...payload } = plan;
    const response = await axios.post(`${PLAN_API_URL}/create`, payload);
    return response.data as Plan;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

export const updatePlan = async ( plan:Plan) : Promise<Plan> => {
  try {
    const { planId, ...payload } = plan;
    const response = await axios.put(`${PLAN_API_URL}/update/${planId}`, 
      payload
    );
    return response.data as Plan;
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
};

// export const getPlansByLocation = async (location: string) => {
//   try {
//     const response = await axios.get(`${PLAN_API_URL}/location/${location}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching plans by location:', error);
//     throw error;
//   }
// };

export const deletePlan = async (id: number | undefined) => {
  try {
    const response = await axios.put(`${PLAN_API_URL}/deletePlan/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting plan:', error);
    throw error;
  }
};

export const deleteUserPlan = async (id: number | undefined) => {
  try {
    const response = await axios.put(`${USER_PLAN_API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user plan:', error);
    throw error;
  }
};


