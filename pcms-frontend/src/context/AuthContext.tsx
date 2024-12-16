import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { roles, rolePermissions } from '../roles';
import { registerCustomer, getRegistrations } from '../services/CustomerRegistration';
import { loginApi } from '../services/AuthService';
import { toast } from 'react-toastify';
import { FormData } from '@/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute';

interface AuthContextType {
  userRole: string;
  setUserRole: (role: string) => void;
  hasPermission: (permission: string) => boolean;
  register: (formData: FormData, navigate: ReturnType<typeof useNavigate>) => Promise<void>;
  login: (email: string, password: string, navigate: ReturnType<typeof useNavigate>) => Promise<void>;
  user: User | null;
  isApproved: boolean | undefined;
  setIsApproved: (isApproved: boolean) => void;
  fetchRegistrations: () => Promise<User[]>;
}

export interface User {
  id?: number;
  fullName: string;
  phoneNumber?: string;
  email: string;
  ssn?: string;
  addressLine1?: string;
  addressLine2?: string;
  zipCode?: string;
  password?: string;
  status?: string;
  role: string;
  plan?: {
    name: string;
    price: number;
  };
  requestedPlan?: {
    name: string;
    price: number;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isApproved, setIsApproved] = useState<boolean | undefined>(undefined);
  const [userRole, setUserRole] = useState<string>(() => {
    return localStorage.getItem('userRole') ?? roles.USER;
  });
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const hasPermission = (permission: string) => {
    return rolePermissions[userRole]?.includes(permission);
  };

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('user', JSON.stringify(user));
    //console.log('User', user);
  }, [userRole, user]);

  const register = async (formData: FormData, navigate: ReturnType<typeof useNavigate>) => {
    try {
      const response = await registerCustomer(formData);
      setUser(response);
      navigate('/login');
      toast.success("User registered successfully! Await admin approval.");
      console.log("Registration successful:", response);
    } catch (error) {
      toast.error("There was an error registering the customer.");
      console.error("There was an error registering the customer:", error);
    }
  };

  const login = async (email: string, password: string, navigate: ReturnType<typeof useNavigate>) => {
    try {
      if (email === "admin@example.com") {
        console.log("Admin logged in successfully!");
        setUserRole(roles.ADMIN);
        setUser({ email: "admin@example.com", role: roles.ADMIN, fullName: "admin" });
        toast.success("Admin logged in successfully!");
        console.log("User:", user);
        navigate('/admin-plans');
      } else {
        const response = await loginApi(email, password);
        setUserRole(roles.USER);
        setUser(response);
        toast.success("User logged in successfully!");
        navigate('/user-plans');
      }
    } catch (error) {
      toast.error("Invalid email or password.");
      console.error("Login error:", error);
    }
  };
  
  const fetchRegistrations = async (): Promise<User[]> => {
    try {
      const response = await getRegistrations();
      console.log("Response from AUTH:", response);
      return response;
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return [];
    }
  };

  const contextValue = useMemo(() => ({
    userRole,
    setUserRole,
    hasPermission,
    register,
    login,
    user,
    fetchRegistrations,
    isApproved,
    setIsApproved
  }), [userRole, user, isApproved]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};