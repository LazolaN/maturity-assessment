import { 
  IndustryBenchmark, 
  IndustryId, 
  CompanySizeId, 
  DimensionId,
  DIMENSIONS 
} from '@/types/assessment';

// =============================================================================
// INDUSTRY BASELINE DATA
// =============================================================================
// These are hardcoded baselines representing "average" maturity scores
// by industry and company size. In production, these would come from
// aggregated anonymized assessment data.
//
// Scale: 1-5 (matching Likert scale)
// Source: Industry research + expert estimation (for MVP validation)
// =============================================================================

type BenchmarkMatrix = Record<IndustryId, Record<CompanySizeId, Record<DimensionId, number>>>;

const BENCHMARK_DATA: BenchmarkMatrix = {
  technology: {
    startup: {
      strategy_alignment: 3.2,
      data_foundation: 2.8,
      ai_engineering: 3.5,
      governance_risk: 2.0,
      talent_culture: 3.8,
      business_value: 2.5,
    },
    smb: {
      strategy_alignment: 3.5,
      data_foundation: 3.2,
      ai_engineering: 3.8,
      governance_risk: 2.5,
      talent_culture: 3.6,
      business_value: 3.0,
    },
    mid_market: {
      strategy_alignment: 3.8,
      data_foundation: 3.6,
      ai_engineering: 4.0,
      governance_risk: 3.2,
      talent_culture: 3.5,
      business_value: 3.4,
    },
    enterprise: {
      strategy_alignment: 4.0,
      data_foundation: 4.2,
      ai_engineering: 4.3,
      governance_risk: 3.8,
      talent_culture: 3.4,
      business_value: 3.8,
    },
  },
  
  financial_services: {
    startup: {
      strategy_alignment: 3.0,
      data_foundation: 3.2,
      ai_engineering: 2.8,
      governance_risk: 3.5,
      talent_culture: 3.2,
      business_value: 2.8,
    },
    smb: {
      strategy_alignment: 3.4,
      data_foundation: 3.5,
      ai_engineering: 3.0,
      governance_risk: 3.8,
      talent_culture: 3.0,
      business_value: 3.2,
    },
    mid_market: {
      strategy_alignment: 3.8,
      data_foundation: 4.0,
      ai_engineering: 3.5,
      governance_risk: 4.2,
      talent_culture: 3.2,
      business_value: 3.6,
    },
    enterprise: {
      strategy_alignment: 4.2,
      data_foundation: 4.5,
      ai_engineering: 4.0,
      governance_risk: 4.5,
      talent_culture: 3.5,
      business_value: 4.0,
    },
  },
  
  healthcare: {
    startup: {
      strategy_alignment: 2.8,
      data_foundation: 2.5,
      ai_engineering: 2.2,
      governance_risk: 3.0,
      talent_culture: 2.8,
      business_value: 2.2,
    },
    smb: {
      strategy_alignment: 3.0,
      data_foundation: 2.8,
      ai_engineering: 2.5,
      governance_risk: 3.5,
      talent_culture: 2.8,
      business_value: 2.5,
    },
    mid_market: {
      strategy_alignment: 3.4,
      data_foundation: 3.2,
      ai_engineering: 3.0,
      governance_risk: 4.0,
      talent_culture: 3.0,
      business_value: 3.0,
    },
    enterprise: {
      strategy_alignment: 3.8,
      data_foundation: 3.8,
      ai_engineering: 3.5,
      governance_risk: 4.3,
      talent_culture: 3.2,
      business_value: 3.5,
    },
  },
  
  retail_ecommerce: {
    startup: {
      strategy_alignment: 3.0,
      data_foundation: 3.0,
      ai_engineering: 2.5,
      governance_risk: 2.0,
      talent_culture: 3.0,
      business_value: 3.2,
    },
    smb: {
      strategy_alignment: 3.3,
      data_foundation: 3.4,
      ai_engineering: 3.0,
      governance_risk: 2.5,
      talent_culture: 3.0,
      business_value: 3.5,
    },
    mid_market: {
      strategy_alignment: 3.6,
      data_foundation: 3.8,
      ai_engineering: 3.5,
      governance_risk: 3.0,
      talent_culture: 3.2,
      business_value: 3.8,
    },
    enterprise: {
      strategy_alignment: 4.0,
      data_foundation: 4.2,
      ai_engineering: 4.0,
      governance_risk: 3.5,
      talent_culture: 3.4,
      business_value: 4.2,
    },
  },
  
  manufacturing: {
    startup: {
      strategy_alignment: 2.5,
      data_foundation: 2.2,
      ai_engineering: 2.0,
      governance_risk: 2.2,
      talent_culture: 2.5,
      business_value: 2.0,
    },
    smb: {
      strategy_alignment: 2.8,
      data_foundation: 2.6,
      ai_engineering: 2.3,
      governance_risk: 2.5,
      talent_culture: 2.5,
      business_value: 2.4,
    },
    mid_market: {
      strategy_alignment: 3.2,
      data_foundation: 3.0,
      ai_engineering: 2.8,
      governance_risk: 3.0,
      talent_culture: 2.8,
      business_value: 3.0,
    },
    enterprise: {
      strategy_alignment: 3.6,
      data_foundation: 3.5,
      ai_engineering: 3.2,
      governance_risk: 3.5,
      talent_culture: 3.0,
      business_value: 3.4,
    },
  },
  
  professional_services: {
    startup: {
      strategy_alignment: 2.8,
      data_foundation: 2.5,
      ai_engineering: 2.2,
      governance_risk: 2.5,
      talent_culture: 3.2,
      business_value: 2.5,
    },
    smb: {
      strategy_alignment: 3.0,
      data_foundation: 2.8,
      ai_engineering: 2.5,
      governance_risk: 3.0,
      talent_culture: 3.2,
      business_value: 2.8,
    },
    mid_market: {
      strategy_alignment: 3.4,
      data_foundation: 3.2,
      ai_engineering: 3.0,
      governance_risk: 3.5,
      talent_culture: 3.4,
      business_value: 3.2,
    },
    enterprise: {
      strategy_alignment: 3.8,
      data_foundation: 3.6,
      ai_engineering: 3.5,
      governance_risk: 4.0,
      talent_culture: 3.5,
      business_value: 3.6,
    },
  },
  
  other: {
    startup: {
      strategy_alignment: 2.5,
      data_foundation: 2.3,
      ai_engineering: 2.0,
      governance_risk: 2.0,
      talent_culture: 2.5,
      business_value: 2.0,
    },
    smb: {
      strategy_alignment: 2.8,
      data_foundation: 2.6,
      ai_engineering: 2.4,
      governance_risk: 2.5,
      talent_culture: 2.7,
      business_value: 2.4,
    },
    mid_market: {
      strategy_alignment: 3.2,
      data_foundation: 3.0,
      ai_engineering: 2.8,
      governance_risk: 3.0,
      talent_culture: 3.0,
      business_value: 2.8,
    },
    enterprise: {
      strategy_alignment: 3.5,
      data_foundation: 3.4,
      ai_engineering: 3.2,
      governance_risk: 3.4,
      talent_culture: 3.2,
      business_value: 3.2,
    },
  },
};

