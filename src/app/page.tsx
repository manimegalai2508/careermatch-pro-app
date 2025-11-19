import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, LineChart, SearchCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
                Find Your Perfect Career Match with AI
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                CareerMatch Pro leverages cutting-edge AI to analyze your skills, optimize your resume, and connect you with the best job opportunities.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
           <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-accent opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </section>

        <section id="features" className="w-full bg-muted py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful tools for both job seekers and recruiters.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <SearchCheck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">AI Resume Analyzer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant feedback on your resume. Our AI checks for grammar, ATS compatibility, and offers actionable suggestions to make your profile stand out.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BrainCircuit className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Personalized Career Paths</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unsure about your next move? Discover personalized career roadmaps, complete with skill suggestions and recommended courses to guide your professional growth.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                   <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Recruiter & Market Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    For recruiters, a dashboard with ranked candidates. For everyone, insights into trending skills and salary ranges to stay ahead of the curve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CareerMatch Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
