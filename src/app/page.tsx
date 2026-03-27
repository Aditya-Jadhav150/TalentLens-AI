import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-8">
          <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">The New Hiring Standard</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 leading-[1.1]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-black">Hire Potential.</span> <br />
          <span className="text-slate-500 font-medium tracking-normal text-[0.9em]">Not just resumes.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Evaluate candidates through their real-world digital footprint, automated structured interviews, and unbiased multi-perspective panel decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/apply" className="px-8 py-3.5 rounded-lg bg-slate-900 text-white font-medium text-lg hover:bg-slate-800 transition-colors w-full sm:w-auto premium-shadow">
            Start Candidate Journey
          </Link>
        </div>
      </div>
      
      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 md:mt-28 w-full animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <div className="bg-white rounded-xl p-8 border border-slate-200 hover:border-slate-300 transition-colors premium-shadow text-left">
          <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Talent Discovery</h3>
          <p className="text-slate-600 leading-relaxed text-sm">Analyze non-traditional signals like GitHub activity, open-source contributions, and real-world projects to find hidden gems.</p>
        </div>
        
        <div className="bg-white rounded-xl p-8 border border-slate-200 hover:border-slate-300 transition-colors premium-shadow text-left">
          <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Structured Interviews</h3>
          <p className="text-slate-600 leading-relaxed text-sm">Conduct dynamic, real-time interviews that adapt to the candidate's answers to perfectly evaluate their reasoning.</p>
        </div>
        
        <div className="bg-white rounded-xl p-8 border border-slate-200 hover:border-slate-300 transition-colors premium-shadow text-left">
          <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Unbiased Panel</h3>
          <p className="text-slate-600 leading-relaxed text-sm">Extract evaluations from multiple simulated perspectives to reach a well-rounded and objective hiring decision.</p>
        </div>
      </div>
    </div>
  );
}
