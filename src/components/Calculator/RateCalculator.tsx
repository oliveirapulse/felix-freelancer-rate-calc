'use client'

import React, { useState, useEffect } from 'react'
import { calculateRates, calculateOutcomeBasedRate, formatCurrency, type CalculatorInputs, type CalculatorResults, type OutcomeBasedInputs, type OutcomeBasedResults } from '@/lib/calculations'

const RateCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    desiredAnnualIncome: 80000,
    hoursPerWeek: 30,
    vacationWeeks: 4,
    businessExpensesPercent: 25,
    profitMarginPercent: 20,
    experienceLevel: 'intermediate',
    industry: 'development',
    location: 'medium'
  })

  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [currentRate, setCurrentRate] = useState<number>(50)

  const [outcomeEnabled, setOutcomeEnabled] = useState(false)
  const [outcomeInputs, setOutcomeInputs] = useState<OutcomeBasedInputs>({
    estimatedProjectValue: 50000,
    estimatedProjectHours: 100,
    valueCapturePercent: 15
  })
  const [outcomeResults, setOutcomeResults] = useState<OutcomeBasedResults | null>(null)

  // Calculate results whenever inputs change
  useEffect(() => {
    const calculatedResults = calculateRates(inputs)
    setResults(calculatedResults)

    if (outcomeEnabled) {
      setOutcomeResults(calculateOutcomeBasedRate(outcomeInputs, calculatedResults.recommendedRate))
    }
  }, [inputs, outcomeInputs, outcomeEnabled])

  const updateInput = (key: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getMarketComparisonText = (comparison: string) => {
    switch (comparison) {
      case 'below': return { text: 'Below Market Average', color: 'text-red-600' }
      case 'above': return { text: 'Above Market Average', color: 'text-green-600' }
      default: return { text: 'Market Average', color: 'text-blue-600' }
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Calculator</h2>
          
          <div className="space-y-6">
            {/* Desired Annual Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Annual Income
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="30000"
                  max="500000"
                  step="5000"
                  value={inputs.desiredAnnualIncome}
                  onChange={(e) => updateInput('desiredAnnualIncome', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[100px]">
                  {formatCurrency(inputs.desiredAnnualIncome)}
                </span>
              </div>
            </div>

            {/* Hours Per Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Per Week
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={inputs.hoursPerWeek}
                  onChange={(e) => updateInput('hoursPerWeek', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                  {inputs.hoursPerWeek}h
                </span>
              </div>
            </div>

            {/* Vacation Weeks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vacation Weeks Per Year
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={inputs.vacationWeeks}
                  onChange={(e) => updateInput('vacationWeeks', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                  {inputs.vacationWeeks} weeks
                </span>
              </div>
            </div>

            {/* Business Expenses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Expenses (% of income)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={inputs.businessExpensesPercent}
                  onChange={(e) => updateInput('businessExpensesPercent', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                  {inputs.businessExpensesPercent}%
                </span>
              </div>
            </div>

            {/* Profit Margin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profit Margin Target
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="5"
                  value={inputs.profitMarginPercent}
                  onChange={(e) => updateInput('profitMarginPercent', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                  {inputs.profitMarginPercent}%
                </span>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={inputs.experienceLevel}
                onChange={(e) => updateInput('experienceLevel', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={inputs.industry}
                onChange={(e) => updateInput('industry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="writing">Writing</option>
                <option value="marketing">Marketing</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost of Living Area
              </label>
              <select
                value={inputs.location}
                onChange={(e) => updateInput('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low (Small towns, rural)</option>
                <option value="medium">Medium (Mid-size cities)</option>
                <option value="high">High (Major cities)</option>
              </select>
            </div>

            {/* Current Rate Comparison */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Current Rate (for comparison)
              </label>
              <input
                type="number"
                value={currentRate}
                onChange={(e) => setCurrentRate(parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your current hourly rate"
              />
            </div>
          </div>

          {/* Outcome-Based Pricing Toggle */}
          <div className="mt-8 border-t border-gray-300 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Value-Based Pricing</h3>
              <button
                onClick={() => setOutcomeEnabled(!outcomeEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${outcomeEnabled ? 'bg-purple-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${outcomeEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Price based on the value you deliver, not just your time. This shifts the conversation from &quot;what do you cost?&quot; to &quot;what is it worth?&quot;
            </p>

            {outcomeEnabled && (
              <div className="space-y-5">
                {/* Estimated Project Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Value to Client
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Revenue, savings, or impact this project will generate for the client
                  </p>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="5000"
                      max="1000000"
                      step="5000"
                      value={outcomeInputs.estimatedProjectValue}
                      onChange={(e) => setOutcomeInputs(prev => ({ ...prev, estimatedProjectValue: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold text-gray-900 min-w-[100px]">
                      {formatCurrency(outcomeInputs.estimatedProjectValue)}
                    </span>
                  </div>
                </div>

                {/* Estimated Project Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Project Hours
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="5"
                      max="500"
                      step="5"
                      value={outcomeInputs.estimatedProjectHours}
                      onChange={(e) => setOutcomeInputs(prev => ({ ...prev, estimatedProjectHours: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                      {outcomeInputs.estimatedProjectHours}h
                    </span>
                  </div>
                </div>

                {/* Value Capture Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value Capture Rate
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    % of the client&apos;s value you charge (10-30% is typical)
                  </p>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={outcomeInputs.valueCapturePercent}
                      onChange={(e) => setOutcomeInputs(prev => ({ ...prev, valueCapturePercent: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                      {outcomeInputs.valueCapturePercent}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Display */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Recommended Rates</h2>
          
          {results && (
            <div className="space-y-6">
              {/* Confidence Score */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getConfidenceColor(results.confidenceScore)}`}>
                  Confidence Score: {results.confidenceScore}/100
                </div>
              </div>

              {/* Main Rates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-sm text-red-600 font-medium">Minimum Rate</div>
                  <div className="text-2xl font-bold text-red-700">{formatCurrency(results.minimumRate)}/hr</div>
                  <div className="text-xs text-red-600">Break-even point</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 ring-2 ring-green-300">
                  <div className="text-sm text-green-600 font-medium">Recommended Rate</div>
                  <div className="text-2xl font-bold text-green-700">{formatCurrency(results.recommendedRate)}/hr</div>
                  <div className="text-xs text-green-600">Sweet spot</div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium">Premium Rate</div>
                  <div className="text-2xl font-bold text-blue-700">{formatCurrency(results.premiumRate)}/hr</div>
                  <div className="text-xs text-blue-600">Top-tier clients</div>
                </div>
              </div>

              {/* Market Comparison */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Market Position:</span>
                  <span className={`text-sm font-semibold ${getMarketComparisonText(results.marketComparison).color}`}>
                    {getMarketComparisonText(results.marketComparison).text}
                  </span>
                </div>
              </div>

              {/* Outcome-Based Pricing Results */}
              {outcomeEnabled && outcomeResults && (
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Value-Based Rate</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-purple-600 font-medium">Value-Based Rate</div>
                      <div className="text-2xl font-bold text-purple-700">{formatCurrency(outcomeResults.valueBasedRate)}/hr</div>
                    </div>
                    <div>
                      <div className="text-sm text-purple-600 font-medium">Project Total</div>
                      <div className="text-2xl font-bold text-purple-700">{formatCurrency(outcomeResults.valueBasedProjectTotal)}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-700">vs. Cost-Based Rate</span>
                      <span className={`font-semibold ${outcomeResults.valuePremiumPercent > 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {outcomeResults.valuePremiumPercent > 0 ? '+' : ''}{outcomeResults.valuePremiumPercent}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Value Multiplier</span>
                      <span className="font-semibold text-purple-900">{outcomeResults.effectiveMultiplier}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Client ROI</span>
                      <span className="font-semibold text-green-700">{outcomeResults.clientROI}%</span>
                    </div>
                  </div>

                  {outcomeResults.valuePremiumPercent > 0 && (
                    <div className="mt-3 p-3 bg-purple-100 rounded-md">
                      <p className="text-xs text-purple-800">
                        Your value-based rate is <strong>{outcomeResults.valuePremiumPercent}%</strong> higher than your cost-based rate.
                        The client still gets a <strong>{outcomeResults.clientROI}% ROI</strong> — use this to anchor pricing conversations around outcomes, not hours.
                      </p>
                    </div>
                  )}

                  {outcomeResults.valuePremiumPercent <= 0 && (
                    <div className="mt-3 p-3 bg-yellow-100 rounded-md">
                      <p className="text-xs text-yellow-800">
                        Your cost-based rate already exceeds the value-based rate. Consider whether the project value estimate is accurate, or adjust the value capture rate.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Project Ranges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Rate Ranges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Small Projects</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(results.smallProjectRange.min)} - {formatCurrency(results.smallProjectRange.max)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Medium Projects</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(results.mediumProjectRange.min)} - {formatCurrency(results.mediumProjectRange.max)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Large Projects</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(results.largeProjectRange.min)}+
                    </span>
                  </div>
                </div>
              </div>

              {/* Revenue Projection */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Annual Revenue Projection</h3>
                <div className="text-3xl font-bold text-blue-700">
                  {formatCurrency(results.annualRevenueProjection)}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  At {results.recommendedRate}/hr × {inputs.hoursPerWeek}h/week × {52 - inputs.vacationWeeks} weeks
                </div>
              </div>

              {/* Rate Increase Impact */}
              {currentRate > 0 && currentRate !== results.recommendedRate && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Potential Earnings Increase</h3>
                  {currentRate < results.recommendedRate ? (
                    <>
                      <div className="text-xl font-bold text-green-700">
                        +{formatCurrency((results.recommendedRate - currentRate) * inputs.hoursPerWeek * (52 - inputs.vacationWeeks))}/year
                      </div>
                      <div className="text-sm text-green-600">
                        By increasing your rate from {formatCurrency(currentRate)}/hr to {formatCurrency(results.recommendedRate)}/hr
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-green-600">
                      Your current rate is higher than recommended. You're pricing well!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RateCalculator