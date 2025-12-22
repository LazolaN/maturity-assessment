import { 
  Recommendation, 
  DimensionId, 
  DimensionScore,
  RecommendationPriority,
  RecommendationCategory,
  DIMENSION_META,
} from '@/types/assessment';

// =============================================================================
// EXTENDED RECOMMENDATION TYPE FOR ROADMAP
// =============================================================================

export interface RoadmapInitiative extends Recommendation {
  // Timeline
  timeframe: '30_days' | '90_days' | '6_months' | '12_months';
  estimatedDuration: string; // e.g., "2-4 weeks"
  
  // Effort & Impact
  effortLevel: 'low' | 'medium' | 'high';
  impactLevel: 'low' | 'medium' | 'high';
  
  // Dependencies
  dependencies?: string[]; // IDs of other initiatives that should come first
  
  // Deliverables
  keyDeliverables: string[];
  
  // Success metrics
  successMetrics: string[];
}

// =============================================================================
// ROADMAP INITIATIVES DATABASE
// =============================================================================

export const ROADMAP_INITIATIVES: RoadmapInitiative[] = [
  // =========================================================================
  // STRATEGY & ALIGNMENT INITIATIVES
  // =========================================================================
  
  // 30-day initiatives
  {
    id: 'strat_init_01',
    dimensionId: 'strategy_alignment',
    title: 'Executive AI Vision Workshop',
    description: 'Facilitate a half-day workshop with leadership to define the organisation\'s AI vision and identify strategic priorities.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '1-2 weeks',
    effortLevel: 'low',
    impactLevel: 'high',
    keyDeliverables: [
      'AI Vision Statement document',
      'Strategic priority matrix',
      'Executive alignment scorecard'
    ],
    successMetrics: [
      'Leadership sign-off on AI vision',
      '100% executive participation',
      'Documented strategic priorities'
    ]
  },
  {
    id: 'strat_init_02',
    dimensionId: 'strategy_alignment',
    title: 'Quick-Win Use Case Identification',
    description: 'Document 3-5 high-value AI use cases with clear business impact, available data, and feasibility assessment.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-3 weeks',
    effortLevel: 'low',
    impactLevel: 'high',
    keyDeliverables: [
      'Use case catalogue with scoring',
      'Business case for top 3 use cases',
      'Data availability assessment'
    ],
    successMetrics: [
      'Minimum 5 use cases documented',
      'Business owner assigned to each',
      'ROI estimate for top 3'
    ]
  },

  // 90-day initiatives
  {
    id: 'strat_init_03',
    dimensionId: 'strategy_alignment',
    title: 'AI Steering Committee Formation',
    description: 'Establish a cross-functional AI steering committee with clear governance structure, meeting cadence, and decision rights.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 3.5 },
    timeframe: '90_days',
    estimatedDuration: '4-6 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    dependencies: ['strat_init_01'],
    keyDeliverables: [
      'Committee charter and terms of reference',
      'Member roles and responsibilities',
      'Meeting schedule and decision framework'
    ],
    successMetrics: [
      'Committee operational with first meeting held',
      'Representation from all key business units',
      'First set of decisions documented'
    ]
  },
  {
    id: 'strat_init_04',
    dimensionId: 'strategy_alignment',
    title: '12-Month AI Roadmap Development',
    description: 'Create a phased roadmap with quarterly milestones, resource requirements, budget allocation, and success metrics.',
    priority: 'high',
    category: 'strategic',
    scoreRange: { min: 0, max: 3.5 },
    timeframe: '90_days',
    estimatedDuration: '6-8 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    dependencies: ['strat_init_01', 'strat_init_02'],
    keyDeliverables: [
      'Phased implementation roadmap',
      'Resource and budget plan',
      'Risk assessment and mitigation plan',
      'KPI dashboard design'
    ],
    successMetrics: [
      'Board/Exco approval of roadmap',
      'Budget allocated for Year 1',
      'Project teams identified'
    ]
  },

  // =========================================================================
  // DATA FOUNDATION INITIATIVES
  // =========================================================================
  
  {
    id: 'data_init_01',
    dimensionId: 'data_foundation',
    title: 'Critical Data Asset Inventory',
    description: 'Conduct a comprehensive inventory of critical data assets, including source systems, owners, quality levels, and accessibility.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-3 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    keyDeliverables: [
      'Data asset register',
      'Data owner assignments',
      'Quality assessment summary',
      'Access control matrix'
    ],
    successMetrics: [
      'Top 20 data assets documented',
      'Data owners assigned for each',
      'Quality baseline established'
    ]
  },
  {
    id: 'data_init_02',
    dimensionId: 'data_foundation',
    title: 'Data Quality Quick Assessment',
    description: 'Implement basic data quality checks on your most critical datasets: completeness, accuracy, and consistency validation.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-4 weeks',
    effortLevel: 'low',
    impactLevel: 'medium',
    keyDeliverables: [
      'Data quality rules for top 5 datasets',
      'Automated validation scripts',
      'Quality scorecard template'
    ],
    successMetrics: [
      'Quality scores for top 5 datasets',
      'Critical issues identified and logged',
      'Baseline metrics established'
    ]
  },
  {
    id: 'data_init_03',
    dimensionId: 'data_foundation',
    title: 'Data Governance Framework Design',
    description: 'Design a fit-for-purpose data governance framework including policies, roles, processes, and tools requirements.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 3.0 },
    timeframe: '90_days',
    estimatedDuration: '6-8 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    dependencies: ['data_init_01'],
    keyDeliverables: [
      'Data governance policy document',
      'RACI matrix for data roles',
      'Data stewardship guidelines',
      'Tool requirements specification'
    ],
    successMetrics: [
      'Policy approved by steering committee',
      'Data stewards appointed',
      'Governance processes documented'
    ]
  },
  {
    id: 'data_init_04',
    dimensionId: 'data_foundation',
    title: 'Master Data Management Strategy',
    description: 'Develop a strategy for managing master data entities (customer, product, vendor) including golden record rules and integration approach.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 2.0, max: 4.0 },
    timeframe: '6_months',
    estimatedDuration: '8-12 weeks',
    effortLevel: 'high',
    impactLevel: 'high',
    dependencies: ['data_init_01', 'data_init_03'],
    keyDeliverables: [
      'MDM strategy document',
      'Data model for master entities',
      'Integration architecture design',
      'Vendor evaluation (if applicable)'
    ],
    successMetrics: [
      'Strategy approved',
      'Pilot entity selected',
      'Architecture signed off'
    ]
  },

  // =========================================================================
  // AI ENGINEERING INITIATIVES
  // =========================================================================
  
  {
    id: 'eng_init_01',
    dimensionId: 'ai_engineering',
    title: 'Cloud AI Services Pilot',
    description: 'Evaluate and pilot pre-built AI services (Azure AI, AWS AI, Google Cloud AI) for 1-2 identified use cases.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '3-4 weeks',
    effortLevel: 'low',
    impactLevel: 'medium',
    keyDeliverables: [
      'Cloud AI service evaluation matrix',
      'Proof of concept for 1 use case',
      'Cost-benefit analysis'
    ],
    successMetrics: [
      'POC completed successfully',
      'Cost projections validated',
      'Go/no-go decision made'
    ]
  },
  {
    id: 'eng_init_02',
    dimensionId: 'ai_engineering',
    title: 'AI/ML Sandbox Environment Setup',
    description: 'Provision a secure sandbox environment for data scientists to experiment with data and models without impacting production.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-3 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    keyDeliverables: [
      'Sandbox environment provisioned',
      'Access controls configured',
      'Sample datasets loaded',
      'User onboarding guide'
    ],
    successMetrics: [
      'Environment operational',
      'First users onboarded',
      'Security review completed'
    ]
  },
  {
    id: 'eng_init_03',
    dimensionId: 'ai_engineering',
    title: 'MLOps Foundation Implementation',
    description: 'Implement basic MLOps practices: model versioning, experiment tracking, automated testing, and deployment pipelines.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 2.0, max: 4.0 },
    timeframe: '90_days',
    estimatedDuration: '8-10 weeks',
    effortLevel: 'high',
    impactLevel: 'high',
    dependencies: ['eng_init_02'],
    keyDeliverables: [
      'MLOps platform selection and setup',
      'CI/CD pipeline for ML models',
      'Model registry implementation',
      'Monitoring dashboard'
    ],
    successMetrics: [
      'First model deployed via pipeline',
      'Experiment tracking operational',
      'Model versioning in use'
    ]
  },

  // =========================================================================
  // GOVERNANCE & RISK INITIATIVES
  // =========================================================================
  
  {
    id: 'gov_init_01',
    dimensionId: 'governance_risk',
    title: 'Data Privacy Policy Development (POPIA)',
    description: 'Develop comprehensive data privacy policies aligned with POPIA requirements, including consent management and data subject rights.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '3-4 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    keyDeliverables: [
      'Data privacy policy document',
      'POPIA compliance checklist',
      'Consent management guidelines',
      'Data subject request process'
    ],
    successMetrics: [
      'Policy approved by legal',
      'Staff awareness training planned',
      'Compliance gaps documented'
    ]
  },
  {
    id: 'gov_init_02',
    dimensionId: 'governance_risk',
    title: 'Data Access Audit & RBAC Implementation',
    description: 'Conduct audit of current data access permissions and implement role-based access controls for sensitive data.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-3 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    keyDeliverables: [
      'Access audit report',
      'Role definitions document',
      'RBAC implementation plan',
      'Remediation action list'
    ],
    successMetrics: [
      'Audit completed for critical systems',
      'Excess permissions revoked',
      'RBAC roles defined'
    ]
  },
  {
    id: 'gov_init_03',
    dimensionId: 'governance_risk',
    title: 'AI Ethics Framework Development',
    description: 'Establish an AI ethics framework covering fairness, transparency, accountability, and bias mitigation guidelines.',
    priority: 'medium',
    category: 'foundational',
    scoreRange: { min: 2.0, max: 4.0 },
    timeframe: '90_days',
    estimatedDuration: '6-8 weeks',
    effortLevel: 'medium',
    impactLevel: 'medium',
    dependencies: ['gov_init_01'],
    keyDeliverables: [
      'AI ethics policy document',
      'Bias assessment checklist',
      'Model explainability guidelines',
      'Ethics review process'
    ],
    successMetrics: [
      'Framework approved',
      'First model reviewed against framework',
      'Ethics board/committee formed'
    ]
  },

  // =========================================================================
  // TALENT & CULTURE INITIATIVES
  // =========================================================================
  
  {
    id: 'talent_init_01',
    dimensionId: 'talent_culture',
    title: 'AI Champions Network Launch',
    description: 'Identify and empower AI champions across business units to advocate for AI adoption and bridge technical/business teams.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-3 weeks',
    effortLevel: 'low',
    impactLevel: 'high',
    keyDeliverables: [
      'Champion identification criteria',
      'Champion network roster',
      'Onboarding programme outline',
      'Communication plan'
    ],
    successMetrics: [
      'Minimum 1 champion per business unit',
      'First network meeting held',
      'Use case pipeline from champions'
    ]
  },
  {
    id: 'talent_init_02',
    dimensionId: 'talent_culture',
    title: 'Data Literacy Programme Design',
    description: 'Design a tiered data literacy programme covering basic data skills for all staff to advanced analytics for power users.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 3.0 },
    timeframe: '90_days',
    estimatedDuration: '6-8 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    dependencies: ['talent_init_01'],
    keyDeliverables: [
      'Training curriculum by level',
      'Learning path definitions',
      'Content/vendor evaluation',
      'Pilot programme plan'
    ],
    successMetrics: [
      'Curriculum approved',
      'First cohort enrolled',
      'Completion targets set'
    ]
  },
  {
    id: 'talent_init_03',
    dimensionId: 'talent_culture',
    title: 'AI Skills Gap Assessment',
    description: 'Assess current AI/ML skills across the organisation and develop a talent strategy including build/buy/borrow decisions.',
    priority: 'medium',
    category: 'foundational',
    scoreRange: { min: 0, max: 3.5 },
    timeframe: '90_days',
    estimatedDuration: '4-6 weeks',
    effortLevel: 'medium',
    impactLevel: 'medium',
    keyDeliverables: [
      'Skills assessment results',
      'Gap analysis report',
      'Talent strategy document',
      'Hiring/upskilling plan'
    ],
    successMetrics: [
      'Assessment completed',
      'Priority gaps identified',
      'First hires/training initiated'
    ]
  },

  // =========================================================================
  // BUSINESS VALUE INITIATIVES
  // =========================================================================
  
  {
    id: 'value_init_01',
    dimensionId: 'business_value',
    title: 'AI Value Measurement Framework',
    description: 'Establish a standardised framework for measuring and reporting on AI initiative ROI and business value.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
    timeframe: '30_days',
    estimatedDuration: '2-3 weeks',
    effortLevel: 'low',
    impactLevel: 'high',
    keyDeliverables: [
      'Value measurement framework document',
      'KPI definitions by use case type',
      'ROI calculation templates',
      'Reporting dashboard design'
    ],
    successMetrics: [
      'Framework approved by CFO/COO',
      'Applied to first use case',
      'Baseline metrics captured'
    ]
  },
  {
    id: 'value_init_02',
    dimensionId: 'business_value',
    title: 'First AI Quick-Win Implementation',
    description: 'Implement the highest-priority, lowest-risk AI use case to demonstrate value and build organisational confidence.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 3.0 },
    timeframe: '90_days',
    estimatedDuration: '8-12 weeks',
    effortLevel: 'medium',
    impactLevel: 'high',
    dependencies: ['strat_init_02', 'value_init_01'],
    keyDeliverables: [
      'Working AI solution in production',
      'User adoption metrics',
      'Value realisation report',
      'Lessons learned document'
    ],
    successMetrics: [
      'Solution live in production',
      'Target user adoption reached',
      'ROI validated against baseline'
    ]
  },
  {
    id: 'value_init_03',
    dimensionId: 'business_value',
    title: 'AI Use Case Portfolio Management',
    description: 'Establish a systematic approach to identifying, prioritising, and tracking AI opportunities across the organisation.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 2.0, max: 4.0 },
    timeframe: '6_months',
    estimatedDuration: '6-8 weeks',
    effortLevel: 'medium',
    impactLevel: 'medium',
    dependencies: ['strat_init_03', 'value_init_01'],
    keyDeliverables: [
      'Use case intake process',
      'Prioritisation framework',
      'Portfolio tracking dashboard',
      'Stage-gate process'
    ],
    successMetrics: [
      'Process operational',
      'Pipeline of 10+ use cases',
      'First batch prioritised'
    ]
  },
];

