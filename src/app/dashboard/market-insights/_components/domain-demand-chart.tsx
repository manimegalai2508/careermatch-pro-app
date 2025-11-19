'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { domain: 'FinTech', demand: 27, fill: 'hsl(var(--chart-1))' },
  { domain: 'Healthcare', demand: 22, fill: 'hsl(var(--chart-2))' },
  { domain: 'SaaS', demand: 31, fill: 'hsl(var(--chart-3))' },
  { domain: 'E-commerce', demand: 15, fill: 'hsl(var(--chart-4))' },
  { domain: 'AI/ML', demand: 35, fill: 'hsl(var(--chart-5))' },
];

export function DomainDemandChart() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="demand"
            nameKey="domain"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
                return (
                  <text
                    x={x}
                    y={y}
                    fill="hsl(var(--foreground))"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-xs"
                  >
                    {chartData[index].domain} ({value}%)
                  </text>
                );
              }}
            labelLine={false}
          >
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.domain}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
