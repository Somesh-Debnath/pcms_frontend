import { useState, useEffect } from 'react'
import { Search, X, Edit2, Trash2, Calendar } from 'lucide-react'
import NavigationBar from '../components/NavigationBar'
import React from 'react'

interface Plan {
  id: number
  location: string
  planName: string
  price: number
}

export default function PlansPage() {
  const [searchLabel, setSearchLabel] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedDate, setSelectedDate] = useState('2023-08-17')
  const [allPlans, setAllPlans] = useState<Plan[]>([
    { id: 1, location: 'Ohio', planName: 'Super saver', price: 123 },
    { id: 2, location: 'Texas', planName: 'Eco friendly', price: 145 },
    { id: 3, location: 'California', planName: 'Premium', price: 189 },
    { id: 4, location: 'New York', planName: 'Basic', price: 99 },
    { id: 5, location: 'Florida', planName: 'Summer special', price: 135 },
    { id: 6, location: 'Ohio', planName: 'Winter saver', price: 110 },
    { id: 7, location: 'Texas', planName: 'Business pro', price: 200 },
    { id: 8, location: 'California', planName: 'Night owl', price: 95 },
    { id: 9, location: 'New York', planName: 'City dweller', price: 155 },
  ])
  const [filteredPlans, setFilteredPlans] = useState(allPlans)

  const [newPlan, setNewPlan] = useState({
    location: '',
    planName: '',
    price: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPlan(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClearInput = (field: string) => {
    setNewPlan(prev => ({
      ...prev,
      [field]: ''
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const plan = {
      id: Date.now(),
      location: newPlan.location,
      planName: newPlan.planName,
      price: Number(newPlan.price)
    }
    setAllPlans(prev => [...prev, plan])
    setNewPlan({ location: '', planName: '', price: '' })
    setIsModalOpen(false)
  }

  useEffect(() => {
    const filtered = allPlans.filter(plan => 
      plan.location.toLowerCase().includes(searchLabel.toLowerCase()) &&
      (selectedPlan === '' || plan.planName === selectedPlan)
    )
    setFilteredPlans(filtered)
  }, [searchLabel, selectedPlan, allPlans])

  const handleClear = () => {
    setSearchLabel('')
    setSelectedPlan('')
    setSelectedDate('2023-08-17')
  }
  console.log("PlansPage rendered");

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <NavigationBar />
      <main className="flex-1 px-8">
        <h2 className="text-2xl mt-1 font-semibold text-[#5B9B6B] mb-6">Search Plans</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Label</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchLabel}
                  onChange={(e) => setSearchLabel(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 pr-10 transition-all duration-300 focus:ring-2 focus:ring-[#5B9B6B] focus:border-transparent"
                  placeholder="Input"
                />
                {searchLabel && (
                  <button 
                    onClick={() => setSearchLabel('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Plan</label>
              <div className="relative">
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 pr-10 appearance-none bg-white transition-all duration-300 focus:ring-2 focus:ring-[#5B9B6B] focus:border-transparent"
                >
                  <option value="">Plan</option>
                  {Array.from(new Set(allPlans.map(plan => plan.planName))).map(planName => (
                    <option key={planName} value={planName}>{planName}</option>
                  ))}
                </select>
                {selectedPlan && (
                  <button 
                    onClick={() => setSelectedPlan('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
              </div>
              <div className="text-xs text-gray-500">MM/DD/YYYY</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-6 py-2 bg-[#5B9B6B] text-white rounded-md hover:bg-[#4A8A5A] transition-colors flex-1">
                Search
              </button>
              <button 
                onClick={handleClear}
                className="px-6 py-2 border border-[#5B9B6B] text-[#5B9B6B] rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-[#5B9B6B] text-white rounded-full hover:bg-[#4A8A5A] transition-colors"
        >
          <span className="text-xl font-bold">+</span> Add new plan
        </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-[#E8F5E9] rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-gray-700">Location: {plan.location}</div>
                  <div className="text-gray-700">Plan name: {plan.planName}</div>
                  <div className="text-gray-700">Price: ${plan.price}</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-[#5B9B6B] text-white rounded-full hover:bg-[#4A8A5A] transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-[#5B9B6B] text-white rounded-full hover:bg-[#4A8A5A] transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

            {/* Modal */}
            {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add new plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={newPlan.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="w-full border rounded-md px-3 py-2 pr-10"
                    required
                  />
                  {newPlan.location && (
                    <button
                      type="button"
                      onClick={() => handleClearInput('location')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="planName"
                    value={newPlan.planName}
                    onChange={handleInputChange}
                    placeholder="Plan name"
                    className="w-full border rounded-md px-3 py-2 pr-10"
                    required
                  />
                  {newPlan.planName && (
                    <button
                      type="button"
                      onClick={() => handleClearInput('planName')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={newPlan.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="w-full border rounded-md px-3 py-2 pr-10"
                    required
                  />
                  {newPlan.price && (
                    <button
                      type="button"
                      onClick={() => handleClearInput('price')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5B9B6B] text-white rounded-md hover:bg-[#4A8A5A] transition-colors flex-1"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-[#5B9B6B] text-[#5B9B6B] rounded-md hover:bg-gray-50 transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-[#5B9B6B] text-white text-center py-4 mt-8">
        All rights reserved
      </footer>
    </div>
  )
}