// =============================================================================
// GAP ANALYSIS TYPES
// =============================================================================

export interface GapAnalysis {
  dimensionId: DimensionId;
  currentScore: number;
  targetScore: number; // Industry benchmark or aspirational target
  gap: number;
  gapSeverity: 'critical' | 'significant' | 'moderate' | 'minor' | 'on_track';
  priorityRank: number; // 1 = highest priority
}

export function calculateGapAnalysis(
  dimensionScores: Record<DimensionId, DimensionScore>,
  benchmarkScores: Record<DimensionId, number>,
  targetMultiplier: number = 1.0 // 1.0 = match benchmark, 1.2 = exceed by 20%
): GapAnalysis[] {
  const gaps: GapAnalysis[] = [];

  for (const [dimId, scoreData] of Object.entries(dimensionScores)) {
    const dimensionId = dimId as DimensionId;
    const currentScore = scoreData.weightedScore;
    const targetScore = Math.min(5, benchmarkScores[dimensionId] * targetMultiplier);
    const gap = targetScore - currentScore;

    let gapSeverity: GapAnalysis['gapSeverity'];
    if (gap <= 0) gapSeverity = 'on_track';
    else if (gap < 0.5) gapSeverity = 'minor';
    else if (gap < 1.0) gapSeverity = 'moderate';
    else if (gap < 1.5) gapSeverity = 'significant';
    else gapSeverity = 'critical';

    gaps.push({
      dimensionId,
      currentScore,
      targetScore,
      gap,
      gapSeverity,
      priorityRank: 0, // Will be set after sorting
    });
  }

  // Sort by gap size (largest first) and assign priority ranks
  gaps.sort((a, b) => b.gap - a.gap);
  gaps.forEach((g, index) => {
    g.priorityRank = index + 1;
  });

  return gaps;
}