// Sample sizes for credibility (fictional but realistic)
const SAMPLE_SIZES: Record<IndustryId, Record<CompanySizeId, number>> = {
  technology: { startup: 245, smb: 189, mid_market: 134, enterprise: 87 },
  financial_services: { startup: 67, smb: 112, mid_market: 156, enterprise: 203 },
  healthcare: { startup: 34, smb: 78, mid_market: 123, enterprise: 167 },
  retail_ecommerce: { startup: 156, smb: 134, mid_market: 98, enterprise: 76 },
  manufacturing: { startup: 23, smb: 67, mid_market: 145, enterprise: 189 },
  professional_services: { startup: 89, smb: 167, mid_market: 134, enterprise: 112 },
  other: { startup: 123, smb: 145, mid_market: 98, enterprise: 67 },
};

// =============================================================================
// BENCHMARK ACCESS FUNCTIONS
// =============================================================================

/**
 * Get the full benchmark data for a specific industry and company size
 */
export function getIndustryBenchmark(
  industryId: IndustryId,
  companySize: CompanySizeId
): IndustryBenchmark {
  const dimensionAverages = BENCHMARK_DATA[industryId][companySize];
  
  // Calculate overall average
  const overallAverage = DIMENSIONS.reduce((sum, dim) => {
    return sum + dimensionAverages[dim];
  }, 0) / DIMENSIONS.length;
  
  return {
    industryId,
    companySize,
    sampleSize: SAMPLE_SIZES[industryId][companySize],
    dimensionAverages,
    overallAverage: Math.round(overallAverage * 10) / 10, // Round to 1 decimal
  };
}

/**
 * Get benchmark for a single dimension
 */
export function getDimensionBenchmark(
  industryId: IndustryId,
  companySize: CompanySizeId,
  dimensionId: DimensionId
): number {
  return BENCHMARK_DATA[industryId][companySize][dimensionId];
}

/**
 * Compare user score to benchmark and return the delta
 */
export function compareToBenchmark(
  userScore: number,
  industryId: IndustryId,
  companySize: CompanySizeId,
  dimensionId: DimensionId
): {
  benchmark: number;
  delta: number;
  percentile: 'below' | 'average' | 'above';
} {
  const benchmark = getDimensionBenchmark(industryId, companySize, dimensionId);
  const delta = userScore - benchmark;
  
  let percentile: 'below' | 'average' | 'above';
  if (delta < -0.3) {
    percentile = 'below';
  } else if (delta > 0.3) {
    percentile = 'above';
  } else {
    percentile = 'average';
  }
  
  return {
    benchmark,
    delta: Math.round(delta * 10) / 10,
    percentile,
  };
}

/**
 * Get all benchmark comparisons for radar chart display
 */
export function getAllBenchmarkComparisons(
  userScores: Record<DimensionId, number>,
  industryId: IndustryId,
  companySize: CompanySizeId
): Array<{
  dimensionId: DimensionId;
  userScore: number;
  benchmark: number;
  delta: number;
}> {
  return DIMENSIONS.map((dimensionId) => {
    const userScore = userScores[dimensionId] || 0;
    const benchmark = getDimensionBenchmark(industryId, companySize, dimensionId);
    
    return {
      dimensionId,
      userScore,
      benchmark,
      delta: Math.round((userScore - benchmark) * 10) / 10,
    };
  });
}
