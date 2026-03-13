'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Store session ID for access control
      localStorage.setItem('stripeSessionId', sessionId)
      setIsVerified(true)
    }
    setIsLoading(false)
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. Please contact support if you believe this is an error.
          </p>
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Freelancer Rate Calculator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600 font-medium">✓ Payment Successful</span>
            </div>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="text-green-500 text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Rate Calculator Pro!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your payment was successful. You now have lifetime access to the calculator and proposal templates.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold text-green-800 mb-2">What's Next?</h2>
              <div className="text-left space-y-2 text-green-700">
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Access the smart rate calculator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Download 5 professional proposal templates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Generate PDF proposals for your clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Get lifetime access to updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Calculate Your Rates</h3>
                <p className="text-sm text-gray-600">Enter your income goals and get personalized rate recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Create Proposals</h3>
                <p className="text-sm text-gray-600">Use professional templates to justify your new rates</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Win More Clients</h3>
                <p className="text-sm text-gray-600">Close deals at higher prices with professional proposals</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Link 
              href="/calculator"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Using Calculator
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/proposals"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                View Proposal Templates
              </Link>
              
              <a 
                href="mailto:support@freelancerratecalc.com"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Pro Tips to Maximize Your Investment</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">🎯 Implement Immediately</h3>
                <p className="text-blue-800 text-sm">Use your new rates on the very next proposal. Don't wait - the tool pays for itself in one properly-priced project.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">📊 Track Your Results</h3>
                <p className="text-blue-800 text-sm">Monitor how much extra you earn with your new rates. Most users see $15-25/hour increases within 30 days.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">💬 Share Success Stories</h3>
                <p className="text-blue-800 text-sm">When you land higher rates, share your success! Other freelancers benefit and you help build our community.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">🔄 Review Quarterly</h3>
                <p className="text-blue-800 text-sm">Revisit the calculator every 3 months as your skills and market position improve. Rates should grow with experience.</p>
              </div>
            </div>
          </div>

          {/* Guarantee Reminder */}
          <div className="mt-8 text-center bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-600 text-sm">
              If you don't increase your rates within 30 days, contact us for a full refund. 
              We're confident this tool will pay for itself many times over.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}