import { NavLink, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { roles } from '../roles';

const NavigationBar = () => {
  const { user, userRole, fetchRegistrations } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [registrationsCount, setRegistrationsCount] = useState(0);
  console.log(userRole);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    navigate('/login');
  }

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetchRegistrations();
      setRegistrationsCount(res.length);
      console.log('Registrations:', res.length);
    };
    fetchCount();
  }, [registrationsCount, fetchRegistrations]);


  return (
    <div>
      <header className="bg-[#5B9B6B] p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Power Consumer Management System</h1>
        <button
            className="text-white p-2 hover:bg-[#4A8A5A] rounded-full transition-colors"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <User className="h-6 w-6" />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-auto top-14 w-48 bg-white rounded-md shadow-lg py-2 z-20"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="px-4 py-2 mt-auto text-gray-700">
                <span className="font-semibold">{user?.fullName}</span>
              </div>
              <div className="border-t border-gray-200"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
      </header>
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            {userRole === roles.ADMIN && (
              <NavLink
                to="/admin-plans"
                className="py-4 px-6 relative"
                style={({ isActive }: { isActive: boolean }) => ({
                  borderBottom: isActive ? '2px solid #5B9B6B' : 'none',
                  color: isActive ? '#5B9B6B' : 'inherit',
                })}
              >
                Plans
              </NavLink>
            )}
            {userRole === roles.ADMIN && (
              <NavLink
                to="/approve-registrations"
                className="py-4 px-6 relative"
                style={({ isActive }: { isActive: boolean }) => ({
                  borderBottom: isActive ? '2px solid #5B9B6B' : 'none',
                  color: isActive ? '#5B9B6B' : 'inherit',
                })}
              >
                Approve new Registrations
                {registrationsCount > 0 && (
                  <span className="absolute top-2 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {registrationsCount}
                  </span>
                )}
              </NavLink>
            )}
            {userRole === roles.ADMIN && (
              <NavLink
                to="/approve-requested-plan"
                className="py-4 px-6 relative"
                style={({ isActive }: { isActive: boolean }) => ({
                  borderBottom: isActive ? '2px solid #5B9B6B' : 'none',
                  color: isActive ? '#5B9B6B' : 'inherit',
                })}
              >
                Approve Requested Plan
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;