import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingSkillsChart } from "./_components/trending-skills-chart";
import { SalaryRangeChart } from "./_components/salary-range-chart";
import { DomainDemandChart } from "./_components/domain-demand-chart";

export default function MarketInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Market Insights</h1>
        <p className="text-muted-foreground">
          Stay ahead of the curve with real-time data on the job market.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="font-headline">Trending Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendingSkillsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Salary Ranges (by Experience)</CardTitle>
          </CardHeader>
          <CardContent>
            <SalaryRangeChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Demand by Domain</CardTitle>
          </CardHeader>
          <CardContent>
            <DomainDemandChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
