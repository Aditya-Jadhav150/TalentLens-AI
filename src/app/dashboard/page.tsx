import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

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
      </div>
    </div>
  );
}
