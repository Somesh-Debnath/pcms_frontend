import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import NavigationBar from '../../components/NavigationBar';
import { getAllUserPlans, updateUserPlanStatus } from '@/services/PlansServices';
import { Plan, Toast, UserPlan } from '@/interfaces/interfaces';

export default function ApproveRequestedPlanPage() {
  const [planRequests, setPlanRequests] = useState<UserPlan[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const loadPlanRequests = async () => {
      try {
        const data = await getAllUserPlans();
        setPlanRequests(data.filter((plan: UserPlan) => plan.status === "new"));
        console.log('Plan requests:', planRequests);
      } catch (error) {
        console.error('Error loading plan requests:', error);
      }
    };
    loadPlanRequests();
  }, []);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleApprove = async (userPlanId: number | undefined) => {
    console.log('Approving plan:', userPlanId);
    await updateUserPlanStatus(userPlanId, 'approved');
    setPlanRequests((prev) => prev.filter((plan) => plan.userPlanId !== userPlanId));
    addToast('Plan approved successfully');
  };

  const handleReject = async (userPlanId: number | undefined) => {
    await updateUserPlanStatus(userPlanId, 'rejected');
    setPlanRequests((prev) => prev.filter((plan) => plan.userPlanId !== userPlanId));
    addToast('Plan rejected successfully');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <NavigationBar />
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {planRequests.map((plan) => (
            <div 
              key={plan.userPlanId}
              className="bg-[#E8F5E9] rounded-lg p-6 flex flex-col justify-between h-full"
            >
              <div className="space-y-2">
                <div className="text-gray-700">Location: {plan.location}</div>
                <div className="text-gray-700">Plan name: {plan.planName}</div>
                <div className="text-gray-700">Price: ${plan.price}</div>
                <div className="text-gray-700">Requested by: {plan.requestedBy}</div>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleApprove(plan.userPlanId)}
                  className="px-6 py-2 bg-[#5B9B6B] text-white rounded-md hover:bg-[#4A8A5A] transition-colors flex-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(plan.userPlanId)}
                  className="px-6 py-2 border border-[#5B9B6B] text-[#5B9B6B] rounded-md hover:bg-gray-50 transition-colors flex-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {planRequests.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No pending plan requests to approve
          </div>
        )}
      </main>

      <footer className="bg-[#5B9B6B] text-white text-center py-4 mt-8">
        All rights reserved
      </footer>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/80 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}