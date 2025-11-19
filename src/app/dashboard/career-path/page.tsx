import { CareerPathClient } from "./_components/career-path-client";

export default function CareerPathPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Career Path Generator</h1>
        <p className="text-muted-foreground">
          Tell us about your skills and experience to discover potential career paths tailored for you.
        </p>
      </div>
      <CareerPathClient />
    </div>
  );
}
