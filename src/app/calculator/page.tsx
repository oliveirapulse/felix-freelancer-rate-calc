import RateCalculator from '@/components/Calculator/RateCalculator'
import AccessControl from '@/components/AccessControl'
import Image from 'next/image'

export default function CalculatorPage() {
  return (
    <AccessControl>
      <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="Freelancer Rate Calculator"
                width={200}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Pro Version</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Optimal Freelance Rates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stop undercharging for your services. Use our smart calculator to find rates that ensure profitability while staying competitive in your market.
            </p>
          </div>

          {/* Calculator Component */}
          <RateCalculator />

          {/* Tips Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Pro Tips for Better Rates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Include ALL Expenses</h4>
                    <p className="text-gray-600 text-sm">Don't forget health insurance, software subscriptions, equipment, and taxes (25-30% of income).</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Account for Non-Billable Time</h4>
                    <p className="text-gray-600 text-sm">Only 60-70% of your time is typically billable. Include admin, marketing, and business development.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Value-Based Pricing</h4>
                    <p className="text-gray-600 text-sm">For high-impact projects, consider charging based on the value you deliver, not just time.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Start High, Negotiate Down</h4>
                    <p className="text-gray-600 text-sm">Always quote your premium rate first. It's easier to come down than to go up later.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Raise Rates Regularly</h4>
                    <p className="text-gray-600 text-sm">Increase rates 10-20% annually, or with each new client to account for experience and inflation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 text-sm font-bold">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Package Your Services</h4>
                    <p className="text-gray-600 text-sm">Offer project packages instead of hourly rates when possible. Clients prefer predictable costs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Present Professional Proposals?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Use our professional proposal templates to justify your new rates and win more clients at higher prices.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Create Professional Proposal
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AccessControl>
  )
}