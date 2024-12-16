import * as React from 'react'
import { Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingOverlay } from './LoadingOverlay'
import { ToastContainer, toast } from 'react-toastify'
import { SubscriptionFormProps } from '@/interfaces/interfaces'
import 'react-toastify/dist/ReactToastify.css'

export function SubscriptionForm({ planDetails, onSubscribe, onCancel }: SubscriptionFormProps) {
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [autoTerminated, setAutoTerminated] = React.useState(false)
  const [alertRequired, setAlertRequired] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    onSubscribe({
      startDate,
      endDate,
      autoTerminated,
      alertRequired
    })
    
    setIsLoading(false)
    toast.success('Plan added successfully', {
      style: {
        background: '#6fb080',
        color: '#fff',
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {isLoading && <LoadingOverlay />}
      
      <div className="space-y-2">
        <p>Location: {planDetails.location}</p>
        <p>Plan name: {planDetails.planName}</p>
        <p>Price: ${planDetails.price}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Required from</Label>
          <div className="relative">
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
              required
              disabled={isLoading}
            />
            <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Required to</Label>
          <div className="relative">
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full"
              required
              disabled={isLoading}
            />
            <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoTerminated"
              checked={autoTerminated}
              onChange={(e) => setAutoTerminated(e.target.checked)}
              disabled={isLoading}
            />
            <Label htmlFor="autoTerminated">Auto Terminated</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="alertRequired"
              checked={alertRequired}
              onChange={(e) => setAlertRequired(e.target.checked)}
              disabled={isLoading}
            />
            <Label htmlFor="alertRequired">Alert required</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          className="bg-[#6fb080] hover:bg-[#6fb080]/90"
          disabled={isLoading}
        >
          Subscribe
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="text-[#6fb080] border-[#6fb080] hover:bg-[#6fb080]/10"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
      <ToastContainer />
    </form>
  )
}