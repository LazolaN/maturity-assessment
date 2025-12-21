'use client';

import { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IndustryId,
  CompanySizeId,
  INDUSTRIES,
  COMPANY_SIZES,
  INDUSTRY_META,
  COMPANY_SIZE_META,
} from '@/types/assessment';
import {
  Building,
  Code,
  Factory,
  Heart,
  Landmark,
  ShoppingCart,
  Briefcase,
  ArrowRight,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const INDUSTRY_ICONS: Record<IndustryId, React.ReactNode> = {
  technology: <Code className="w-5 h-5" />,
  financial_services: <Landmark className="w-5 h-5" />,
  healthcare: <Heart className="w-5 h-5" />,
  retail_ecommerce: <ShoppingCart className="w-5 h-5" />,
  manufacturing: <Factory className="w-5 h-5" />,
  professional_services: <Briefcase className="w-5 h-5" />,
  other: <Building className="w-5 h-5" />,
};

export function ContextStep() {
  const { setContext } = useAssessment();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId | null>(null);
  const [selectedSize, setSelectedSize] = useState<CompanySizeId | null>(null);

  const handleContinue = () => {
    if (selectedIndustry && selectedSize) {
      setContext(selectedIndustry, selectedSize);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Let&apos;s get started
        </h1>
        <p className="text-slate-600">
          Tell us about your organization so we can provide relevant benchmarks
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">What industry are you in?</CardTitle>
          <CardDescription>
            Select the industry that best describes your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {INDUSTRIES.map((industryId) => {
              const meta = INDUSTRY_META[industryId];
              const isSelected = selectedIndustry === industryId;
              
              return (
                <button
                  key={industryId}
                  onClick={() => setSelectedIndustry(industryId)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left',
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {INDUSTRY_ICONS[industryId]}
                  </div>
                  <span className="font-medium text-sm">{meta.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">What&apos;s your company size?</CardTitle>
          <CardDescription>
            This helps us compare you to similar organizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {COMPANY_SIZES.map((sizeId) => {
              const meta = COMPANY_SIZE_META[sizeId];
              const isSelected = selectedSize === sizeId;
              
              return (
                <button
                  key={sizeId}
                  onClick={() => setSelectedSize(sizeId)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left',
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-medium block">{meta.label}</span>
                    <span className="text-sm text-slate-500">{meta.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedIndustry || !selectedSize}
          className="px-8"
        >
          Start Assessment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
