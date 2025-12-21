# AI & Data Maturity Assessment

A B2B SaaS tool for assessing organizational AI readiness across 6 key dimensions.

## Features

- **6 Dimension Assessment**: Strategy, Data Foundation, AI Engineering, Governance, Talent, Business Value
- **Industry Benchmarking**: Compare scores against industry averages
- **Radar Chart Visualization**: Visual comparison with benchmarks
- **Rule-Based Recommendations**: Tailored advice based on scores
- **Lead Capture**: Email gate for full report access

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React Context (client-side)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd maturity-assessment

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── assessment/        # Assessment flow
│       └── page.tsx
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui style)
│   ├── charts/            # Chart components
│   └── assessment/        # Assessment-specific components
│       └── steps/         # Step components for each phase
├── context/               # React Context providers
│   └── AssessmentContext.tsx
├── data/                  # Static data & content
│   ├── questions.ts       # Assessment questions
│   ├── benchmarks.ts      # Industry baseline data
│   └── recommendations.ts # Rule-based recommendations
├── lib/                   # Utility functions
│   ├── utils.ts          # General utilities
│   └── scoring.ts        # Scoring engine
└── types/                 # TypeScript type definitions
    └── assessment.ts
```

## Assessment Flow

1. **Intro/Context**: User selects industry and company size
2. **Questions**: 30 questions across 6 dimensions (~6 min)
3. **Results Teaser**: Preview score + radar chart + top 3 recommendations
4. **Lead Capture**: Email form to unlock full report
5. **Full Results**: Complete report with all recommendations

## Customization

### Adding Questions

Edit `src/data/questions.ts` to add or modify questions.

### Adjusting Benchmarks

Edit `src/data/benchmarks.ts` to update industry baseline data.

### Adding Recommendations

Edit `src/data/recommendations.ts` to add recommendations with score ranges.

## Future Enhancements

- [ ] PDF report generation
- [ ] Webhook integration (Zapier/Make)
- [ ] Database persistence (Prisma/Postgres)
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Email delivery of reports

## License

Proprietary - All rights reserved
