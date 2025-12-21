'use client';

import { useAssessment } from '@/context/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DIMENSION_META, MATURITY_LEVEL_META, DIMENSIONS } from '@/types/assessment';
import { Lock, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RadarChart } from '@/components/charts/RadarChart';
import { cn } from '@/lib/utils';

export function ResultsTeaser() {
  const { state, teaserResult, setStep } = useAssessment();

  if (!state.result || !teaserResult) {
    return null;
  }

  const { overallScore, dimensionScores, topRecommendations, industryComparison } = teaserResult;
  const maturityMeta = MATURITY_LEVEL_META[overallScore.maturityLevel];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Score Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Your AI Maturity Assessment Results
        </h1>
        <p className="text-slate-600">
          Here&apos;s a preview of your organization&apos;s AI readiness
        </p>
      </div>

      {/* Main Score Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-blue-100 text-sm font-medium mb-1">
                Overall Maturity Score
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">{overallScore.weighted.toFixed(1)}</span>
                <span className="text-2xl text-blue-200">/5.0</span>
              </div>
              <div
                className="inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: maturityMeta.color }}
              >
                {maturityMeta.label}
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-blue-100 text-sm font-medium mb-1">
                vs Industry Average
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-end">
                {industryComparison.delta > 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-300" />
                ) : industryComparison.delta < 0 ? (
                  <TrendingDown className="w-6 h-6 text-red-300" />
                ) : (
                  <Minus className="w-6 h-6 text-blue-200" />
                )}
                <span className="text-3xl font-bold">
                  {industryComparison.delta > 0 ? '+' : ''}
                  {industryComparison.delta.toFixed(1)}
                </span>
              </div>
              <p className="text-blue-200 text-sm mt-1">
                Industry avg: {industryComparison.benchmarkScore.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Radar Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dimension Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <RadarChart
              dimensionScores={dimensionScores}
              benchmarkScores={state.result.industryBenchmark.dimensionAverages}
            />
          </div>
          
          {/* Dimension Score List */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {DIMENSIONS.map((dimId) => {
              const score = dimensionScores[dimId];
              const benchmark = state.result!.industryBenchmark.dimensionAverages[dimId];
              const delta = score.weightedScore - benchmark;
              
              return (
                <div key={dimId} className="p-3 rounded-lg bg-slate-50">
                  <p className="text-sm text-slate-500 mb-1">
                    {DIMENSION_META[dimId].shortLabel}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">
                      {score.weightedScore.toFixed(1)}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        delta > 0.1
                          ? 'text-green-600'
                          : delta < -0.1
                          ? 'text-red-600'
                          : 'text-slate-500'
                      )}
                    >
                      {delta > 0 ? '+' : ''}
                      {delta.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Teaser Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRecommendations.map((rec, index) => (
              <div
                key={rec.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-50"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{rec.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Locked Content Teaser */}
          <div className="mt-6 p-6 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
              <div className="text-center">
                <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-medium">
                  +{state.result.recommendations.length - 3} more recommendations
                </p>
              </div>
            </div>
            <div className="space-y-3 opacity-40">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <p className="text-slate-600 mb-4">
          Get your complete report with all recommendations
        </p>
        <Button
          size="lg"
          onClick={() => setStep('lead_capture')}
          className="px-8 gap-2"
        >
          Unlock Full Report
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-sm text-slate-400 mt-3">
          We&apos;ll send your detailed PDF report to your email
        </p>
      </div>
    </div>
  );
}
