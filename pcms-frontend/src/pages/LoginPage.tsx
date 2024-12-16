import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from '../assets/image.png';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '@/services/CustomerRegistration';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
        const user = await getUserByEmail(email);
        console.log(user);
        if(user.status !== "APPROVED" && email !== "admin@example.com")
        {
          toast.error('Your account is not approved yet', {
            style: {
              background: '#f59e0b',
              color: '#fff',
            },
          });
        }
      else{
        await login(email, password, navigate);
        if(email === "admin@example.com")
        {
          navigate('/admin-plans');
        }
        else
        {
          navigate('/user-plans');
        }
    }
  }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block lg:w-2/5">
        <img src={Image} alt="Login" className="h-full w-full object-cover" />
      </div>

      <div className="w-full lg:w-3/5 px-8 py-12 overflow-y-auto flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Login</h1>
        <hr className="border-t-2 border-green-700 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-green-700 text-white rounded-lg hover:bg-green-900 transition-colors"
          >
            Login
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;