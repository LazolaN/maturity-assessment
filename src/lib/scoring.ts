import {
  Answer,
  AssessmentResult,
  DimensionId,
  DimensionScore,
  DIMENSION_META,
  DIMENSIONS,
  IndustryId,
  CompanySizeId,
  OverallScore,
  getMaturityLevel,
  isChoiceOption,
} from '@/types/assessment';
import { QUESTIONS, getQuestionsByDimension } from '@/data/questions';
import { getIndustryBenchmark } from '@/data/benchmarks';
import { getTopRecommendations, getAllRecommendations } from '@/data/recommendations';

/**
 * Get the numeric score for an answer
 */
function getAnswerScore(questionId: string, answerValue: number | string | string[]): number {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) return 0;

  // For likert questions, the value is already 1-5
  if (question.type === 'likert') {
    return typeof answerValue === 'number' ? answerValue : 0;
  }

  // For single choice, find the option and get its score
  if (question.type === 'single_choice') {
    const option = question.options.find(
      (opt) => isChoiceOption(opt) && opt.value === answerValue
    );
    return option && isChoiceOption(option) ? option.score : 0;
  }

  // For multi-choice, average the scores of selected options
  if (question.type === 'multi_choice' && Array.isArray(answerValue)) {
    const scores = answerValue
      .map((val) => {
        const option = question.options.find(
          (opt) => isChoiceOption(opt) && opt.value === val
        );
        return option && isChoiceOption(option) ? option.score : 0;
      })
      .filter((s) => s > 0);
    
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  }

  return 0;
}

/**
 * Calculate the score for a single dimension
 */
export function calculateDimensionScore(
  dimensionId: DimensionId,
  answers: Record<string, Answer>
): DimensionScore {
  const questions = getQuestionsByDimension(dimensionId);
  
  let totalWeightedScore = 0;
  let totalWeight = 0;
  let rawScoreSum = 0;
  let answeredCount = 0;

  for (const question of questions) {
    const answer = answers[question.id];
    if (!answer) continue;

    const score = getAnswerScore(question.id, answer.value);
    if (score > 0) {
      rawScoreSum += score;
      totalWeightedScore += score * question.weight;
      totalWeight += question.weight;
      answeredCount++;
    }
  }

  const rawScore = answeredCount > 0 ? rawScoreSum / answeredCount : 0;
  const weightedScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

  return {
    dimensionId,
    rawScore: Math.round(rawScore * 100) / 100,
    weightedScore: Math.round(weightedScore * 100) / 100,
    answeredCount,
    totalQuestions: questions.length,
    completionRate: questions.length > 0 ? answeredCount / questions.length : 0,
  };
}

/**
 * Calculate the overall score from dimension scores
 */
export function calculateOverallScore(
  dimensionScores: Record<DimensionId, DimensionScore>
): OverallScore {
  let totalWeightedScore = 0;
  let totalWeight = 0;
  let rawScoreSum = 0;
  let dimensionCount = 0;

  for (const dimensionId of DIMENSIONS) {
    const dimScore = dimensionScores[dimensionId];
    if (!dimScore || dimScore.answeredCount === 0) continue;

    const dimMeta = DIMENSION_META[dimensionId];
    rawScoreSum += dimScore.weightedScore;
    totalWeightedScore += dimScore.weightedScore * dimMeta.weight;
    totalWeight += dimMeta.weight;
    dimensionCount++;
  }

  const raw = dimensionCount > 0 ? rawScoreSum / dimensionCount : 0;
  const weighted = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

  return {
    raw: Math.round(raw * 100) / 100,
    weighted: Math.round(weighted * 100) / 100,
    maturityLevel: getMaturityLevel(weighted),
  };
}

/**
 * Identify strengths (top 2 dimensions) and weaknesses (bottom 2)
 */
function identifyStrengthsAndWeaknesses(
  dimensionScores: Record<DimensionId, DimensionScore>
): { strengths: DimensionId[]; weaknesses: DimensionId[] } {
  const sortedDimensions = DIMENSIONS
    .filter((d) => dimensionScores[d]?.answeredCount > 0)
    .sort((a, b) => dimensionScores[b].weightedScore - dimensionScores[a].weightedScore);

  return {
    strengths: sortedDimensions.slice(0, 2),
    weaknesses: sortedDimensions.slice(-2).reverse(),
  };
}

/**
 * Calculate the full assessment result
 */
export function calculateAssessmentResult(
  responseId: string,
  answers: Record<string, Answer>,
  industry: IndustryId,
  companySize: CompanySizeId
): AssessmentResult {
  // Calculate dimension scores
  const dimensionScores = {} as Record<DimensionId, DimensionScore>;
  for (const dimensionId of DIMENSIONS) {
    dimensionScores[dimensionId] = calculateDimensionScore(dimensionId, answers);
  }

  // Calculate overall score
  const overallScore = calculateOverallScore(dimensionScores);

  // Get industry benchmark
  const industryBenchmark = getIndustryBenchmark(industry, companySize);

  // Identify strengths and weaknesses
  const { strengths, weaknesses } = identifyStrengthsAndWeaknesses(dimensionScores);

  // Get recommendations
  const recommendations = getAllRecommendations(dimensionScores);

  return {
    responseId,
    calculatedAt: new Date(),
    dimensionScores,
    overallScore,
    industryBenchmark,
    strengths,
    weaknesses,
    recommendations,
  };
}

/**
 * Get teaser result (limited recommendations for pre-email view)
 */
export function getTeaserResult(result: AssessmentResult): {
  overallScore: OverallScore;
  dimensionScores: Record<DimensionId, DimensionScore>;
  topRecommendations: ReturnType<typeof getTopRecommendations>;
  industryComparison: {
    userScore: number;
    benchmarkScore: number;
    delta: number;
  };
} {
  return {
    overallScore: result.overallScore,
    dimensionScores: result.dimensionScores,
    topRecommendations: getTopRecommendations(result.dimensionScores, 3),
    industryComparison: {
      userScore: result.overallScore.weighted,
      benchmarkScore: result.industryBenchmark.overallAverage,
      delta: Math.round(
        (result.overallScore.weighted - result.industryBenchmark.overallAverage) * 10
      ) / 10,
    },
  };
}

/**
 * Calculate completion percentage for progress bar
 */
export function calculateCompletionPercentage(
  answers: Record<string, Answer>
): number {
  const totalQuestions = QUESTIONS.length;
  const answeredQuestions = Object.keys(answers).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
}

/**
 * Check if all questions are answered
 */
export function isAssessmentComplete(answers: Record<string, Answer>): boolean {
  return Object.keys(answers).length === QUESTIONS.length;
}

/**
 * Get the next unanswered question
 */
export function getNextUnansweredQuestion(
  answers: Record<string, Answer>
): { dimensionIndex: number; questionIndex: number } | null {
  for (let dimIndex = 0; dimIndex < DIMENSIONS.length; dimIndex++) {
    const dimensionId = DIMENSIONS[dimIndex];
    const questions = getQuestionsByDimension(dimensionId);
    
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      if (!answers[questions[qIndex].id]) {
        return { dimensionIndex: dimIndex, questionIndex: qIndex };
      }
    }
  }
  return null;
}
