"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedHistory = JSON.parse(window.localStorage.getItem('dashboardHistory') || '[]');
        setHistory(savedHistory);
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  if (!isLoaded || !userId) return null;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 sm:p-8 bg-slate-50">
      <div className="max-w-6xl w-full mx-auto animate-fade-in-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1">
              Dashboard
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">Manage your candidate interviews and evaluations.</p>
          </div>
          <Link href="/apply" className="w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm">
            New Interview
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-sm min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">No Recent Activity</h3>
            <p className="text-slate-500 mb-6 max-w-md">
              Start a new candidate journey by inviting someone to an interview, or check back later to view completed evaluations.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 gap-4 bg-slate-50 px-6 py-3 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-2">Candidate Evaluation</div>
              <div>Position</div>
              <div className="text-center">Score</div>
              <div className="text-right">Action</div>
            </div>
            <div className="divide-y divide-slate-100">
              {history.map((candidate, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-3 mb-1">
                       <span className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                         candidate.decision.includes("HIRE") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                       }`}>
                         {candidate.decision}
                       </span>
                    </div>
                    <p className="text-slate-500 text-xs font-mono truncate max-w-[200px]">ID: {candidate.id || "Anonymous"}</p>
                    <p className="text-slate-400 text-xs mt-1">{new Date(candidate.date).toLocaleDateString()}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-slate-900 text-sm font-medium">{candidate.role || "Software Engineer"}</p>
                    <p className="text-slate-500 text-xs">{candidate.level || "Senior"}</p>
                  </div>
                  <div className="hidden sm:block text-center">
                    <span className="text-xl font-bold text-slate-900">{candidate.score}</span>
                    <span className="text-xs text-slate-400">/100</span>
                  </div>
                  <div className="flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
                    <div className="sm:hidden block">
                      <p className="text-slate-900 text-sm font-medium">{candidate.role || "Software Engineer"}</p>
                      <span className="text-lg font-bold text-slate-900 mr-1">{candidate.score}</span>
                      <span className="text-xs text-slate-400">/100</span>
                    </div>
                    <Link href={`/dashboard/${candidate.id}`} className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors">
                      View Panel
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
