// Rate calculation engine for freelancer pricing

export interface CalculatorInputs {
  desiredAnnualIncome: number;
  hoursPerWeek: number;
  vacationWeeks: number;
  businessExpensesPercent: number;
  profitMarginPercent: number;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  industry: 'design' | 'development' | 'writing' | 'marketing' | 'consulting' | 'other';
  location: 'low' | 'medium' | 'high'; // cost of living
}

export interface OutcomeBasedInputs {
  estimatedProjectValue: number;  // Total value the project delivers to client
  estimatedProjectHours: number;  // Hours to complete the project
  valueCapturePercent: number;    // % of client value you capture (typically 10-30%)
}

export interface OutcomeBasedResults {
  valueBasedRate: number;           // Hourly rate derived from project value
  valueBasedProjectTotal: number;   // Total project fee based on value pricing
  valuePremiumPercent: number;      // How much more than cost-based rate (%)
  effectiveMultiplier: number;      // Value rate / recommended rate
  clientROI: number;                // Client's return: value received vs fee paid
}

export interface CalculatorResults {
  minimumRate: number;
  recommendedRate: number;
  premiumRate: number;
  smallProjectRange: { min: number; max: number };
  mediumProjectRange: { min: number; max: number };
  largeProjectRange: { min: number; max: number };
  annualRevenueProjection: number;
  confidenceScore: number;
  marketComparison: 'below' | 'average' | 'above';
}

// Experience level multipliers
const EXPERIENCE_MULTIPLIERS = {
  beginner: 0.8,
  intermediate: 1.0,
  expert: 1.4
};

// Industry multipliers based on market rates
const INDUSTRY_MULTIPLIERS = {
  design: 1.0,
  development: 1.3,
  writing: 0.7,
  marketing: 1.1,
  consulting: 1.5,
  other: 1.0
};

// Cost of living multipliers
const LOCATION_MULTIPLIERS = {
  low: 0.7,   // Small towns, rural areas
  medium: 1.0, // Mid-size cities
  high: 1.4    // Major cities (SF, NYC, etc.)
};

// Market data for comparison (average hourly rates by industry)
const MARKET_RATES = {
  design: 65,
  development: 85,
  writing: 45,
  marketing: 70,
  consulting: 95,
  other: 60
};

export function calculateRates(inputs: CalculatorInputs): CalculatorResults {
  const {
    desiredAnnualIncome,
    hoursPerWeek,
    vacationWeeks,
    businessExpensesPercent,
    profitMarginPercent,
    experienceLevel,
    industry,
    location
  } = inputs;

  // Calculate working weeks and hours
  const workingWeeks = 52 - vacationWeeks;
  const annualWorkingHours = workingWeeks * hoursPerWeek;

  // Calculate minimum rate (break-even)
  const expensesAmount = desiredAnnualIncome * (businessExpensesPercent / 100);
  const totalNeeded = desiredAnnualIncome + expensesAmount;
  const baseMinimumRate = totalNeeded / annualWorkingHours;

  // Apply profit margin for recommended rate
  const profitMultiplier = 1 + (profitMarginPercent / 100);
  const baseRecommendedRate = baseMinimumRate * profitMultiplier;

  // Apply experience and industry multipliers
  const experienceMultiplier = EXPERIENCE_MULTIPLIERS[experienceLevel];
  const industryMultiplier = INDUSTRY_MULTIPLIERS[industry];
  const locationMultiplier = LOCATION_MULTIPLIERS[location];

  const totalMultiplier = experienceMultiplier * industryMultiplier * locationMultiplier;

  const minimumRate = Math.round(baseMinimumRate * totalMultiplier);
  const recommendedRate = Math.round(baseRecommendedRate * totalMultiplier);
  const premiumRate = Math.round(recommendedRate * 1.5);

  // Calculate project ranges
  const smallProjectRange = {
    min: recommendedRate * 8,   // 8 hours minimum
    max: recommendedRate * 25   // 25 hours maximum
  };

  const mediumProjectRange = {
    min: recommendedRate * 25,  // 25 hours minimum  
    max: recommendedRate * 80   // 80 hours maximum
  };

  const largeProjectRange = {
    min: recommendedRate * 80,  // 80 hours minimum
    max: recommendedRate * 200  // 200+ hours
  };

  // Annual revenue projection at recommended rate
  const annualRevenueProjection = recommendedRate * annualWorkingHours;

  // Calculate confidence score (0-100)
  let confidenceScore = 70; // Base score

  // Adjust based on input quality
  if (hoursPerWeek >= 20 && hoursPerWeek <= 40) confidenceScore += 10;
  if (vacationWeeks >= 2 && vacationWeeks <= 6) confidenceScore += 5;
  if (businessExpensesPercent >= 15 && businessExpensesPercent <= 35) confidenceScore += 5;
  if (profitMarginPercent >= 15 && profitMarginPercent <= 30) confidenceScore += 10;

  confidenceScore = Math.min(100, confidenceScore);

  // Market comparison
  const marketRate = MARKET_RATES[industry];
  let marketComparison: 'below' | 'average' | 'above';
  
  if (recommendedRate < marketRate * 0.8) {
    marketComparison = 'below';
  } else if (recommendedRate > marketRate * 1.2) {
    marketComparison = 'above';
  } else {
    marketComparison = 'average';
  }

  return {
    minimumRate,
    recommendedRate,
    premiumRate,
    smallProjectRange,
    mediumProjectRange,
    largeProjectRange,
    annualRevenueProjection,
    confidenceScore,
    marketComparison
  };
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Calculate outcome-based (value-based) pricing metrics
export function calculateOutcomeBasedRate(
  outcomeInputs: OutcomeBasedInputs,
  recommendedRate: number
): OutcomeBasedResults {
  const { estimatedProjectValue, estimatedProjectHours, valueCapturePercent } = outcomeInputs;

  // Value-based project total: what you should charge based on value delivered
  const valueBasedProjectTotal = Math.round(estimatedProjectValue * (valueCapturePercent / 100));

  // Derive an hourly rate from the value-based total
  const valueBasedRate = Math.round(valueBasedProjectTotal / estimatedProjectHours);

  // How much more is the value-based rate vs the cost-based rate
  const valuePremiumPercent = recommendedRate > 0
    ? Math.round(((valueBasedRate - recommendedRate) / recommendedRate) * 100)
    : 0;

  // Effective multiplier (value rate / cost-based rate)
  const effectiveMultiplier = recommendedRate > 0
    ? Math.round((valueBasedRate / recommendedRate) * 100) / 100
    : 0;

  // Client ROI: how much value they get per dollar spent
  const clientROI = valueBasedProjectTotal > 0
    ? Math.round(((estimatedProjectValue - valueBasedProjectTotal) / valueBasedProjectTotal) * 100)
    : 0;

  return {
    valueBasedRate,
    valueBasedProjectTotal,
    valuePremiumPercent,
    effectiveMultiplier,
    clientROI
  };
}

// Helper function to calculate potential earnings increase
export function calculateEarningsIncrease(
  currentRate: number,
  recommendedRate: number,
  hoursPerWeek: number,
  workingWeeks: number = 46
): { weeklyIncrease: number; annualIncrease: number } {
  const weeklyIncrease = (recommendedRate - currentRate) * hoursPerWeek;
  const annualIncrease = weeklyIncrease * workingWeeks;
  
  return { weeklyIncrease, annualIncrease };
}