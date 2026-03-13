'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProposalForm from '@/components/Proposals/ProposalForm'

interface ProposalTemplate {
  id: string
  name: string
  description: string
  category: string
  preview: string
}

const templates: ProposalTemplate[] = [
  {
    id: 'clean-modern',
    name: 'Clean & Modern',
    description: 'Minimalist design perfect for tech and design projects',
    category: 'Design/Tech',
    preview: 'Clean typography, plenty of white space, professional layout'
  },
  {
    id: 'corporate-professional',
    name: 'Corporate Professional',
    description: 'Traditional business format for established companies',
    category: 'Business',
    preview: 'Formal structure, detailed sections, corporate-friendly tone'
  },
  {
    id: 'creative-brief',
    name: 'Creative Brief',
    description: 'Visual-heavy template for creative services',
    category: 'Creative',
    preview: 'Portfolio showcase, visual elements, creative-focused sections'
  },
  {
    id: 'consulting-focused',
    name: 'Consulting Focused',
    description: 'Strategy and advisory project template',
    category: 'Consulting',
    preview: 'Strategic approach, methodology focus, outcome-based pricing'
  },
  {
    id: 'technical-specification',
    name: 'Technical Specification',
    description: 'Development and technical work template',
    category: 'Development',
    preview: 'Technical requirements, development phases, code deliverables'
  }
]

export default function ProposalsPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-yellow-500 text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Premium Feature</h1>
          <p className="text-gray-600 mb-6">
            Proposal templates are available to paid customers only. Purchase the Rate Calculator Pro to access all templates.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Access - $29
          </button>
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
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">Freelancer Rate Calculator</h1>
              <nav className="flex space-x-6">
                <button 
                  onClick={() => router.push('/calculator')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Calculator
                </button>
                <span className="text-blue-600 font-medium">Proposals</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600 font-medium">✓ Pro Version</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Proposal Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from 5 professionally designed templates that help justify your rates and win more clients at higher prices.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <p className="text-sm text-gray-500 mb-6">{template.preview}</p>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setSelectedTemplate(template.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Use This Template
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fully Customizable</h4>
                    <p className="text-gray-600 text-sm">Edit all text, add your branding, adjust sections to fit your needs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Design</h4>
                    <p className="text-gray-600 text-sm">Clean, modern layouts that impress clients and justify premium rates</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rate Integration</h4>
                    <p className="text-gray-600 text-sm">Seamlessly incorporate your calculated rates from the pricing tool</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">PDF Export</h4>
                    <p className="text-gray-600 text-sm">Download professional PDFs ready to send to clients</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Templates</h4>
                    <p className="text-gray-600 text-sm">Copy-paste versions for quick email proposals</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lifetime Access</h4>
                    <p className="text-gray-600 text-sm">Use templates unlimited times for all your client projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="mt-8 bg-blue-50 rounded-xl p-8 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Proposal Pro Tips</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-blue-800"><strong>Lead with value:</strong> Start with what the client will gain, not what you'll do.</p>
                <p className="text-blue-800"><strong>Include testimonials:</strong> Social proof increases acceptance rates by 40%.</p>
                <p className="text-blue-800"><strong>Offer options:</strong> Give 3 packages (good, better, best) to guide decision-making.</p>
              </div>
              <div className="space-y-2">
                <p className="text-blue-800"><strong>Clear timeline:</strong> Specific dates and milestones build confidence.</p>
                <p className="text-blue-800"><strong>Payment terms:</strong> 50% upfront, 50% on completion for new clients.</p>
                <p className="text-blue-800"><strong>Follow up:</strong> Send a friendly reminder after 3-5 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Proposal Form */}
      {selectedTemplate && (
        <ProposalForm 
          templateId={selectedTemplate}
          templateName={templates.find(t => t.id === selectedTemplate)?.name || ''}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  )
}