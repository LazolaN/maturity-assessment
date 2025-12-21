// =============================================================================
// CORE ENUMS & CONSTANTS
// =============================================================================

export const DIMENSIONS = [
  'strategy_alignment',
  'data_foundation',
  'ai_engineering',
  'governance_risk',
  'talent_culture',
  'business_value',
] as const;

export type DimensionId = (typeof DIMENSIONS)[number];

export const DIMENSION_META: Record<DimensionId, DimensionMetadata> = {
  strategy_alignment: {
    id: 'strategy_alignment',
    label: 'Strategy & Alignment',
    shortLabel: 'Strategy',
    description: 'How well AI/data initiatives align with business objectives',
    icon: 'Target', // Lucide icon name
    weight: 1.0,
  },
  data_foundation: {
    id: 'data_foundation',
    label: 'Data Foundation',
    shortLabel: 'Data',
    description: 'Quality, accessibility, and infrastructure of your data assets',
    icon: 'Database',
    weight: 1.2, // Slightly higher weight - foundational
  },
  ai_engineering: {
    id: 'ai_engineering',
    label: 'AI Engineering',
    shortLabel: 'Engineering',
    description: 'Technical capabilities for building and deploying AI solutions',
    icon: 'Cpu',
    weight: 1.0,
  },
  governance_risk: {
    id: 'governance_risk',
    label: 'Governance & Risk',
    shortLabel: 'Governance',
    description: 'Policies, ethics, and risk management for AI/data initiatives',
    icon: 'Shield',
    weight: 1.1,
  },
  talent_culture: {
    id: 'talent_culture',
    label: 'Talent & Culture',
    shortLabel: 'Talent',
    description: 'Skills, training, and organizational readiness for AI adoption',
    icon: 'Users',
    weight: 0.9,
  },
  business_value: {
    id: 'business_value',
    label: 'Business Value & Impact',
    shortLabel: 'Value',
    description: 'Measurable outcomes and ROI from AI/data investments',
    icon: 'TrendingUp',
    weight: 1.0,
  },
};

export const INDUSTRIES = [
  'technology',
  'financial_services',
  'healthcare',
  'retail_ecommerce',
  'manufacturing',
  'professional_services',
  'other',
] as const;

export type IndustryId = (typeof INDUSTRIES)[number];

export const INDUSTRY_META: Record<IndustryId, IndustryMetadata> = {
  technology: {
    id: 'technology',
    label: 'Technology & Software',
    icon: 'Code',
  },
  financial_services: {
    id: 'financial_services',
    label: 'Financial Services',
    icon: 'Landmark',
  },
  healthcare: {
    id: 'healthcare',
    label: 'Healthcare & Life Sciences',
    icon: 'Heart',
  },
  retail_ecommerce: {
    id: 'retail_ecommerce',
    label: 'Retail & E-commerce',
    icon: 'ShoppingCart',
  },
  manufacturing: {
    id: 'manufacturing',
    label: 'Manufacturing & Industrial',
    icon: 'Factory',
  },
  professional_services: {
    id: 'professional_services',
    label: 'Professional Services',
    icon: 'Briefcase',
  },
  other: {
    id: 'other',
    label: 'Other',
    icon: 'Building',
  },
};

export const COMPANY_SIZES = [
  'startup',
  'smb',
  'mid_market',
  'enterprise',
] as const;

export type CompanySizeId = (typeof COMPANY_SIZES)[number];

export const COMPANY_SIZE_META: Record<CompanySizeId, CompanySizeMetadata> = {
  startup: {
    id: 'startup',
    label: 'Startup',
    description: '1-50 employees',
    employeeRange: [1, 50],
  },
  smb: {
    id: 'smb',
    label: 'Small-Medium Business',
    description: '51-200 employees',
    employeeRange: [51, 200],
  },
  mid_market: {
    id: 'mid_market',
    label: 'Mid-Market',
    description: '201-1000 employees',
    employeeRange: [201, 1000],
  },
  enterprise: {
    id: 'enterprise',
    label: 'Enterprise',
    description: '1000+ employees',
    employeeRange: [1001, Infinity],
  },
};

// =============================================================================
// METADATA TYPES
// =============================================================================

export interface DimensionMetadata {
  id: DimensionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  weight: number; // For weighted scoring (1.0 = normal)
}

export interface IndustryMetadata {
  id: IndustryId;
  label: string;
  icon: string;
}

export interface CompanySizeMetadata {
  id: CompanySizeId;
  label: string;
  description: string;
  employeeRange: [number, number];
}

// =============================================================================
// QUESTION TYPES
// =============================================================================

export type QuestionType = 'likert' | 'single_choice' | 'multi_choice';

export interface LikertOption {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
}

export interface ChoiceOption {
  value: string;
  label: string;
  score: number; // Maps to 1-5 scale for scoring
}

export interface Question {
  id: string;
  dimensionId: DimensionId;
  type: QuestionType;
  text: string;
  helpText?: string; // Optional tooltip/explanation
  weight: number; // Weight within dimension (1.0 = normal)
  options: LikertOption[] | ChoiceOption[];
  // For conditional logic (future use)
  dependsOn?: {
    questionId: string;
    condition: 'equals' | 'greaterThan' | 'lessThan';
    value: number | string;
  };
}

