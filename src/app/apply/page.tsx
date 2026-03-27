"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",
    achievements: "",
    problemSolving: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem('candidateProfile', data.profile);
          window.localStorage.removeItem('candidateTranscript');
        }
        router.push(`/interview/${data.candidateId}`);
      } else {
        alert('Failed to process application: ' + (data.error || 'Unknown error. Check terminal.'));
        setIsSubmitting(false);
      }
    } catch (e: any) {
      console.error(e);
      alert('Network Error: ' + e.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 sm:mb-4 text-slate-900">Candidate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Application</span></h1>
        <p className="text-slate-600 text-sm sm:text-base">Submit your real-world signals. We evaluate your potential, not just your past.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white premium-shadow rounded-2xl sm:rounded-3xl p-5 sm:p-10 space-y-8 border border-slate-200">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
              <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400" placeholder="jane@example.com" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Digital Footprint</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700">LinkedIn Profile</label>
              <input required type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400" placeholder="https://linkedin.com/in/janedoe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="github" className="block text-sm font-medium text-slate-700">GitHub Profile</label>
              <input required type="url" id="github" name="github" value={formData.github} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400" placeholder="https://github.com/janedoe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="portfolio" className="block text-sm font-medium text-slate-700">Portfolio / Personal Site</label>
              <input type="url" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400" placeholder="https://janedoe.dev" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Beyond the Resume</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="achievements" className="block text-sm font-medium text-slate-700">Key Achievements</label>
              <p className="text-xs text-slate-500">Briefly list your top 3 professional or personal achievements.</p>
              <textarea required id="achievements" name="achievements" value={formData.achievements} onChange={handleChange} rows={3} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 resize-none" placeholder="- Scaled database to 1M daily queries&#10;- Won 1st place at HackMIT&#10;- Maintained an open source library with 5k stars"></textarea>
            </div>
            <div className="space-y-2">
              <label htmlFor="problemSolving" className="block text-sm font-medium text-slate-700">Base Problem Solving</label>
              <p className="text-xs text-slate-500">Describe a complex technical problem you solved, how you approached it, and what you learned.</p>
              <textarea required id="problemSolving" name="problemSolving" value={formData.problemSolving} onChange={handleChange} rows={5} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 resize-none" placeholder="When migrating our monolithic architecture to microservices..."></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center premium-shadow">
            {isSubmitting ? "Processing Signals..." : "Submit & Start Adaptive Interview"}
          </button>
        </div>
      </form>
    </div>
  );
}
