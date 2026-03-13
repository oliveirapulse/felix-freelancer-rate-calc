'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutButton from './CheckoutButton'

interface AccessControlProps {
  children: React.ReactNode
}

export default function AccessControl({ children }: AccessControlProps) {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has access (paid customer)
    const sessionId = localStorage.getItem('stripeSessionId')
    if (sessionId) {
      setHasAccess(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Freelancer Rate Calculator</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Access Required Message */}
        <div className="flex items-center justify-center py-20">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4">
            <div className="text-center">
              <div className="text-blue-500 text-6xl mb-6">🔒</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Premium Feature</h1>
              <p className="text-lg text-gray-600 mb-8">
                The Rate Calculator and Proposal Templates are available to paid customers only. 
                Get instant access for just $29 - a one-time payment.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">What you'll get:</h3>
                <ul className="text-left space-y-2 text-blue-800">
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Smart rate calculator with market data</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>5 professional proposal templates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>PDF export for proposals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Lifetime access and updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>30-day money-back guarantee</span>
                  </li>
                </ul>
              </div>

              <CheckoutButton className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg mb-4">
                Get Instant Access - $29
              </CheckoutButton>

              <div className="text-sm text-gray-500">
                💳 Secure payment via Stripe • 🔒 30-day guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}