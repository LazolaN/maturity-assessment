import { 
  Question, 
  DimensionId, 
  MATURITY_LIKERT_OPTIONS,
  DEFAULT_LIKERT_OPTIONS,
} from '@/types/assessment';

// =============================================================================
// ASSESSMENT QUESTIONS
// =============================================================================
// Each dimension has 4-6 questions for a balanced assessment.
// Total: ~30 questions (5-7 min completion time)
//
// Question types:
// - likert: Agreement scale (Strongly Disagree → Strongly Agree)
// - maturity: Maturity scale (Not Started → Leading)
// - single_choice: Custom options with score mapping
// =============================================================================

export const QUESTIONS: Question[] = [
  // =========================================================================
  // STRATEGY & ALIGNMENT
  // =========================================================================
  {
    id: 'strat_01',
    dimensionId: 'strategy_alignment',
    type: 'likert',
    text: 'Our organization has a clearly defined AI/data strategy that is documented and communicated.',
    helpText: 'Consider whether there is a formal strategy document that employees can reference.',
    weight: 1.2,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'strat_02',
    dimensionId: 'strategy_alignment',
    type: 'likert',
    text: 'AI and data initiatives are directly aligned with our top business priorities.',
    weight: 1.2,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'strat_03',
    dimensionId: 'strategy_alignment',
    type: 'likert',
    text: 'Executive leadership actively champions and sponsors AI/data initiatives.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'strat_04',
    dimensionId: 'strategy_alignment',
    type: 'likert',
    text: 'We have a clear roadmap for AI/data projects with defined milestones.',
    weight: 1.0,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'strat_05',
    dimensionId: 'strategy_alignment',
    type: 'single_choice',
    text: 'How would you describe budget allocation for AI/data initiatives?',
    weight: 0.8,
    options: [
      { value: 'none', label: 'No dedicated budget', score: 1 },
      { value: 'adhoc', label: 'Ad-hoc funding on project basis', score: 2 },
      { value: 'annual', label: 'Annual budget allocated', score: 3 },
      { value: 'strategic', label: 'Strategic multi-year investment', score: 4 },
      { value: 'priority', label: 'Top priority with protected funding', score: 5 },
    ],
  },

  // =========================================================================
  // DATA FOUNDATION
  // =========================================================================
  {
    id: 'data_01',
    dimensionId: 'data_foundation',
    type: 'likert',
    text: 'Our organization has a centralized or well-integrated data infrastructure.',
    helpText: 'Consider data warehouses, lakes, or unified data platforms.',
    weight: 1.2,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'data_02',
    dimensionId: 'data_foundation',
    type: 'likert',
    text: 'Data quality is actively monitored and maintained across the organization.',
    weight: 1.2,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'data_03',
    dimensionId: 'data_foundation',
    type: 'likert',
    text: 'Employees can easily access the data they need to do their jobs.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'data_04',
    dimensionId: 'data_foundation',
    type: 'likert',
    text: 'We have clear data ownership and stewardship roles defined.',
    weight: 1.0,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'data_05',
    dimensionId: 'data_foundation',
    type: 'single_choice',
    text: 'What best describes your data integration across systems?',
    weight: 0.9,
    options: [
      { value: 'silos', label: 'Mostly siloed, manual transfers', score: 1 },
      { value: 'partial', label: 'Some integrations, many gaps', score: 2 },
      { value: 'automated', label: 'Automated pipelines for key systems', score: 3 },
      { value: 'unified', label: 'Unified data platform with most sources', score: 4 },
      { value: 'realtime', label: 'Real-time, fully integrated ecosystem', score: 5 },
    ],
  },
  {
    id: 'data_06',
    dimensionId: 'data_foundation',
    type: 'likert',
    text: 'We have established data catalogs or documentation for key datasets.',
    weight: 0.8,
    options: MATURITY_LIKERT_OPTIONS,
  },

  // =========================================================================
  // AI ENGINEERING
  // =========================================================================
  {
    id: 'eng_01',
    dimensionId: 'ai_engineering',
    type: 'single_choice',
    text: 'What is the current state of AI/ML in your organization?',
    weight: 1.2,
    options: [
      { value: 'none', label: 'No AI/ML initiatives', score: 1 },
      { value: 'exploring', label: 'Exploring/POC stage', score: 2 },
      { value: 'pilot', label: 'Running pilot projects', score: 3 },
      { value: 'production', label: 'Some models in production', score: 4 },
      { value: 'scaled', label: 'AI at scale across business units', score: 5 },
    ],
  },
  {
    id: 'eng_02',
    dimensionId: 'ai_engineering',
    type: 'likert',
    text: 'We have established MLOps practices for model deployment and monitoring.',
    helpText: 'Consider CI/CD for models, version control, monitoring, etc.',
    weight: 1.1,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'eng_03',
    dimensionId: 'ai_engineering',
    type: 'likert',
    text: 'Our technical infrastructure can support AI/ML workloads effectively.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'eng_04',
    dimensionId: 'ai_engineering',
    type: 'likert',
    text: 'We can efficiently move from experimentation to production with AI models.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'eng_05',
    dimensionId: 'ai_engineering',
    type: 'single_choice',
    text: 'How do you primarily build AI capabilities?',
    weight: 0.8,
    options: [
      { value: 'none', label: 'We don\'t build AI solutions yet', score: 1 },
      { value: 'vendor', label: 'Primarily off-the-shelf vendor solutions', score: 2 },
      { value: 'api', label: 'API integrations (e.g., OpenAI, cloud AI)', score: 3 },
      { value: 'hybrid', label: 'Mix of custom and vendor solutions', score: 4 },
      { value: 'custom', label: 'Primarily custom-built solutions', score: 5 },
    ],
  },

  // =========================================================================
  // GOVERNANCE & RISK
  // =========================================================================
  {
    id: 'gov_01',
    dimensionId: 'governance_risk',
    type: 'likert',
    text: 'We have documented policies for data privacy and protection.',
    weight: 1.2,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'gov_02',
    dimensionId: 'governance_risk',
    type: 'likert',
    text: 'AI ethics and responsible AI principles are formally integrated into our processes.',
    weight: 1.1,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'gov_03',
    dimensionId: 'governance_risk',
    type: 'likert',
    text: 'We have clear processes to identify and mitigate bias in AI systems.',
    weight: 1.0,
    options: MATURITY_LIKERT_OPTIONS,
  },
  {
    id: 'gov_04',
    dimensionId: 'governance_risk',
    type: 'likert',
    text: 'Regulatory compliance (GDPR, CCPA, industry regulations) is actively managed.',
    weight: 1.1,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'gov_05',
    dimensionId: 'governance_risk',
    type: 'single_choice',
    text: 'How mature is your AI governance framework?',
    weight: 1.0,
    options: [
      { value: 'none', label: 'No formal governance', score: 1 },
      { value: 'informal', label: 'Informal guidelines only', score: 2 },
      { value: 'developing', label: 'Governance framework in development', score: 3 },
      { value: 'established', label: 'Established framework with oversight', score: 4 },
      { value: 'mature', label: 'Mature framework with regular audits', score: 5 },
    ],
  },

  // =========================================================================
  // TALENT & CULTURE
  // =========================================================================
  {
    id: 'talent_01',
    dimensionId: 'talent_culture',
    type: 'single_choice',
    text: 'How would you describe your AI/data talent situation?',
    weight: 1.2,
    options: [
      { value: 'none', label: 'No dedicated AI/data roles', score: 1 },
      { value: 'few', label: 'A few specialists, hard to hire', score: 2 },
      { value: 'team', label: 'Small dedicated team', score: 3 },
      { value: 'scaled', label: 'Multiple teams across organization', score: 4 },
      { value: 'center', label: 'Center of excellence with deep bench', score: 5 },
    ],
  },
  {
    id: 'talent_02',
    dimensionId: 'talent_culture',
    type: 'likert',
    text: 'Data literacy training is available and encouraged across the organization.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'talent_03',
    dimensionId: 'talent_culture',
    type: 'likert',
    text: 'There is strong collaboration between technical teams and business stakeholders.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'talent_04',
    dimensionId: 'talent_culture',
    type: 'likert',
    text: 'Leadership demonstrates data-driven decision making.',
    weight: 0.9,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'talent_05',
    dimensionId: 'talent_culture',
    type: 'likert',
    text: 'Employees are generally enthusiastic about AI adoption.',
    helpText: 'Consider the cultural readiness and resistance to change.',
    weight: 0.8,
    options: DEFAULT_LIKERT_OPTIONS,
  },

  // =========================================================================
  // BUSINESS VALUE & IMPACT
  // =========================================================================
  {
    id: 'value_01',
    dimensionId: 'business_value',
    type: 'single_choice',
    text: 'How do you measure ROI on AI/data investments?',
    weight: 1.2,
    options: [
      { value: 'none', label: 'We don\'t measure ROI', score: 1 },
      { value: 'adhoc', label: 'Ad-hoc, case-by-case assessment', score: 2 },
      { value: 'basic', label: 'Basic metrics tracked', score: 3 },
      { value: 'framework', label: 'Formal measurement framework', score: 4 },
      { value: 'integrated', label: 'Fully integrated with business KPIs', score: 5 },
    ],
  },
  {
    id: 'value_02',
    dimensionId: 'business_value',
    type: 'likert',
    text: 'AI/data projects have delivered measurable business outcomes.',
    weight: 1.1,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'value_03',
    dimensionId: 'business_value',
    type: 'likert',
    text: 'We effectively prioritize AI use cases based on business impact potential.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'value_04',
    dimensionId: 'business_value',
    type: 'likert',
    text: 'Insights from data/AI are regularly used in strategic decisions.',
    weight: 1.0,
    options: DEFAULT_LIKERT_OPTIONS,
  },
  {
    id: 'value_05',
    dimensionId: 'business_value',
    type: 'single_choice',
    text: 'What percentage of business processes leverage AI or advanced analytics?',
    weight: 0.9,
    options: [
      { value: 'none', label: 'Less than 5%', score: 1 },
      { value: 'low', label: '5-15%', score: 2 },
      { value: 'moderate', label: '15-30%', score: 3 },
      { value: 'high', label: '30-50%', score: 4 },
      { value: 'pervasive', label: 'More than 50%', score: 5 },
    ],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all questions for a specific dimension
 */
export function getQuestionsByDimension(dimensionId: DimensionId): Question[] {
  return QUESTIONS.filter((q) => q.dimensionId === dimensionId);
}

/**
 * Get a question by ID
 */
export function getQuestionById(questionId: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === questionId);
}

/**
 * Get the total number of questions
 */
export function getTotalQuestionCount(): number {
  return QUESTIONS.length;
}

/**
 * Get question counts by dimension
 */
export function getQuestionCountByDimension(): Record<DimensionId, number> {
  return QUESTIONS.reduce((acc, q) => {
    acc[q.dimensionId] = (acc[q.dimensionId] || 0) + 1;
    return acc;
  }, {} as Record<DimensionId, number>);
}

/**
 * Get questions organized by dimension (for stepper UI)
 */
export function getQuestionsGroupedByDimension(): Record<DimensionId, Question[]> {
  return QUESTIONS.reduce((acc, q) => {
    if (!acc[q.dimensionId]) {
      acc[q.dimensionId] = [];
    }
    acc[q.dimensionId].push(q);
    return acc;
  }, {} as Record<DimensionId, Question[]>);
}

/**
 * Calculate estimated completion time (in minutes)
 * Assumes ~15 seconds per question
 */
export function getEstimatedCompletionTime(): number {
  return Math.ceil((QUESTIONS.length * 15) / 60);
}
