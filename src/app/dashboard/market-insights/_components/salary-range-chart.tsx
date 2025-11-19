'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { experience: '0-2', salary: [60000, 85000] },
  { experience: '2-4', salary: [80000, 120000] },
  { experience: '4-7', salary: [110000, 160000] },
  { experience: '7-10', salary: [140000, 200000] },
  { experience: '10+', salary: [180000, 250000] },
];

const chartConfig = {
    salary: {
        label: "Salary",
        color: "hsl(var(--primary))",
    },
};

export function SalaryRangeChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="experience" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            content={<ChartTooltipContent
                formatter={(value, name) => [
                    `$${new Intl.NumberFormat('en-US').format(value as number)}`,
                    name === 'salary' ? 'Range' : String(name),
                ]}
                labelFormatter={ (label, payload) => {
                    const range = payload?.[0]?.payload?.salary;
                    if (range) {
                        return `Experience: ${label} yrs | Salary: $${range[0]/1000}k - $${range[1]/1000}k`
                    }
                    return `Experience: ${label} yrs`
                }}
            />}
          />
          <defs>
            <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="salary" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSalary)" />
        </AreaChart>
    </ChartContainer>
  );
}
