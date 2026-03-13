'use client'

import { useState } from 'react'
import { generateProposalPDF } from '@/lib/pdfGenerator'

interface ProposalData {
  clientName: string
  projectTitle: string
  projectDescription: string
  scope: string[]
  timeline: string
  deliverables: string[]
  hourlyRate: number
  projectHours: number
  projectTotal: number
  paymentTerms: string
  yourName: string
  yourEmail: string
  yourPhone: string
}

interface ProposalFormProps {
  templateId: string
  templateName: string
  onClose: () => void
}

export default function ProposalForm({ templateId, templateName, onClose }: ProposalFormProps) {
  const [formData, setFormData] = useState<ProposalData>({
    clientName: '',
    projectTitle: '',
    projectDescription: '',
    scope: [''],
    timeline: '2-3 weeks',
    deliverables: [''],
    hourlyRate: 85,
    projectHours: 40,
    projectTotal: 3400,
    paymentTerms: '50% upfront, 50% on completion',
    yourName: '',
    yourEmail: '',
    yourPhone: ''
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: keyof ProposalData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      
      // Auto-calculate project total when rate or hours change
      if (field === 'hourlyRate' || field === 'projectHours') {
        updated.projectTotal = updated.hourlyRate * updated.projectHours
      }
      
      return updated
    })
  }

  const addScopeItem = () => {
    setFormData(prev => ({
      ...prev,
      scope: [...prev.scope, '']
    }))
  }

  const removeScopeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.filter((_, i) => i !== index)
    }))
  }

  const updateScopeItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      scope: prev.scope.map((item, i) => i === index ? value : item)
    }))
  }

  const addDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, '']
    }))
  }

  const removeDeliverable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }))
  }

  const updateDeliverable = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.map((item, i) => i === index ? value : item)
    }))
  }

  const handleGeneratePDF = async () => {
    if (!formData.clientName || !formData.projectTitle || !formData.yourName) {
      alert('Please fill in required fields: Client Name, Project Title, and Your Name')
      return
    }

    setIsGenerating(true)
    try {
      await generateProposalPDF(formData, templateId)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
    setIsGenerating(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Create Proposal: {templateName}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Project Details</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Website Redesign Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Brief overview of the project goals and requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Scope
                </label>
                {formData.scope.map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateScopeItem(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Scope item..."
                    />
                    {formData.scope.length > 1 && (
                      <button
                        onClick={() => removeScopeItem(index)}
                        className="ml-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addScopeItem}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add scope item
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeline
                </label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2-3 weeks"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Pricing & Contact</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    value={formData.projectHours}
                    onChange={(e) => handleInputChange('projectHours', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Total
                </label>
                <div className="text-2xl font-bold text-green-600">
                  ${formData.projectTotal.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="50% upfront, 50% on completion">50% upfront, 50% on completion</option>
                  <option value="100% upfront">100% upfront</option>
                  <option value="25% upfront, 50% midway, 25% completion">25% upfront, 50% midway, 25% completion</option>
                  <option value="Net 30 after completion">Net 30 after completion</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deliverables
                </label>
                {formData.deliverables.map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateDeliverable(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Deliverable item..."
                    />
                    {formData.deliverables.length > 1 && (
                      <button
                        onClick={() => removeDeliverable(index)}
                        className="ml-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addDeliverable}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add deliverable
                </button>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => handleInputChange('yourName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.yourEmail}
                      onChange={(e) => handleInputChange('yourEmail', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.yourPhone}
                      onChange={(e) => handleInputChange('yourPhone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button 
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating PDF...</span>
                </div>
              ) : (
                'Generate Proposal PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}