// =============================================================================
// ROADMAP GENERATION
// =============================================================================

export interface RoadmapPhase {
  timeframe: '30_days' | '90_days' | '6_months' | '12_months';
  label: string;
  description: string;
  initiatives: RoadmapInitiative[];
}

export function generateRoadmap(
  dimensionScores: Record<DimensionId, DimensionScore>,
  gapAnalysis: GapAnalysis[]
): RoadmapPhase[] {
  // Get initiatives that match score ranges
  const applicableInitiatives = ROADMAP_INITIATIVES.filter((initiative) => {
    const score = dimensionScores[initiative.dimensionId]?.weightedScore || 0;
    return score >= initiative.scoreRange.min && score <= initiative.scoreRange.max;
  });

  // Prioritise initiatives from dimensions with largest gaps
  const priorityDimensions = gapAnalysis
    .filter((g) => g.gapSeverity !== 'on_track')
    .slice(0, 3)
    .map((g) => g.dimensionId);

  // Sort initiatives: priority dimensions first, then by timeframe
  const sortedInitiatives = applicableInitiatives.sort((a, b) => {
    const aPriority = priorityDimensions.indexOf(a.dimensionId);
    const bPriority = priorityDimensions.indexOf(b.dimensionId);
    
    if (aPriority !== -1 && bPriority === -1) return -1;
    if (aPriority === -1 && bPriority !== -1) return 1;
    
    const timeframeOrder = { '30_days': 0, '90_days': 1, '6_months': 2, '12_months': 3 };
    return timeframeOrder[a.timeframe] - timeframeOrder[b.timeframe];
  });

  // Group by phase
  const phases: RoadmapPhase[] = [
    {
      timeframe: '30_days',
      label: 'Quick Wins (0-30 Days)',
      description: 'Immediate actions to build momentum and demonstrate value',
      initiatives: sortedInitiatives.filter((i) => i.timeframe === '30_days'),
    },
    {
      timeframe: '90_days',
      label: 'Foundation (1-3 Months)',
      description: 'Establish core capabilities and governance structures',
      initiatives: sortedInitiatives.filter((i) => i.timeframe === '90_days'),
    },
    {
      timeframe: '6_months',
      label: 'Scale (3-6 Months)',
      description: 'Expand successful initiatives and deepen capabilities',
      initiatives: sortedInitiatives.filter((i) => i.timeframe === '6_months'),
    },
    {
      timeframe: '12_months',
      label: 'Transform (6-12 Months)',
      description: 'Strategic transformation and advanced capabilities',
      initiatives: sortedInitiatives.filter((i) => i.timeframe === '12_months'),
    },
  ];

  return phases.filter((p) => p.initiatives.length > 0);
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getEffortImpactQuadrant(
  effortLevel: 'low' | 'medium' | 'high',
  impactLevel: 'low' | 'medium' | 'high'
): 'do_first' | 'schedule' | 'delegate' | 'reconsider' {
  if (effortLevel === 'low' && (impactLevel === 'high' || impactLevel === 'medium')) {
    return 'do_first';
  }
  if (effortLevel === 'medium' && impactLevel === 'high') {
    return 'schedule';
  }
  if (effortLevel === 'high' && impactLevel === 'high') {
    return 'schedule';
  }
  if (impactLevel === 'low') {
    return 'reconsider';
  }
  return 'delegate';
}

export function getGapSeverityColor(severity: GapAnalysis['gapSeverity']): string {
  switch (severity) {
    case 'critical': return '#DC2626'; // red-600
    case 'significant': return '#EA580C'; // orange-600
    case 'moderate': return '#CA8A04'; // yellow-600
    case 'minor': return '#16A34A'; // green-600
    case 'on_track': return '#2563EB'; // blue-600
  }
}

export function getTimeframeLabel(timeframe: RoadmapInitiative['timeframe']): string {
  switch (timeframe) {
    case '30_days': return '0-30 Days';
    case '90_days': return '1-3 Months';
    case '6_months': return '3-6 Months';
    case '12_months': return '6-12 Months';
  }
}