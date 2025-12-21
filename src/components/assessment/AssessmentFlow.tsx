'use client';

import { useAssessment } from '@/context/AssessmentContext';
import { ContextStep } from './steps/ContextStep';
import { QuestionStep } from './steps/QuestionStep';
import { ResultsTeaser } from './steps/ResultsTeaser';
import { LeadCaptureStep } from './steps/LeadCaptureStep';
import { ResultsFull } from './steps/ResultsFull';

export function AssessmentFlow() {
  const { state } = useAssessment();

  switch (state.step) {
    case 'intro':
    case 'context':
      return <ContextStep />;
    
    case 'questions':
      return <QuestionStep />;
    
    case 'calculating':
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg text-slate-600">Calculating your results...</p>
          </div>
        </div>
      );
    
    case 'results_teaser':
      return <ResultsTeaser />;
    
    case 'lead_capture':
      return <LeadCaptureStep />;
    
    case 'results_full':
      return <ResultsFull />;
    
    default:
      return <ContextStep />;
  }
}