// Default Likert scale options (reusable)
export const DEFAULT_LIKERT_OPTIONS: LikertOption[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export const MATURITY_LIKERT_OPTIONS: LikertOption[] = [
  { value: 1, label: 'Not Started' },
  { value: 2, label: 'Early Stage' },
  { value: 3, label: 'Developing' },
  { value: 4, label: 'Mature' },
  { value: 5, label: 'Leading' },
];

// =============================================================================
// ANSWER & RESPONSE TYPES
// =============================================================================

export interface Answer {
  questionId: string;
  value: number | string | string[]; // number for likert, string(s) for choice
  answeredAt: Date;
}

export interface AssessmentResponse {
  id: string; // Client-generated UUID
  startedAt: Date;
  completedAt?: Date;
  
  // Context
  industry: IndustryId;
  companySize: CompanySizeId;
  
  // Answers keyed by questionId for fast lookup
  answers: Record<string, Answer>;
  
  // Current progress
  currentDimensionIndex: number;
  currentQuestionIndex: number;
}

// =============================================================================
// SCORING & RESULTS TYPES
// =============================================================================

export interface DimensionScore {
  dimensionId: DimensionId;
  rawScore: number; // Simple average (1-5)
  weightedScore: number; // After applying question weights
  answeredCount: number;
  totalQuestions: number;
  completionRate: number; // 0-1
}

export interface OverallScore {
  raw: number; // Simple average across dimensions
  weighted: number; // After applying dimension weights
  maturityLevel: MaturityLevel;
}

export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export const MATURITY_LEVEL_META: Record<MaturityLevel, MaturityLevelMetadata> = {
  1: {
    level: 1,
    label: 'Initial',
    description: 'Ad-hoc processes, limited data awareness',
    color: '#EF4444', // red-500
    recommendation: 'Focus on building foundational data practices',
  },
  2: {
    level: 2,
    label: 'Developing',
    description: 'Basic processes emerging, siloed initiatives',
    color: '#F97316', // orange-500
    recommendation: 'Standardize processes and break down data silos',
  },
  3: {
    level: 3,
    label: 'Defined',
    description: 'Documented processes, cross-functional awareness',
    color: '#EAB308', // yellow-500
    recommendation: 'Scale successful pilots and build governance',
  },
  4: {
    level: 4,
    label: 'Managed',
    description: 'Measured outcomes, systematic optimization',
    color: '#22C55E', // green-500
    recommendation: 'Focus on advanced analytics and AI adoption',
  },
  5: {
    level: 5,
    label: 'Optimizing',
    description: 'Continuous innovation, AI-driven decisions',
    color: '#3B82F6', // blue-500
    recommendation: 'Lead industry transformation and innovation',
  },
};

export interface MaturityLevelMetadata {
  level: MaturityLevel;
  label: string;
  description: string;
  color: string;
  recommendation: string;
}

export interface AssessmentResult {
  responseId: string;
  calculatedAt: Date;
  
  // Scores
  dimensionScores: Record<DimensionId, DimensionScore>;
  overallScore: OverallScore;
  
  // Benchmark comparison
  industryBenchmark: IndustryBenchmark;
  
  // Generated insights (rule-based)
  strengths: DimensionId[]; // Top 2 dimensions
  weaknesses: DimensionId[]; // Bottom 2 dimensions
  recommendations: Recommendation[];
}

// =============================================================================
// BENCHMARKING TYPES
// =============================================================================

export interface IndustryBenchmark {
  industryId: IndustryId;
  companySize: CompanySizeId;
  sampleSize: number; // For credibility display
  dimensionAverages: Record<DimensionId, number>;
  overallAverage: number;
}

// =============================================================================
// RECOMMENDATION TYPES
// =============================================================================

export type RecommendationPriority = 'high' | 'medium' | 'low';
export type RecommendationCategory = 'quick_win' | 'strategic' | 'foundational';

export interface Recommendation {
  id: string;
  dimensionId: DimensionId;
  title: string;
  description: string;
  priority: RecommendationPriority;
  category: RecommendationCategory;
  
  // Conditional display
  scoreRange: {
    min: number; // Show if dimension score >= min
    max: number; // Show if dimension score <= max
  };
  
  // For future: link to resources
  resourceUrl?: string;
}

// =============================================================================
// LEAD CAPTURE TYPES
// =============================================================================

export interface LeadInfo {
  email: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  company?: string;
  
  // Consent
  marketingOptIn: boolean;
  
  // Context from assessment
  industry: IndustryId;
  companySize: CompanySizeId;
  overallScore: number;
  maturityLevel: MaturityLevel;
  
  // Tracking
  submittedAt: Date;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// =============================================================================
// UI STATE TYPES (for React context/state management)
// =============================================================================

export type AssessmentStep = 
  | 'intro'
  | 'context' // Industry & company size selection
  | 'questions'
  | 'calculating' // Brief loading state
  | 'results_teaser'
  | 'lead_capture'
  | 'results_full';

export interface AssessmentState {
  step: AssessmentStep;
  response: AssessmentResponse | null;
  result: AssessmentResult | null;
  leadInfo: LeadInfo | null;
  
  // UI state
  isSubmitting: boolean;
  error: string | null;
}

// =============================================================================
// HELPER TYPE GUARDS
// =============================================================================

export function isLikertOption(option: LikertOption | ChoiceOption): option is LikertOption {
  return typeof option.value === 'number' && option.value >= 1 && option.value <= 5;
}

export function isChoiceOption(option: LikertOption | ChoiceOption): option is ChoiceOption {
  return 'score' in option;
}

export function getMaturityLevel(score: number): MaturityLevel {
  if (score < 1.5) return 1;
  if (score < 2.5) return 2;
  if (score < 3.5) return 3;
  if (score < 4.5) return 4;
  return 5;
}
