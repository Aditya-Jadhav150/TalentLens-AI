import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ClerkProvider, SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentLens | Hire Potential",
  description: "Evaluate candidates efficiently through real-world signals and dynamic assessments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
        <nav className="w-full z-50 fixed top-0 left-0 right-0 h-16 flex items-center bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-slate-900 flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-xs font-bold">TL</span>
              </div>
              <span className="hidden sm:inline-block">TalentLens</span>
            </Link>
            <div className="flex gap-3 sm:gap-6 items-center">
              <Link href="/apply" className="hidden md:inline-flex px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors premium-shadow">
                Start Candidate Journey
              </Link>
              <Link href="/apply" className="md:hidden px-3 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors premium-shadow">
                Apply
              </Link>
              {userId ? (
                <>
                  <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 w-auto">Dashboard</Link>
                  <UserButton />
                </>
              ) : (
                <SignInButton>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap">Sign In</button>
                </SignInButton>
              )}
            </div>
          </div>
        </nav>
        <main className="flex-1 pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
