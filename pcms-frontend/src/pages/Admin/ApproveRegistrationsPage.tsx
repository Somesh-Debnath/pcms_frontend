import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import React from 'react';
import { User, useAuth } from '@/context/AuthContext';
import { getRegistrations, updateRegistration} from '@/services/CustomerRegistration';

export default function ApproveRegistrationsPage() {
  const { setIsApproved } = useAuth();
  const [registrations, setRegistrations] = useState<User[]>([]);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const loadRegistrations = async () => {
      const data = await getRegistrations();
      console.log('Data:', data);
      setRegistrations(data);
      console.log('Registrations:', registrations);
    };
    loadRegistrations();
  }, [getRegistrations]);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleApprove = async (id: number | undefined) => {
    setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
    //setStatus('APPROVED');
    await updateRegistration(id, "APPROVED");
    setIsApproved(true);
    addToast('Registration approved successfully');
  };

  const handleReject = async (id: number | undefined) => {
    setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
    //setStatus('REJECTED');
    await updateRegistration(id, "REJECTED");
    setIsApproved(false);
    addToast('Registration rejected successfully');
  };

  const handleApproveAll = () => {
    setRegistrations([]);
    addToast('All registrations approved successfully');
  };

  const handleRejectAll = () => {
    setRegistrations([]);
    addToast('All registrations rejected successfully');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <NavigationBar />
      <main className="flex-1 p-8">
        {registrations.length > 0 && (
          <>
            <div className="flex justify-end gap-4 mb-4">
              <button
                onClick={handleApproveAll}
                className="px-6 py-2 bg-[#5B9B6B] text-white rounded-md hover:bg-[#4A8A5A] transition-colors"
              >
                Approve all
              </button>
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 border border-[#5B9B6B] text-[#5B9B6B] rounded-md hover:bg-gray-50 transition-colors"
              >
                Reject all
              </button>
            </div>
            <hr className="border-t border-gray-300 my-6" />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {registrations.map((registration) => (
            <div key={registration.id} className="bg-[#E8F5E9] rounded-lg p-4 space-y-2">
              <div className="space-y-1">
                <div className="text-gray-700">Full Name: {registration.fullName}</div>
                <div className="text-gray-700">Mail Id: {registration.email}</div>
                <div className="text-gray-700">Mobile number: {registration.phoneNumber}</div>
                <div className="text-gray-700">Address: {registration.addressLine1}</div>
                <div className="text-gray-700">Zip code: {registration.zipCode}</div>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => handleApprove(registration.id)}
                  className="px-6 py-2 bg-[#5B9B6B] text-white rounded-md hover:bg-[#4A8A5A] transition-colors flex-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(registration.id)}
                  className="px-6 py-2 border border-[#5B9B6B] text-[#5B9B6B] rounded-md hover:bg-gray-50 transition-colors flex-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {registrations.length === 0 && (
          <div className="text-center text-gray-500 py-12">No pending registrations to approve</div>
        )}
      </main>

      <footer className="bg-[#5B9B6B] text-white text-center py-4 mt-8">All rights reserved</footer>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <span>{toast.message}</span>
            <button onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} className="text-white/80 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Registration {
  id: number;
  fullName: string;
  mailId: string;
  mobileNumber: string;
  address: string;
  zipCode: string;
}