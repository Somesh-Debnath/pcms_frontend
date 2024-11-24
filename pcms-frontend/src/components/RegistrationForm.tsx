import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "../assets/image.png";
interface FormData {
  fullName: string;
  phoneNumber: string;
  mailId: string;
  ssn: string;
  addressLine1: string;
  addressLine2: string;
  password: string;
  confirmPassword: string;
  zipCode: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    mailId: "",
    ssn: "",
    addressLine1: "",
    addressLine2: "",
    password: "",
    confirmPassword: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleClear = (field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        newErrors[key as keyof FormData] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      mailId: "",
      ssn: "",
      addressLine1: "",
      addressLine2: "",
      password: "",
      confirmPassword: "",
      zipCode: "",
    });
    setErrors({});
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block lg:w-2/5">
        <img src={Image} alt="Registration" className="h-full w-full object-cover" />
      </div>
      
      <div className="w-full lg:w-3/5 px-8 py-12 overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Registration Form</h1>
        <hr className="border-t-2 border-green-700 mb-8" />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name Input */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.fullName && (
                <button
                  type="button"
                  onClick={() => handleClear("fullName")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your full name</p>
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your phone number</p>
            </div>
          </div>

          {/* Add similar grid patterns for other input pairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="mailId"
                value={formData.mailId}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.mailId && (
                <button
                  type="button"
                  onClick={() => handleClear("mailId")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.mailId && <p className="mt-1 text-sm text-red-500">{errors.mailId}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your email</p>
            </div>

            {/* SSN Input */}
            <div className="relative">
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                placeholder="SSN"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.ssn && (
                <button
                  type="button"
                  onClick={() => handleClear("ssn")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.ssn && <p className="mt-1 text-sm text-red-500">{errors.ssn}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your SSN</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address Line 1 Input */}
            <div className="relative">
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.addressLine1 && (
                <button
                  type="button"
                  onClick={() => handleClear("addressLine1")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.addressLine1 && <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your address line 1</p>
            </div>

            {/* Address Line 2 Input */}
            <div className="relative">
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Address Line 2"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.addressLine2 && (
                <button
                  type="button"
                  onClick={() => handleClear("addressLine2")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.addressLine2 && <p className="mt-1 text-sm text-red-500">{errors.addressLine2}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your address line 2</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => handleClear("password")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your password</p>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.confirmPassword && (
                <button
                  type="button"
                  onClick={() => handleClear("confirmPassword")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              <p className="mt-1 text-sm text-gray-500">Confirm your password</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zip Code Input */}
            <div className="relative">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
                required
              />
              {formData.zipCode && (
                <button
                  type="button"
                  onClick={() => handleClear("zipCode")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter your zip code</p>
            </div>

            <div className="relative">
            <div className="flex justify-around space-x-4 mt-1 col-span-2">
              <button
                type="submit"
                className="px-10 py-3 bg-green-700 text-white rounded-full hover:bg-green-900 transition-colors"
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-10 py-3 border-2 border-green-700 text-green-700 rounded-full hover:bg-green-400 hover:text-white transition-colors"
              >
                Reset
              </button>
            </div>
            </div>
          </div>
        </form>
      </div>
      
      <footer className="absolute bottom-0 bg-[#5B9B6B] w-full text-center py-4 border-t">
        <p className="text-white">All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default RegistrationForm;