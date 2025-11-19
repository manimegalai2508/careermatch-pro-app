import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontBody = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

const fontHeadline = Inter({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-headline',
});


export const metadata: Metadata = {
  title: "CareerMatch Pro",
  description: "AI-Powered Career and Recruitment Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
