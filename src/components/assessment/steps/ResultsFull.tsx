'use client';

import { useAssessment } from '@/context/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DIMENSION_META,
  MATURITY_LEVEL_META,
  DIMENSIONS,
} from '@/types/assessment';
import {
  Download,
  CheckCircle,
  Target,
  AlertTriangle,
  Zap,
  Building,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import { RadarChart } from '@/components/charts/RadarChart';
import { getRecommendationsByCategory } from '@/data/recommendations';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ResultsFull() {
  const { state, reset } = useAssessment();

  if (!state.result || !state.leadInfo) {
    return null;
  }

  const { overallScore, dimensionScores, industryBenchmark, strengths, weaknesses, recommendations } =
    state.result;
  const maturityMeta = MATURITY_LEVEL_META[overallScore.maturityLevel];
  const categorizedRecs = getRecommendationsByCategory(recommendations);

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    alert('PDF download coming soon! For now, you can print this page.');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <CheckCircle className="w-4 h-4" />
          Report unlocked
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Your Complete AI Maturity Report
        </h1>
        <p className="text-slate-600">
          Thank you, {state.leadInfo.firstName || state.leadInfo.email}! Here&apos;s your detailed assessment.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex justify-center gap-4 mb-8">
        <Button variant="outline" onClick={handleDownloadPDF} className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={() => window.print()} className="gap-2">
          Print Report
        </Button>
      </div>

      {/* Main Score Card */}
      <Card className="mb-8 overflow-hidden">
        <div
          className="p-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${maturityMeta.color} 0%, ${maturityMeta.color}dd 100%)`,
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/80 text-sm font-medium mb-1">
                Overall Maturity Score
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">{overallScore.weighted.toFixed(1)}</span>
                <span className="text-2xl text-white/60">/5.0</span>
              </div>
              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                Level {overallScore.maturityLevel}: {maturityMeta.label}
              </div>
            </div>

            <div className="text-center md:text-right max-w-xs">
              <p className="text-white/90 text-sm">
                {maturityMeta.description}
              </p>
              <p className="text-white/70 text-sm mt-2">
                {maturityMeta.recommendation}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Radar Chart with Details */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Scores vs Industry Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <RadarChart
                dimensionScores={dimensionScores}
                benchmarkScores={industryBenchmark.dimensionAverages}
              />
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Compared to {industryBenchmark.sampleSize} companies in your industry
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dimension Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DIMENSIONS.map((dimId) => {
                const score = dimensionScores[dimId];
                const benchmark = industryBenchmark.dimensionAverages[dimId];
                const delta = score.weightedScore - benchmark;
                const percentage = (score.weightedScore / 5) * 100;
                const isStrength = strengths.includes(dimId);
                const isWeakness = weaknesses.includes(dimId);

                return (
                  <div key={dimId}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">
                          {DIMENSION_META[dimId].label}
                        </span>
                        {isStrength && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Strength
                          </span>
                        )}
                        {isWeakness && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            Focus Area
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {score.weightedScore.toFixed(1)}
                        </span>
                        <span
                          className={cn(
                            'text-sm',
                            delta > 0.1
                              ? 'text-green-600'
                              : delta < -0.1
                              ? 'text-red-600'
                              : 'text-slate-400'
                          )}
                        >
                          ({delta > 0 ? '+' : ''}
                          {delta.toFixed(1)})
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Target className="w-5 h-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengths.map((dimId) => (
                <div key={dimId} className="p-4 rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-900">
                    {DIMENSION_META[dimId].label}
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Score: {dimensionScores[dimId].weightedScore.toFixed(1)} / 5.0
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    {DIMENSION_META[dimId].description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weaknesses.map((dimId) => (
                <div key={dimId} className="p-4 rounded-lg bg-amber-50">
                  <h4 className="font-medium text-amber-900">
                    {DIMENSION_META[dimId].label}
                  </h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Score: {dimensionScores[dimId].weightedScore.toFixed(1)} / 5.0
                  </p>
                  <p className="text-sm text-amber-600 mt-2">
                    {DIMENSION_META[dimId].description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            All Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quick Wins */}
          {categorizedRecs.quick_win.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-slate-900">Quick Wins</h3>
                <span className="text-sm text-slate-500">
                  (Implement in &lt;3 months)
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {categorizedRecs.quick_win.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-lg border border-yellow-200 bg-yellow-50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-slate-900">{rec.title}</h4>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          rec.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{rec.description}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {DIMENSION_META[rec.dimensionId].label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Foundational */}
          {categorizedRecs.foundational.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-900">Foundational</h3>
                <span className="text-sm text-slate-500">
                  (Build the groundwork)
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {categorizedRecs.foundational.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-lg border border-blue-200 bg-blue-50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-slate-900">{rec.title}</h4>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          rec.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{rec.description}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {DIMENSION_META[rec.dimensionId].label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic */}
          {categorizedRecs.strategic.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-slate-900">Strategic</h3>
                <span className="text-sm text-slate-500">
                  (Long-term transformation)
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {categorizedRecs.strategic.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-lg border border-purple-200 bg-purple-50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-slate-900">{rec.title}</h4>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          rec.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : rec.priority === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{rec.description}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {DIMENSION_META[rec.dimensionId].label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer CTA */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to accelerate your AI journey?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Our team can help you implement these recommendations and build a roadmap for AI transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">
              Schedule a Consultation
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                onClick={reset}
                className="gap-2 bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4" />
                Take Assessment Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
