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
  Clock,
  TrendingUp,
  ChevronRight,
  Gauge,
  BarChart3,
  MapPin,
} from 'lucide-react';
import { RadarChart } from '@/components/charts/RadarChart';
import { getRecommendationsByCategory } from '@/data/recommendations';
import { 
  calculateGapAnalysis, 
  generateRoadmap, 
  getGapSeverityColor,
  getEffortImpactQuadrant,
  GapAnalysis,
  RoadmapPhase,
  RoadmapInitiative,
} from '@/data/roadmap';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function ResultsFull() {
  const { state, reset } = useAssessment();
  const [expandedInitiative, setExpandedInitiative] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  if (!state.result || !state.leadInfo) {
    return null;
  }

  const { overallScore, dimensionScores, industryBenchmark, strengths, weaknesses, recommendations } =
    state.result;
  const maturityMeta = MATURITY_LEVEL_META[overallScore.maturityLevel];
  const categorizedRecs = getRecommendationsByCategory(recommendations);

  // Calculate gap analysis and generate roadmap
  const gapAnalysis = calculateGapAnalysis(dimensionScores, industryBenchmark.dimensionAverages);
  const roadmapPhases = generateRoadmap(dimensionScores, gapAnalysis);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      setIsDownloading(true);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pageWidth - (margin * 2);
      const usableHeight = pageHeight - (margin * 2);
      
      // Get all sections that should not be split
      const sections = reportRef.current.querySelectorAll('[data-pdf-section]');
      
      let currentY = margin;
      let isFirstPage = true;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        
        // Skip elements marked as no-print
        if (section.classList.contains('no-print')) continue;
        
        // Render section to canvas
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = usableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Check if this section fits on current page
        if (!isFirstPage && currentY + imgHeight > pageHeight - margin) {
          // Start new page
          pdf.addPage();
          currentY = margin;
        }
        
        // If single section is taller than a page, we need to split it
        if (imgHeight > usableHeight) {
          // For very tall sections, render normally (will split)
          const pagesNeeded = Math.ceil(imgHeight / usableHeight);
          for (let p = 0; p < pagesNeeded; p++) {
            if (p > 0) {
              pdf.addPage();
              currentY = margin;
            }
            const sourceY = p * (canvas.height / pagesNeeded);
            const sourceHeight = canvas.height / pagesNeeded;
            
            // Create a temporary canvas for this slice
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sourceHeight;
            const ctx = sliceCanvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
              const sliceData = sliceCanvas.toDataURL('image/png');
              const sliceHeight = usableHeight;
              pdf.addImage(sliceData, 'PNG', margin, currentY, imgWidth, sliceHeight);
              currentY = pageHeight; // Force new page for next section
            }
          }
        } else {
          // Section fits, add it
          pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 5; // 5mm gap between sections
        }
        
        isFirstPage = false;
      }
      
      pdf.save('ai-maturity-report.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      // Fallback to simple method
      await handleDownloadPDFSimple();
    } finally {
      setIsDownloading(false);
    }
  };

  // Fallback simple PDF generation
  const handleDownloadPDFSimple = async () => {
    if (!reportRef.current) return;
    
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('ai-maturity-report.pdf');
  };

  const toggleInitiative = (id: string) => {
    setExpandedInitiative(expandedInitiative === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div ref={reportRef}>
        {/* Success Header */}
        <div data-pdf-section className="text-center mb-8">
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

        {/* Action Bar - Hidden in PDF */}
        <div data-pdf-section className="flex justify-center gap-4 mb-8 no-print">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="gap-2"
            disabled={isDownloading}
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="gap-2">
            Print Report
          </Button>
        </div>

        {/* Main Score Card */}
        <div data-pdf-section>
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
        </div>

        {/* Radar Chart */}
        <div data-pdf-section>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Scores vs Industry Benchmark</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[520px] w-full">
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
        </div>

        {/* Dimension Scores */}
        <div data-pdf-section>
          <Card className="mb-8">
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

        {/* GAP ANALYSIS SECTION */}
        <div data-pdf-section>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Gap Analysis: Current vs Target State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-6">
                This analysis shows the gap between your current maturity and the industry benchmark. 
                Focus on closing critical and significant gaps first.
              </p>
              
              <div className="space-y-4">
                {gapAnalysis.map((gap) => (
                  <GapAnalysisRow key={gap.dimensionId} gap={gap} />
                ))}
              </div>

              {/* Gap Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">Gap Severity:</span>
                {(['critical', 'significant', 'moderate', 'minor', 'on_track'] as const).map((severity) => (
                  <div key={severity} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getGapSeverityColor(severity) }}
                    />
                    <span className="text-xs text-slate-600 capitalize">
                      {severity.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROADMAP SECTION - Each phase as separate section */}
        <div data-pdf-section>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Your AI Transformation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Based on your assessment results and gap analysis, here is a prioritised roadmap 
                of initiatives to accelerate your AI maturity journey.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Each roadmap phase as its own PDF section */}
        {roadmapPhases.map((phase, phaseIndex) => (
          <div key={phase.timeframe} data-pdf-section>
            <RoadmapPhaseSection 
              phase={phase} 
              phaseIndex={phaseIndex}
              expandedInitiative={expandedInitiative}
              onToggleInitiative={toggleInitiative}
            />
          </div>
        ))}

        {/* Strengths */}
        <div data-pdf-section>
          <Card className="mb-8">
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
        </div>

        {/* Focus Areas */}
        <div data-pdf-section>
          <Card className="mb-8">
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

        {/* Quick Wins Recommendations */}
        {categorizedRecs.quick_win.length > 0 && (
          <div data-pdf-section>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Wins
                  <span className="text-sm font-normal text-slate-500">
                    (Implement in &lt;3 months)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        )}

        {/* Foundational Recommendations */}
        {categorizedRecs.foundational.length > 0 && (
          <div data-pdf-section>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-500" />
                  Foundational
                  <span className="text-sm font-normal text-slate-500">
                    (Build the groundwork)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        )}

        {/* Strategic Recommendations */}
        {categorizedRecs.strategic.length > 0 && (
          <div data-pdf-section>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Strategic
                  <span className="text-sm font-normal text-slate-500">
                    (Long-term transformation)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer CTA - Hidden in PDF */}
        <div data-pdf-section className="no-print">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Ready to accelerate your AI journey?</h2>
              <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                Our team can help you implement this roadmap and build your AI transformation strategy.
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
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function GapAnalysisRow({ gap }: { gap: GapAnalysis }) {
  const percentage = (gap.currentScore / 5) * 100;
  const targetPercentage = (gap.targetScore / 5) * 100;

  return (
    <div className="p-4 rounded-lg bg-slate-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: getGapSeverityColor(gap.gapSeverity) }}
          />
          <span className="font-medium text-slate-900">
            {DIMENSION_META[gap.dimensionId].label}
          </span>
          <span 
            className={cn(
              'text-xs px-2 py-0.5 rounded-full capitalize',
              gap.gapSeverity === 'critical' && 'bg-red-100 text-red-700',
              gap.gapSeverity === 'significant' && 'bg-orange-100 text-orange-700',
              gap.gapSeverity === 'moderate' && 'bg-yellow-100 text-yellow-700',
              gap.gapSeverity === 'minor' && 'bg-green-100 text-green-700',
              gap.gapSeverity === 'on_track' && 'bg-blue-100 text-blue-700',
            )}
          >
            {gap.gapSeverity.replace('_', ' ')}
          </span>
        </div>
        <div className="text-sm">
          <span className="font-bold text-slate-900">{gap.currentScore.toFixed(1)}</span>
          <span className="text-slate-400 mx-1">→</span>
          <span className="text-blue-600 font-medium">{gap.targetScore.toFixed(1)}</span>
          <span className="text-slate-400 ml-2">
            (Gap: {gap.gap > 0 ? '+' : ''}{gap.gap.toFixed(1)})
          </span>
        </div>
      </div>
      
      {/* Visual bar */}
      <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
        {/* Current score */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        {/* Target marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-slate-800"
          style={{ left: `${targetPercentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-slate-500">
        <span>Current: {gap.currentScore.toFixed(1)}</span>
        <span>Target: {gap.targetScore.toFixed(1)}</span>
      </div>
    </div>
  );
}

function RoadmapPhaseSection({ 
  phase, 
  phaseIndex,
  expandedInitiative,
  onToggleInitiative,
}: { 
  phase: RoadmapPhase;
  phaseIndex: number;
  expandedInitiative: string | null;
  onToggleInitiative: (id: string) => void;
}) {
  const phaseColors = [
    { bg: 'bg-yellow-500', light: 'bg-yellow-50', border: 'border-yellow-200', color: '#EAB308' },
    { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-200', color: '#3B82F6' },
    { bg: 'bg-purple-500', light: 'bg-purple-50', border: 'border-purple-200', color: '#8B5CF6' },
    { bg: 'bg-green-500', light: 'bg-green-50', border: 'border-green-200', color: '#22C55E' },
  ];
  const colors = phaseColors[phaseIndex] || phaseColors[0];

  return (
    <Card className="mb-4 overflow-hidden">
      <div 
        className="h-2" 
        style={{ backgroundColor: colors.color }}
      />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{phase.label}</CardTitle>
        <p className="text-sm text-slate-600">{phase.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {phase.initiatives.map((initiative) => (
            <InitiativeCard 
              key={initiative.id} 
              initiative={initiative}
              colors={colors}
              isExpanded={expandedInitiative === initiative.id}
              onToggle={() => onToggleInitiative(initiative.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function InitiativeCard({ 
  initiative, 
  colors,
  isExpanded,
  onToggle,
}: { 
  initiative: RoadmapInitiative;
  colors: { bg: string; light: string; border: string };
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const quadrant = getEffortImpactQuadrant(initiative.effortLevel, initiative.impactLevel);

  return (
    <div className={cn('rounded-lg border', colors.border, colors.light)}>
      {/* Header - always visible */}
      <div 
        className="p-4 cursor-pointer hover:bg-white/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-slate-900">{initiative.title}</h4>
              {quadrant === 'do_first' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Do First
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600">{initiative.description}</p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {initiative.estimatedDuration}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Gauge className="w-3 h-3" />
                Effort: <span className="capitalize">{initiative.effortLevel}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <TrendingUp className="w-3 h-3" />
                Impact: <span className="capitalize">{initiative.impactLevel}</span>
              </div>
              <div className="text-xs text-slate-400">
                {DIMENSION_META[initiative.dimensionId].label}
              </div>
            </div>
          </div>
          
          <ChevronRight className={cn(
            'w-5 h-5 text-slate-400 transition-transform',
            isExpanded && 'rotate-90'
          )} />
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-200 pt-4 space-y-4">
          {/* Key Deliverables */}
          <div>
            <h5 className="text-sm font-medium text-slate-700 mb-2">Key Deliverables</h5>
            <ul className="space-y-1">
              {initiative.keyDeliverables.map((deliverable, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>

          {/* Success Metrics */}
          <div>
            <h5 className="text-sm font-medium text-slate-700 mb-2">Success Metrics</h5>
            <ul className="space-y-1">
              {initiative.successMetrics.map((metric, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          {/* Dependencies */}
          {initiative.dependencies && initiative.dependencies.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                <strong>Dependencies:</strong> Complete these first: {initiative.dependencies.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
