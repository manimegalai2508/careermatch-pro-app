'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { skill: 'Python', demand: 98 },
  { skill: 'React', demand: 95 },
  { skill: 'SQL', demand: 89 },
  { skill: 'Go', demand: 85 },
  { skill: 'AWS', demand: 92 },
  { skill: 'TypeScript', demand: 91 },
  { skill: 'LLMs', demand: 78 },
  { skill: 'AGI', demand: 65 },
];

const chartConfig = {
  demand: {
    label: "Demand",
    color: "hsl(var(--primary))",
  },
};

export function TrendingSkillsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent />}
          />
          <Bar dataKey="demand" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
