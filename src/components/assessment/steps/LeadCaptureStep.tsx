'use client';

import { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LeadInfo } from '@/types/assessment';
import { ArrowLeft, FileText, Mail, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LeadCaptureStep() {
  const { state, submitLead, setStep } = useAssessment();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    marketingOptIn: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !state.result) return;

    const leadInfo: LeadInfo = {
      ...formData,
      industry: state.response!.industry,
      companySize: state.response!.companySize,
      overallScore: state.result.overallScore.weighted,
      maturityLevel: state.result.overallScore.maturityLevel,
      submittedAt: new Date(),
      // UTM params would be extracted from URL in production
    };

    await submitLead(leadInfo);
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={() => setStep('results_teaser')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results preview
        </button>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle>Get Your Full Report</CardTitle>
            <CardDescription>
              Enter your email to receive your complete AI Maturity Assessment with all recommendations
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Work Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className={cn('pl-10', errors.email && 'border-red-500')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange('firstName')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={handleChange('lastName')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange('company')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Director of Data"
                  value={formData.jobTitle}
                  onChange={handleChange('jobTitle')}
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="marketingOptIn"
                  checked={formData.marketingOptIn}
                  onChange={handleChange('marketingOptIn')}
                  className="mt-1"
                />
                <Label htmlFor="marketingOptIn" className="text-sm text-slate-500 font-normal">
                  I&apos;d like to receive insights on AI transformation and data strategy
                </Label>
              </div>

              {state.error && (
                <p className="text-sm text-red-500 text-center">{state.error}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Get My Report'
                )}
              </Button>

              <p className="text-xs text-slate-400 text-center">
                By submitting, you agree to our Privacy Policy. We&apos;ll never share your data.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
