import { ArrowRight, BarChart3, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { DIMENSION_META, DIMENSIONS } from '@/types/assessment';
import { getEstimatedCompletionTime, getTotalQuestionCount } from '@/data/questions';

export default function HomePage() {
  const questionCount = getTotalQuestionCount();
  const estimatedTime = getEstimatedCompletionTime();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <BarChart3 className="w-4 h-4" />
          Free Assessment
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          How AI-Ready is Your Organization?
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Discover your AI & Data maturity score across 6 critical dimensions. 
          Get personalized recommendations to accelerate your journey.
        </p>

        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        >
          Start Assessment
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="flex items-center justify-center gap-6 mt-6 text-slate-500">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {estimatedTime} minutes
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {questionCount} questions
          </span>
        </div>
      </div>

      {/* Dimensions Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          What We&apos;ll Assess
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {DIMENSIONS.map((dimensionId) => {
            const meta = DIMENSION_META[dimensionId];
            return (
              <div
                key={dimensionId}
                className="flex items-start gap-3 p-4 rounded-lg bg-slate-50"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">
                    {meta.shortLabel.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{meta.label}</h3>
                  <p className="text-sm text-slate-500">{meta.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What You'll Get */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          What You&apos;ll Get
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Maturity Score</h3>
            <p className="text-sm text-slate-500">
              Overall score from 1-5 with breakdown by dimension
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="22 8.5 12 15.5 2 8.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Industry Benchmark</h3>
            <p className="text-sm text-slate-500">
              See how you compare to others in your industry
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Action Plan</h3>
            <p className="text-sm text-slate-500">
              Prioritized recommendations tailored to your results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
