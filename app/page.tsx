"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Gauge,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

type AIRecommendation = {
  recommendation: string;
  reasoning: string;
  confidence: number;
  message: string;
};

const signals = [
  {
    label: "Hiring activity",
    status: "High",
    description: "12 new GTM roles opened this month",
    confidence: "94%",
    icon: Users,
  },
  {
    label: "Buying intent",
    status: "Strong",
    description: "Multiple revenue-ops signals detected",
    confidence: "88%",
    icon: Activity,
  },
  {
    label: "Decision maker",
    status: "Found",
    description: "VP Sales identified with 92% confidence",
    confidence: "92%",
    icon: Target,
  },
];

const recentActivity = [
  {
    agent: "Research Agent",
    text: "Detected accelerated GTM hiring",
    time: "4 min ago",
    icon: Search,
  },
  {
    agent: "Enrichment Agent",
    text: "Identified likely economic buyer",
    time: "8 min ago",
    icon: CircleUserRound,
  },
  {
    agent: "Strategy Agent",
    text: "Account ready for next-best-action analysis",
    time: "Just now",
    icon: WandSparkles,
  },
];

export default function Home() {
  const [recommendation, setRecommendation] =
    useState<AIRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateRecommendation = async () => {
    try {
      setIsGenerating(true);
      setError("");

      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: "Acme Corp",
          employeeCount: 420,
          opportunity: "$85K ARR",
          contact: "Maya Chen, VP of Sales",
          signals: signals.map((signal) => ({
            label: signal.label,
            description: signal.description,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recommendation");
      }

      const data: AIRecommendation = await response.json();

      setRecommendation(data);
      sessionStorage.setItem(
        "fuse-recommendation",
        JSON.stringify(data)
      );
      sessionStorage.removeItem("fuse-approved-message");
      sessionStorage.removeItem("fuse-execution-status");
    } catch (err) {
      console.error(err);
      setError("Strategy Agent couldn't generate a recommendation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-950">Fuse</p>
                <p className="text-xs text-slate-500">Agent Dealroom</p>
              </div>
            </div>

            <nav className="mt-9 space-y-1">
              <SidebarItem icon={BarChart3} label="Overview" active />
              <SidebarItem icon={Building2} label="Accounts" />
              <SidebarItem icon={Bot} label="Agents" />
              <SidebarItem icon={ShieldCheck} label="Approvals" />
              <SidebarItem icon={Activity} label="Activity" />
            </nav>
          </div>

          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Workspace
              </p>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-3 font-semibold text-slate-900">4 agents active</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Monitoring 18 target accounts
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Account Intelligence
              </p>
              <h1 className="text-xl font-semibold text-slate-950">Dealroom</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 md:flex">
                <Search size={16} />
                Search accounts
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                JO
              </div>
            </div>
          </header>

          <div className="p-5 md:p-8">
            <div className="mx-auto max-w-6xl">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold text-slate-950">
                          Acme Corp
                        </h2>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Qualified opportunity
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">
                        Enterprise SaaS · 420 employees
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs text-slate-400">Opportunity</p>
                    <p className="mt-1 font-semibold text-slate-950">$85K ARR</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-3">
                  <MetricCard
                    icon={Gauge}
                    label="Deal health"
                    value="78 / 100"
                    detail="Strong"
                  />
                  <MetricCard
                    icon={BriefcaseBusiness}
                    label="Opportunity"
                    value="$85K"
                    detail="ARR potential"
                  />
                  <MetricCard
                    icon={Clock3}
                    label="Next action"
                    value="Today"
                    detail="Buying window"
                  />
                </div>
              </section>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Agent signals
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-950">
                        Account intelligence
                      </h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      3 signals
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {signals.map((signal) => (
                      <div
                        key={signal.label}
                        className="rounded-2xl border border-slate-200 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <signal.icon size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">
                                {signal.label}
                              </p>
                              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                                {signal.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {signal.description}
                            </p>
                            <p className="mt-2 text-xs font-medium text-slate-400">
                              Confidence {signal.confidence}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                      <Sparkles size={16} />
                      Recommended next action
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      Strategy Agent
                    </span>
                  </div>

                  <p className="mt-6 text-2xl font-semibold leading-tight">
                    {recommendation
                      ? recommendation.recommendation
                      : "Ready to analyze Acme's account signals."}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {recommendation
                      ? recommendation.reasoning
                      : "The Strategy Agent can analyze research, enrichment, and buying-intent signals to determine the strongest next action."}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-medium text-slate-300">
                        {recommendation ? "AI confidence" : "Awaiting analysis"}
                      </p>
                      <p className="font-semibold">
                        {recommendation
                          ? `${recommendation.confidence}%`
                          : "—"}
                      </p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-700"
                        style={{
                          width: recommendation
                            ? `${recommendation.confidence}%`
                            : "0%",
                        }}
                      />
                    </div>
                  </div>

                  {!recommendation && (
                    <button
                      onClick={generateRecommendation}
                      disabled={isGenerating}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-70"
                    >
                      {isGenerating ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Strategy Agent analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles size={17} />
                          Generate AI recommendation
                        </>
                      )}
                    </button>
                  )}

                  {recommendation && (
                    <>
                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Draft outreach
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {recommendation.message}
                        </p>
                      </div>

                      <button
                        onClick={generateRecommendation}
                        disabled={isGenerating}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                      >
                        <Sparkles size={16} />
                        {isGenerating ? "Regenerating..." : "Regenerate"}
                      </button>

                      <Link
                        href="/accounts/acme/review"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
                      >
                        Review & approve
                        <ChevronRight size={18} />
                      </Link>
                    </>
                  )}

                  {error && (
                    <p className="mt-3 text-center text-sm text-rose-300">
                      {error}
                    </p>
                  )}
                </section>
              </div>

              <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Recent activity
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950">
                      Agent activity
                    </h3>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-400" />
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  {recentActivity.map((item) => (
                    <div
                      key={item.agent}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <item.icon size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.agent}
                          </p>
                          <p className="text-xs text-slate-400">{item.time}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof BarChart3;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-slate-950 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
        <Icon size={15} />
        {label}
      </div>
      <p className="mt-3 text-xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
