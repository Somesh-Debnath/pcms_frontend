import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react'
import React from 'react';

const NavigationBar = () => {
  return (
    <div>
      <header className="bg-[#5B9B6B] p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Power Consumer Management System</h1>
        <button className="text-white p-2 hover:bg-[#4A8A5A] rounded-full transition-colors">
          <User className="h-6 w-6" />
        </button>
      </header>
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            <NavLink
              to="/plans"
              className="py-4 px-6 relative"
              style={({ isActive }: { isActive: boolean }) => ({
                borderBottom: isActive ? '2px solid #5B9B6B' : 'none',
                color: isActive ? '#5B9B6B' : 'inherit',
              })}
            >
              Plans
            </NavLink>
            <NavLink
              to="/approve-registrations"
              className="py-4 px-6 relative"
              style={({ isActive }: { isActive: boolean}) => ({
                borderBottom: isActive ? '2px solid #5B9B6B' : 'none',
                color: isActive ? '#5B9B6B' : 'inherit',
              })}
            >
              Approve new Registrations
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </NavLink>
            <NavLink
              to="/approve-requested-plan"
              className="py-4 px-6 relative"
              style={({ isActive }: { isActive: boolean }) => ({
                borderBottom: isActive ? '2px solid #5B9B6B' : 'none',
                color: isActive ? '#5B9B6B' : 'inherit',
              })}
            >
              Approve Requested Plan
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                4
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;