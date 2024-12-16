export interface Plan {
  planId?: number;
  location: string;
  planName: string;
  price: number;
  description?: string;
  status?: string;
}

export interface UserPlan {
  userPlanId?: number;
  planId?: number;
  userId?: number;
  planName: string;
  price: number;
  location?: string;
  requestedBy?: string;
  requestedDate?: string;
  requiredFrom: string;
  requiredTo: string;
  autoTerminated: boolean;
  alertRequired: boolean;
  status?: string;
  plans?: Plan[];
}

export interface SubscriptionForm {
  startDate: string;
  endDate: string;
  autoTerminated: boolean;
  alertRequired: boolean;
}

export interface Toast {
  id: number;
  message: string;
}

export interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  ssn: string;
  addressLine1: string;
  addressLine2: string;
  password: string;
  confirmPassword: string;
  zipCode: string;
}

export interface LoadingOverlayProps {
  className?: string;
}

export interface SubscriptionFormProps {
  planDetails: Readonly<{
    location: string;
    planName: string;
    price: number;
  }>;
  onSubscribe: (data: any) => void;
  onCancel: () => void;
}