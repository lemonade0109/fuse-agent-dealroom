"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Check,
  CheckCircle2,
  ExternalLink,
  FileText,
  Pencil,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";

const evidence = [
  {
    title: "Hiring acceleration",
    description:
      "Acme Corp opened 12 GTM roles across Sales, Revenue Operations, and Customer Success within the last 30 days.",
    confidence: 94,
    source: "Careers page",
  },
  {
    title: "Revenue operations expansion",
    description:
      "The company appears to be investing in RevOps infrastructure, suggesting an active push to scale its go-to-market motion.",
    confidence: 88,
    source: "Company updates",
  },
  {
    title: "Likely economic buyer identified",
    description:
      "Maya Chen, VP of Sales, matches the ownership profile for evaluating sales automation and agentic GTM tooling.",
    confidence: 92,
    source: "Enrichment data",
  },
];

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-sm text-slate-500">Acme Corp</p>
              <h1 className="text-xl font-semibold">Review agent action</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 md:flex">
            <ShieldCheck size={16} />
            Human approval required
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-5 md:p-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-indigo-300">
                <Sparkles size={18} />
                <span className="text-sm font-medium">
                  Strategy Agent recommendation
                </span>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                High priority
              </span>
            </div>

            <h2 className="max-w-2xl text-2xl font-semibold leading-tight md:text-3xl">
              Reach out to Maya Chen with a tailored expansion message.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              The agent believes Acme Corp is entering a strong buying window
              based on hiring activity, revenue-operations expansion, and the
              identification of a likely decision maker.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat label="Confidence" value="91%" />
              <Stat label="Signals used" value="3" />
              <Stat label="Recommended timing" value="Today" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm text-slate-500">Why this action</p>
              <h2 className="text-xl font-semibold">Supporting evidence</h2>
            </div>

            <div className="space-y-4">
              {evidence.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                        <CheckCircle2 size={18} />
                      </div>

                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {item.confidence}% confidence
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FileText size={15} />
                      {item.source}
                    </div>

                    <button className="flex items-center gap-1 text-sm font-medium text-slate-600">
                      View source
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Proposed execution</p>
                <h2 className="text-xl font-semibold">Outreach message</h2>
              </div>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
                <Pencil size={15} />
                Edit
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Hi Maya,</p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                I noticed Acme has been expanding its GTM team quite
                aggressively, particularly across Sales and Revenue Operations.
                Teams at that stage often start feeling the friction of manual
                research, enrichment, and follow-up across multiple tools.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Fuse helps revenue teams coordinate AI agents across those
                workflows while keeping humans in control of important actions.
                Thought it might be relevant given the direction your team
                appears to be heading.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Worth a quick conversation?
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <Bot size={20} />
              </div>

              <div>
                <p className="font-semibold">Strategy Agent</p>
                <p className="text-sm text-slate-500">Generated 6 min ago</p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoRow label="Goal" value="Create qualified outreach" />
              <InfoRow label="Target" value="Maya Chen, VP Sales" />
              <InfoRow label="Account" value="Acme Corp" />
              <InfoRow label="Opportunity" value="$85K ARR" />
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-700">
                <Target size={18} />
              </div>

              <div>
                <p className="font-semibold text-indigo-950">
                  Why human approval?
                </p>

                <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                  This action would contact an external prospect. Fuse pauses
                  execution so a human can inspect the recommendation, evidence,
                  and message before anything is sent.
                </p>
              </div>
            </div>
          </div>

          <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Decision</p>
            <h2 className="mt-1 text-xl font-semibold">Approve this action?</h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Approval will move this recommendation into the execution queue.
            </p>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">
              <Check size={18} />
              Approve action
            </button>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
              <Pencil size={17} />
              Edit first
            </button>

            <button className="mt-3 flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-rose-600">
              <X size={17} />
              Reject recommendation
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-none last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}
