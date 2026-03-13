import CheckoutButton from '@/components/CheckoutButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Freelancer Rate Calculator</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
              <a href="#pricing" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Get Started</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stop Undercharging.<br />
            <span className="text-blue-200">Start Earning What You're Worth.</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Calculate your optimal freelance rates with our smart pricing tool. 
            Includes professional proposal templates to justify your new rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CheckoutButton className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              Calculate My Rates - $29
            </CheckoutButton>
            <a 
              href="/calculator"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
            >
              Try Free Preview
            </a>
          </div>
          
          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">4.9</span>
              <div className="flex text-yellow-300">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
            </div>
            <div className="h-6 w-px bg-blue-300"></div>
            <span>1,200+ freelancers using this tool</span>
            <div className="h-6 w-px bg-blue-300"></div>
            <span>Average rate increase: $18/hr</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Hidden Cost of Undercharging
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">67%</div>
              <div className="text-gray-900 font-semibold mb-2">of freelancers undercharge</div>
              <div className="text-gray-600 text-sm">Leaving thousands on the table every year</div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">$15K+</div>
              <div className="text-gray-900 font-semibold mb-2">Average money lost per year</div>
              <div className="text-gray-600 text-sm">Due to pricing too low for the market</div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">3x</div>
              <div className="text-gray-900 font-semibold mb-2">Harder to raise rates later</div>
              <div className="text-gray-600 text-sm">Clients expect to keep paying the same low rates</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sound Familiar?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">"I don't know what to charge for this project"</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">"I quoted too low and now I'm working for peanuts"</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">"My proposals look unprofessional compared to agencies"</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">"Clients keep asking for discounts and I cave every time"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution/Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Price Like a Pro
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our smart calculator considers your experience, location, industry rates, and business goals 
              to give you data-backed pricing recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Calculator Preview */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-green-400 text-sm font-mono">
                  $ calculate-rate --income 80000 --hours 30<br/>
                  <span className="text-white">Recommended Rate: </span>
                  <span className="text-green-400 font-bold">$85/hr</span><br/>
                  <span className="text-blue-400">Annual Projection: $124,800</span><br/>
                  <span className="text-yellow-400">+$31,200 vs current rate</span>
                </div>
              </div>
              <div className="text-gray-400 text-xs">Smart Rate Calculator v2.0</div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🧮</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Rate Calculator</h3>
                  <p className="text-gray-600">Input your goals and get personalized hourly and project rates based on market data, your experience level, and location.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Market Comparison</h3>
                  <p className="text-gray-600">See how your rates stack up against industry averages and get confidence scores for your pricing decisions.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📄</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Proposals</h3>
                  <p className="text-gray-600">5 beautifully designed proposal templates that justify your rates and help you close more deals at higher prices.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get your optimized rates in seconds, not hours of research</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pays For Itself</h3>
              <p className="text-gray-600 text-sm">One properly priced project covers the cost 10x over</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data-Driven</h3>
              <p className="text-gray-600 text-sm">Based on real market rates and industry standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Freelancers Are Seeing Real Results
            </h2>
            <p className="text-xl text-gray-600">Average rate increase: $18/hour within 30 days</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex text-yellow-500 mb-4">
                {'★★★★★'.split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
              </div>
              <p className="text-gray-700 mb-4">"Increased my rate from $45 to $75/hour after using this calculator. The proposals helped me justify the increase to existing clients."</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-600">UX Designer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex text-yellow-500 mb-4">
                {'★★★★★'.split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
              </div>
              <p className="text-gray-700 mb-4">"Finally confident in my pricing! Went from $60 to $95/hour for React projects. The market comparison feature was eye-opening."</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <div className="font-semibold text-gray-900">Marcus Rivera</div>
                  <div className="text-sm text-gray-600">Frontend Developer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex text-yellow-500 mb-4">
                {'★★★★★'.split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
              </div>
              <p className="text-gray-700 mb-4">"The proposal templates alone are worth $29. Clean, professional, and they actually help close deals at my new higher rates."</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <div className="font-semibold text-gray-900">Alex Thompson</div>
                  <div className="text-sm text-gray-600">Marketing Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            One Payment. Lifetime Access.
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            No subscriptions, no hidden fees. Pay once, use forever.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-2">Freelancer Rate Calculator Pro</h3>
            <div className="text-5xl font-bold mb-2">$29</div>
            <div className="text-blue-200 mb-6">One-time payment</div>
            
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <span className="text-green-300">✓</span>
                <span>Smart rate calculator with market data</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-green-300">✓</span>
                <span>5 professional proposal templates</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-green-300">✓</span>
                <span>PDF export for proposals</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-green-300">✓</span>
                <span>Lifetime access and updates</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-green-300">✓</span>
                <span>30-day money-back guarantee</span>
              </li>
            </ul>

            <CheckoutButton className="w-full bg-white text-blue-600 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg mb-4">
              Get Instant Access - $29
            </CheckoutButton>

            <div className="text-blue-200 text-sm">
              💳 Secure payment via Stripe • 🔒 30-day guarantee
            </div>
          </div>

          <div className="mt-8 text-gray-600">
            <p className="mb-2"><strong>Guarantee:</strong> If you don't increase your rates within 30 days, get a full refund.</p>
            <p>Average rate increase pays for this tool in the first hour of work.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How accurate are the rate calculations?</h3>
              <p className="text-gray-700">Our calculator uses real market data from thousands of freelancers across different industries and locations. We regularly update our database to ensure accuracy.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What if I'm just starting out as a freelancer?</h3>
              <p className="text-gray-700">Perfect! The calculator has a "beginner" experience level that adjusts rates appropriately. It's better to start with proper pricing than to undervalue yourself from day one.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I customize the proposal templates?</h3>
              <p className="text-gray-700">Absolutely. All templates are fully customizable with your branding, project details, and specific terms. You can also export them as PDFs or use them as email templates.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is this a subscription or one-time payment?</h3>
              <p className="text-gray-700">One-time payment of $29. No monthly fees, no hidden costs. You get lifetime access to the tool and any future updates we release.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Leaving Money on the Table?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 1,200+ freelancers who've increased their rates and improved their proposals with our tool.
          </p>
          <CheckoutButton className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg mb-6">
            Calculate My Optimal Rates - $29
          </CheckoutButton>
          <div className="text-blue-200 text-sm">
            30-day money-back guarantee • Secure payment • Instant access
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Freelancer Rate Calculator</h3>
              <p className="text-gray-400 text-sm">Helping freelancers price their services correctly and create professional proposals.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Freelancer Rate Calculator. Made with ❤️ for freelancers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}