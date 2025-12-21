import { AssessmentProvider } from '@/context/AssessmentContext';
import { AssessmentFlow } from '@/components/assessment/AssessmentFlow';

export default function AssessmentPage() {
  return (
    <AssessmentProvider>
      <AssessmentFlow />
    </AssessmentProvider>
  );
}
