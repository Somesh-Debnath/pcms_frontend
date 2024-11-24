'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import NavigationBar from '../components/NavigationBar'

export default function ApproveRegistrationsPage() {
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      mailId: 'sample@xyz.com',
      mobileNumber: '(412)-456-1234',
      address: '12, Kirkham drive, Highland creed, Florida, USA',
      zipCode: '1234'
    },
    {
      id: 2,
      fullName: 'John Doe',
      mailId: 'sample@xyz.com',
      mobileNumber: '(412)-456-1234',
      address: '12, Kirkham drive, Highland creed, Florida, USA',
      zipCode: '1234'
    },
    {
      id: 3,
      fullName: 'John Doe',
      mailId: 'sample@xyz.com',
      mobileNumber: '(412)-456-1234',
      address: '12, Kirkham drive, Highland creed, Florida, USA',
      zipCode: '1234'
    }
  ])

  const [toasts, setToasts] = useState([])

  const addToast = (message) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const handleApprove = (id) => {
    setRegistrations(prev => prev.filter(reg => reg.id !== id))
    addToast('Registration approved successfully')
  }

  const handleReject = (id) => {
    setRegistrations(prev => prev.filter(reg => reg.id !== id))
    addToast('Registration rejected successfully')
  }

  const handleApproveAll = () => {
    setRegistrations([])
    addToast('All registrations approved successfully')
  }

  const handleRejectAll = () => {
    setRegistrations([])
    addToast('All registrations rejected successfully')
  }

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
            <div 
              key={registration.id}
              className="bg-[#E8F5E9] rounded-lg p-4 space-y-2"
            >
              <div className="space-y-1">
                <div className="text-gray-700">Full Name: {registration.fullName}</div>
                <div className="text-gray-700">Mail Id: {registration.mailId}</div>
                <div className="text-gray-700">Mobile number: {registration.mobileNumber}</div>
                <div className="text-gray-700">Address: {registration.address}</div>
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
          <div className="text-center text-gray-500 py-12">
            No pending registrations to approve
          </div>
        )}
      </main>

      <footer className="bg-[#5B9B6B] text-white text-center py-4 mt-8">
        All rights reserved
      </footer>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-white/80 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}