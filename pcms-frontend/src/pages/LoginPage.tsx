import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '@/services/CustomerRegistration';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card-content";
import { Zap } from 'lucide-react';
import Image from '../assets/image.png';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      try {
        const user = await getUserByEmail(email);
        if (user.status !== "APPROVED" && email !== "admin@example.com") {
          toast.error('Your account is not approved yet', {
            style: {
              background: '#f59e0b',
              color: '#fff',
            },
          });
        } else {
          await login(email, password, navigate);
          if (email === "admin@example.com") {
            console.log('email', email);
            navigate('/admin-plans');
          } else {
            navigate('/user-plans');
          }
        }
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block lg:w-2/5">
        <img src={Image} alt="Registration" className="h-full w-full object-cover" />
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center w-full lg:w-3/5 px-8 py-12 overflow-y-auto">
        <Card className="w-full max-w-md">
          <CardContent >
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-3xl font-bold" style={{ color: '#15803D' }}>Welcome back</h1>
                <p style={{ color: '#15803D' }}>
                  Enter your credentials to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" style={{ color: '#15803D' }}>Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                      value={email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" style={{ color: '#15803D' }}>Password</Label>
                      <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm hover:text-green-700"
                        style={{ color: '#15803D' }}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      disabled={isLoading}
                      required
                      value={password}
                      onChange={handleChange}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      style={{ color: '#15803D' }}
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Button className="w-full bg-[#15803D] text-white hover:text-gray-800 hover:bg-gray-200" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="text-center text-sm" style={{ color: '#15803D' }}>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="hover:underline"
                  style={{ color: '#15803D' }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="absolute bottom-0 bg-[#5B9B6B] w-full text-center py-4 border-t">
        <p className="text-white">All Rights Reserved</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;