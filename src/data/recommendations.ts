import { 
  Recommendation, 
  DimensionId, 
  DimensionScore,
  RecommendationPriority,
  RecommendationCategory,
} from '@/types/assessment';

// =============================================================================
// RECOMMENDATIONS DATABASE
// =============================================================================
// Recommendations are shown based on dimension scores.
// Each recommendation has a scoreRange that determines when it appears.
//
// Categories:
// - quick_win: Can be implemented in < 3 months
// - foundational: Required groundwork for future progress
// - strategic: Long-term transformational initiatives
// =============================================================================

export const RECOMMENDATIONS: Recommendation[] = [
  // =========================================================================
  // STRATEGY & ALIGNMENT RECOMMENDATIONS
  // =========================================================================
  
  // Low score recommendations (1-2.5)
  {
    id: 'strat_rec_01',
    dimensionId: 'strategy_alignment',
    title: 'Define Your AI Vision Statement',
    description: 'Start by articulating a clear AI vision that connects to your business objectives. Involve leadership to ensure buy-in and alignment from the top.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'strat_rec_02',
    dimensionId: 'strategy_alignment',
    title: 'Identify Quick-Win Use Cases',
    description: 'Document 3-5 potential AI use cases with clear business value. Focus on problems that are well-defined with available data.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
  },
  
  // Medium score recommendations (2.5-3.5)
  {
    id: 'strat_rec_03',
    dimensionId: 'strategy_alignment',
    title: 'Develop a Phased AI Roadmap',
    description: 'Create a 12-18 month roadmap with clear milestones, resource requirements, and success metrics for each initiative.',
    priority: 'high',
    category: 'strategic',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'strat_rec_04',
    dimensionId: 'strategy_alignment',
    title: 'Establish an AI Steering Committee',
    description: 'Form a cross-functional committee with executive sponsorship to govern AI investments and prioritize initiatives.',
    priority: 'medium',
    category: 'foundational',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  
  // High score recommendations (3.5-5)
  {
    id: 'strat_rec_05',
    dimensionId: 'strategy_alignment',
    title: 'Integrate AI KPIs into Business Metrics',
    description: 'Embed AI performance indicators into your organizational scorecards and executive dashboards.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
  {
    id: 'strat_rec_06',
    dimensionId: 'strategy_alignment',
    title: 'Explore AI-Driven Business Model Innovation',
    description: 'Assess opportunities to create new revenue streams or transform your business model through AI capabilities.',
    priority: 'low',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },

  // =========================================================================
  // DATA FOUNDATION RECOMMENDATIONS
  // =========================================================================
  
  {
    id: 'data_rec_01',
    dimensionId: 'data_foundation',
    title: 'Conduct a Data Inventory Assessment',
    description: 'Map all critical data sources, their owners, quality levels, and accessibility. This is the foundation for any data strategy.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'data_rec_02',
    dimensionId: 'data_foundation',
    title: 'Implement Basic Data Quality Checks',
    description: 'Start with automated validation rules for your most critical datasets: completeness, consistency, and accuracy checks.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'data_rec_03',
    dimensionId: 'data_foundation',
    title: 'Design a Modern Data Architecture',
    description: 'Evaluate cloud data platforms (Snowflake, Databricks, BigQuery) to consolidate silos and enable scalable analytics.',
    priority: 'high',
    category: 'strategic',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'data_rec_04',
    dimensionId: 'data_foundation',
    title: 'Establish Data Stewardship Roles',
    description: 'Assign data stewards for key domains with clear responsibilities for quality, documentation, and access management.',
    priority: 'medium',
    category: 'foundational',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'data_rec_05',
    dimensionId: 'data_foundation',
    title: 'Implement a Data Catalog',
    description: 'Deploy a searchable data catalog to improve discoverability and enable self-service analytics across the organization.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
  {
    id: 'data_rec_06',
    dimensionId: 'data_foundation',
    title: 'Advance to Real-Time Data Capabilities',
    description: 'Implement streaming data infrastructure for use cases requiring real-time insights and decisioning.',
    priority: 'low',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },

  // =========================================================================
  // AI ENGINEERING RECOMMENDATIONS
  // =========================================================================
  
  {
    id: 'eng_rec_01',
    dimensionId: 'ai_engineering',
    title: 'Start with Pre-Built AI Solutions',
    description: 'Leverage cloud AI APIs (Azure AI, AWS AI, Google Cloud AI) for common use cases before building custom models.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'eng_rec_02',
    dimensionId: 'ai_engineering',
    title: 'Set Up a Sandbox Environment',
    description: 'Create a safe experimentation environment where data scientists can prototype without affecting production systems.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'eng_rec_03',
    dimensionId: 'ai_engineering',
    title: 'Implement Basic MLOps Practices',
    description: 'Establish version control for models, automated testing, and basic monitoring for deployed models.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'eng_rec_04',
    dimensionId: 'ai_engineering',
    title: 'Create Reusable ML Pipelines',
    description: 'Build standardized templates for common ML workflows to accelerate development and ensure consistency.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'eng_rec_05',
    dimensionId: 'ai_engineering',
    title: 'Implement Advanced Model Monitoring',
    description: 'Deploy drift detection, performance monitoring, and automated retraining triggers for production models.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
  {
    id: 'eng_rec_06',
    dimensionId: 'ai_engineering',
    title: 'Explore Edge AI and Embedded Models',
    description: 'Evaluate opportunities to deploy models at the edge for latency-sensitive or offline use cases.',
    priority: 'low',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },

  // =========================================================================
  // GOVERNANCE & RISK RECOMMENDATIONS
  // =========================================================================
  
  {
    id: 'gov_rec_01',
    dimensionId: 'governance_risk',
    title: 'Document Data Privacy Policies',
    description: 'Create clear policies for data collection, storage, access, and retention that comply with relevant regulations.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'gov_rec_02',
    dimensionId: 'governance_risk',
    title: 'Conduct a Data Access Audit',
    description: 'Review who has access to sensitive data and implement role-based access controls where gaps exist.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'gov_rec_03',
    dimensionId: 'governance_risk',
    title: 'Develop AI Ethics Guidelines',
    description: 'Create principles for responsible AI use covering fairness, transparency, accountability, and human oversight.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'gov_rec_04',
    dimensionId: 'governance_risk',
    title: 'Implement Bias Testing Procedures',
    description: 'Establish standard procedures to test models for bias before deployment, especially for high-stakes decisions.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'gov_rec_05',
    dimensionId: 'governance_risk',
    title: 'Establish AI Model Risk Management',
    description: 'Create a risk framework for AI models including validation, documentation, and ongoing monitoring requirements.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
  {
    id: 'gov_rec_06',
    dimensionId: 'governance_risk',
    title: 'Pursue External AI Audits',
    description: 'Engage third-party auditors to assess your AI systems for compliance, fairness, and alignment with best practices.',
    priority: 'low',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },

  // =========================================================================
  // TALENT & CULTURE RECOMMENDATIONS
  // =========================================================================
  
  {
    id: 'talent_rec_01',
    dimensionId: 'talent_culture',
    title: 'Launch a Data Literacy Program',
    description: 'Start with basic data literacy training for business users covering data interpretation and critical thinking.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'talent_rec_02',
    dimensionId: 'talent_culture',
    title: 'Identify Internal AI Champions',
    description: 'Find enthusiastic employees who can advocate for AI adoption and help bridge technical and business teams.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'talent_rec_03',
    dimensionId: 'talent_culture',
    title: 'Build a Talent Acquisition Strategy',
    description: 'Develop a plan to attract AI talent through competitive compensation, interesting problems, and growth opportunities.',
    priority: 'high',
    category: 'strategic',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'talent_rec_04',
    dimensionId: 'talent_culture',
    title: 'Create Cross-Functional AI Teams',
    description: 'Form teams that combine data scientists, engineers, and business domain experts for better outcomes.',
    priority: 'medium',
    category: 'foundational',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'talent_rec_05',
    dimensionId: 'talent_culture',
    title: 'Establish an AI Center of Excellence',
    description: 'Create a centralized team to set standards, share best practices, and accelerate AI adoption across the organization.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
  {
    id: 'talent_rec_06',
    dimensionId: 'talent_culture',
    title: 'Develop AI Leadership Programs',
    description: 'Train senior leaders on AI strategy, risks, and opportunities to enable better decision-making at the top.',
    priority: 'low',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },

  // =========================================================================
  // BUSINESS VALUE & IMPACT RECOMMENDATIONS
  // =========================================================================
  
  {
    id: 'value_rec_01',
    dimensionId: 'business_value',
    title: 'Define Success Metrics for AI Projects',
    description: 'Before starting any AI initiative, establish clear, measurable KPIs tied to business outcomes.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'value_rec_02',
    dimensionId: 'business_value',
    title: 'Start with High-Impact, Low-Risk Use Cases',
    description: 'Identify opportunities where AI can deliver quick wins with minimal risk to build momentum and credibility.',
    priority: 'high',
    category: 'quick_win',
    scoreRange: { min: 0, max: 2.5 },
  },
  {
    id: 'value_rec_03',
    dimensionId: 'business_value',
    title: 'Implement a Value Tracking Framework',
    description: 'Create a standardized approach to measure and report on the business value delivered by AI initiatives.',
    priority: 'high',
    category: 'foundational',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'value_rec_04',
    dimensionId: 'business_value',
    title: 'Build an AI Use Case Portfolio',
    description: 'Maintain a prioritized backlog of AI opportunities ranked by potential value, feasibility, and strategic alignment.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 2.5, max: 3.5 },
  },
  {
    id: 'value_rec_05',
    dimensionId: 'business_value',
    title: 'Scale Successful AI Solutions',
    description: 'Develop playbooks to replicate successful AI implementations across business units and geographies.',
    priority: 'medium',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
  {
    id: 'value_rec_06',
    dimensionId: 'business_value',
    title: 'Explore AI-Enabled Products and Services',
    description: 'Assess opportunities to embed AI into customer-facing products or create new AI-powered offerings.',
    priority: 'low',
    category: 'strategic',
    scoreRange: { min: 3.5, max: 5 },
  },
];

// =============================================================================
// RECOMMENDATION ENGINE
// =============================================================================

/**
 * Get recommendations for a specific dimension based on score
 */
export function getRecommendationsForDimension(
  dimensionId: DimensionId,
  score: number
): Recommendation[] {
  return RECOMMENDATIONS.filter(
    (rec) =>
      rec.dimensionId === dimensionId &&
      score >= rec.scoreRange.min &&
      score <= rec.scoreRange.max
  );
}

/**
 * Get all recommendations based on dimension scores
 */
export function getAllRecommendations(
  dimensionScores: Record<DimensionId, DimensionScore>
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  for (const [dimensionId, scoreData] of Object.entries(dimensionScores)) {
    const dimRecs = getRecommendationsForDimension(
      dimensionId as DimensionId,
      scoreData.weightedScore
    );
    recommendations.push(...dimRecs);
  }
  
  return recommendations;
}

/**
 * Get top priority recommendations (for teaser view)
 * Returns max 3 high-priority recommendations from weakest dimensions
 */
export function getTopRecommendations(
  dimensionScores: Record<DimensionId, DimensionScore>,
  maxCount: number = 3
): Recommendation[] {
  // Sort dimensions by score (lowest first)
  const sortedDimensions = Object.entries(dimensionScores)
    .sort(([, a], [, b]) => a.weightedScore - b.weightedScore)
    .map(([id]) => id as DimensionId);
  
  const topRecs: Recommendation[] = [];
  
  for (const dimensionId of sortedDimensions) {
    if (topRecs.length >= maxCount) break;
    
    const dimRecs = getRecommendationsForDimension(
      dimensionId,
      dimensionScores[dimensionId].weightedScore
    ).filter((rec) => rec.priority === 'high');
    
    // Take first high-priority rec from this dimension
    if (dimRecs.length > 0) {
      topRecs.push(dimRecs[0]);
    }
  }
  
  return topRecs;
}

/**
 * Get recommendations grouped by category
 */
export function getRecommendationsByCategory(
  recommendations: Recommendation[]
): Record<RecommendationCategory, Recommendation[]> {
  return {
    quick_win: recommendations.filter((r) => r.category === 'quick_win'),
    foundational: recommendations.filter((r) => r.category === 'foundational'),
    strategic: recommendations.filter((r) => r.category === 'strategic'),
  };
}

/**
 * Get recommendations grouped by priority
 */
export function getRecommendationsByPriority(
  recommendations: Recommendation[]
): Record<RecommendationPriority, Recommendation[]> {
  return {
    high: recommendations.filter((r) => r.priority === 'high'),
    medium: recommendations.filter((r) => r.priority === 'medium'),
    low: recommendations.filter((r) => r.priority === 'low'),
  };
}
