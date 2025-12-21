'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AssessmentState,
  AssessmentStep,
  AssessmentResponse,
  AssessmentResult,
  Answer,
  IndustryId,
  CompanySizeId,
  LeadInfo,
  DimensionId,
  DIMENSIONS,
} from '@/types/assessment';
import { calculateAssessmentResult, getTeaserResult } from '@/lib/scoring';
import { getQuestionsByDimension } from '@/data/questions';

// =============================================================================
// ACTION TYPES
// =============================================================================

type AssessmentAction =
  | { type: 'START_ASSESSMENT' }
  | { type: 'SET_CONTEXT'; industry: IndustryId; companySize: CompanySizeId }
  | { type: 'ANSWER_QUESTION'; questionId: string; value: number | string | string[] }
  | { type: 'NAVIGATE'; dimensionIndex: number; questionIndex: number }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'SUBMIT_LEAD'; leadInfo: LeadInfo }
  | { type: 'SET_STEP'; step: AssessmentStep }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: AssessmentState = {
  step: 'intro',
  response: null,
  result: null,
  leadInfo: null,
  isSubmitting: false,
  error: null,
};

// =============================================================================
// REDUCER
// =============================================================================

function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        step: 'context',
        response: null,
        result: null,
        leadInfo: null,
        error: null,
      };

    case 'SET_CONTEXT':
      return {
        ...state,
        step: 'questions',
        response: {
          id: uuidv4(),
          startedAt: new Date(),
          industry: action.industry,
          companySize: action.companySize,
          answers: {},
          currentDimensionIndex: 0,
          currentQuestionIndex: 0,
        },
      };

    case 'ANSWER_QUESTION': {
      if (!state.response) return state;
      
      return {
        ...state,
        response: {
          ...state.response,
          answers: {
            ...state.response.answers,
            [action.questionId]: {
              questionId: action.questionId,
              value: action.value,
              answeredAt: new Date(),
            },
          },
        },
      };
    }

    case 'NAVIGATE': {
      if (!state.response) return state;
      
      return {
        ...state,
        response: {
          ...state.response,
          currentDimensionIndex: action.dimensionIndex,
          currentQuestionIndex: action.questionIndex,
        },
      };
    }

    case 'CALCULATE_RESULTS': {
      if (!state.response) return state;

      const result = calculateAssessmentResult(
        state.response.id,
        state.response.answers,
        state.response.industry,
        state.response.companySize
      );

      return {
        ...state,
        step: 'results_teaser',
        response: {
          ...state.response,
          completedAt: new Date(),
        },
        result,
      };
    }

    case 'SUBMIT_LEAD':
      return {
        ...state,
        step: 'results_full',
        leadInfo: action.leadInfo,
        isSubmitting: false,
      };

    case 'SET_STEP':
      return {
        ...state,
        step: action.step,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isSubmitting: false,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

interface AssessmentContextValue {
  state: AssessmentState;
  
  // Actions
  startAssessment: () => void;
  setContext: (industry: IndustryId, companySize: CompanySizeId) => void;
  answerQuestion: (questionId: string, value: number | string | string[]) => void;
  navigateTo: (dimensionIndex: number, questionIndex: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  calculateResults: () => void;
  submitLead: (leadInfo: LeadInfo) => Promise<void>;
  setStep: (step: AssessmentStep) => void;
  reset: () => void;
  
  // Computed values
  currentDimension: DimensionId | null;
  currentQuestion: ReturnType<typeof getQuestionsByDimension>[0] | null;
  progress: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  teaserResult: ReturnType<typeof getTeaserResult> | null;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Actions
  const startAssessment = useCallback(() => {
    dispatch({ type: 'START_ASSESSMENT' });
  }, []);

  const setContext = useCallback((industry: IndustryId, companySize: CompanySizeId) => {
    dispatch({ type: 'SET_CONTEXT', industry, companySize });
  }, []);

  const answerQuestion = useCallback((questionId: string, value: number | string | string[]) => {
    dispatch({ type: 'ANSWER_QUESTION', questionId, value });
  }, []);

  const navigateTo = useCallback((dimensionIndex: number, questionIndex: number) => {
    dispatch({ type: 'NAVIGATE', dimensionIndex, questionIndex });
  }, []);

  const calculateResults = useCallback(() => {
    dispatch({ type: 'CALCULATE_RESULTS' });
  }, []);

  const submitLead = useCallback(async (leadInfo: LeadInfo) => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
    
    try {
      // For MVP: Log to console and optionally send to webhook
      console.log('Lead captured:', leadInfo);
      
      // TODO: Replace with actual webhook call
      // await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(leadInfo),
      // });
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      dispatch({ type: 'SUBMIT_LEAD', leadInfo });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: 'Failed to submit. Please try again.' });
    }
  }, []);

  const setStep = useCallback((step: AssessmentStep) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Navigation helpers
  const goToNextQuestion = useCallback(() => {
    if (!state.response) return;
    
    const { currentDimensionIndex, currentQuestionIndex } = state.response;
    const currentDimensionId = DIMENSIONS[currentDimensionIndex];
    const questions = getQuestionsByDimension(currentDimensionId);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Next question in same dimension
      dispatch({ type: 'NAVIGATE', dimensionIndex: currentDimensionIndex, questionIndex: currentQuestionIndex + 1 });
    } else if (currentDimensionIndex < DIMENSIONS.length - 1) {
      // First question of next dimension
      dispatch({ type: 'NAVIGATE', dimensionIndex: currentDimensionIndex + 1, questionIndex: 0 });
    } else {
      // Last question - calculate results
      dispatch({ type: 'CALCULATE_RESULTS' });
    }
  }, [state.response]);

  const goToPreviousQuestion = useCallback(() => {
    if (!state.response) return;
    
    const { currentDimensionIndex, currentQuestionIndex } = state.response;
    
    if (currentQuestionIndex > 0) {
      // Previous question in same dimension
      dispatch({ type: 'NAVIGATE', dimensionIndex: currentDimensionIndex, questionIndex: currentQuestionIndex - 1 });
    } else if (currentDimensionIndex > 0) {
      // Last question of previous dimension
      const prevDimensionId = DIMENSIONS[currentDimensionIndex - 1];
      const prevQuestions = getQuestionsByDimension(prevDimensionId);
      dispatch({ type: 'NAVIGATE', dimensionIndex: currentDimensionIndex - 1, questionIndex: prevQuestions.length - 1 });
    }
  }, [state.response]);

  // Computed values
  const currentDimension = state.response
    ? DIMENSIONS[state.response.currentDimensionIndex]
    : null;

  const currentQuestion = state.response && currentDimension
    ? getQuestionsByDimension(currentDimension)[state.response.currentQuestionIndex] ?? null
    : null;

  const progress = (() => {
    if (!state.response) return 0;
    
    let totalQuestions = 0;
    let questionsBeforeCurrent = 0;
    
    for (let i = 0; i < DIMENSIONS.length; i++) {
      const questions = getQuestionsByDimension(DIMENSIONS[i]);
      totalQuestions += questions.length;
      
      if (i < state.response.currentDimensionIndex) {
        questionsBeforeCurrent += questions.length;
      } else if (i === state.response.currentDimensionIndex) {
        questionsBeforeCurrent += state.response.currentQuestionIndex;
      }
    }
    
    return totalQuestions > 0 ? Math.round((questionsBeforeCurrent / totalQuestions) * 100) : 0;
  })();

  const canGoPrevious = state.response
    ? state.response.currentDimensionIndex > 0 || state.response.currentQuestionIndex > 0
    : false;

  const canGoNext = state.response && currentQuestion
    ? !!state.response.answers[currentQuestion.id]
    : false;

  const isLastQuestion = state.response
    ? state.response.currentDimensionIndex === DIMENSIONS.length - 1 &&
      state.response.currentQuestionIndex === getQuestionsByDimension(DIMENSIONS[DIMENSIONS.length - 1]).length - 1
    : false;

  const teaserResult = state.result ? getTeaserResult(state.result) : null;

  const value: AssessmentContextValue = {
    state,
    startAssessment,
    setContext,
    answerQuestion,
    navigateTo,
    goToNextQuestion,
    goToPreviousQuestion,
    calculateResults,
    submitLead,
    setStep,
    reset,
    currentDimension,
    currentQuestion,
    progress,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    teaserResult,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
