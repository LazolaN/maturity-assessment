'use client';

import { useAssessment } from '@/context/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DIMENSION_META, isLikertOption, isChoiceOption } from '@/types/assessment';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuestionStep() {
  const {
    state,
    currentDimension,
    currentQuestion,
    progress,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
  } = useAssessment();

  if (!state.response || !currentDimension || !currentQuestion) {
    return null;
  }

  const dimensionMeta = DIMENSION_META[currentDimension];
  const currentAnswer = state.response.answers[currentQuestion.id];

  const handleOptionClick = (value: number | string) => {
    answerQuestion(currentQuestion.id, value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xs">
                  {dimensionMeta.shortLabel.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-slate-900">{dimensionMeta.label}</span>
            </div>
            <span className="text-sm text-slate-500">
              {progress}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardContent className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {currentQuestion.text}
              </h2>
              {currentQuestion.helpText && (
                <p className="text-sm text-slate-500 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {currentQuestion.helpText}
                </p>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const value = isLikertOption(option) ? option.value : option.value;
                const label = option.label;
                const isSelected = currentAnswer?.value === value;

                return (
                  <button
                    key={String(value)}
                    onClick={() => handleOptionClick(value)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left',
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                        isSelected
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-slate-300'
                      )}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'font-medium',
                        isSelected ? 'text-blue-900' : 'text-slate-700'
                      )}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-slate-200 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={goToPreviousQuestion}
              disabled={!canGoPrevious}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={goToNextQuestion}
              disabled={!canGoNext}
              className="gap-2"
            >
              {isLastQuestion ? 'See Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
