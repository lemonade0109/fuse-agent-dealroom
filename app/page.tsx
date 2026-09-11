"use client";

import React from "react";
import {
  Activity,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import Link from "next/link";

type AIRecommendation = {
  recommendation: string;
  reasoning: string;
  confidence: number;
  message: string;
};

const agentActivity = [
  {
    title: "Research Agent",
    description:
      "Detected a hiring surge across sales and customer success roles.",
    time: "8 min ago",
    icon: Search,
  },
  {
    title: "Enrichment Agent",
    description:
      "Identified Maya Chen, VP of Sales, as the likely economic buyer.",
    time: "14 min ago",
    icon: UserRound,
  },
  {
    title: "Strategy Agent",
    description:
      "Generated a personalized outreach angle based on expansion signals.",
    time: "22 min ago",
    icon: Sparkles,
  },
];

const signals = [
  {
    label: "Hiring activity",
    value: "High",
    description: "12 new GTM roles opened this month",
  },
  {
    label: "Buying intent",
    value: "Strong",
    description: "Multiple revenue-ops signals detected",
  },
  {
    label: "Decision maker",
    value: "Found",
    description: "VP Sales identified with 92% confidence",
  },
];

export default function Home() {
  const [recommendation, setRecommendation] =
    React.useState<AIRecommendation | null>(null);

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState("");

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
    } catch (err) {
      console.error(err);
      setError("Strategy Agent couldn't generate a recommendation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="font-semibold">Fuse</p>
              <p className="text-xs text-slate-500">Agent Dealroom</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <SidebarItem icon={Building2} label="Overview" active />
            <SidebarItem icon={Target} label="Accounts" />
            <SidebarItem icon={Bot} label="Agents" />
            <SidebarItem icon={ShieldCheck} label="Approvals" />
            <SidebarItem icon={Activity} label="Activity" />
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <p className="text-sm font-medium">4 agents active</p>
              <p className="mt-1 text-xs text-slate-400">
                Monitoring 18 target accounts
              </p>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
            <div>
              <p className="text-sm text-slate-500">Account Intelligence</p>
              <h1 className="text-lg font-semibold">Dealroom</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm md:block">
                Search accounts
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                JO
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl p-5 md:p-8">
            <section className="mb-6 flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <Building2 size={22} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold">Acme Corp</h2>
                    <p className="text-sm text-slate-500">
                      Enterprise SaaS · 420 employees
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge>Enterprise</Badge>
                  <Badge>$85K opportunity</Badge>
                  <Badge>Active evaluation</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
                <CheckCircle2 size={19} className="text-emerald-700" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                    Deal status
                  </p>
                  <p className="text-sm font-semibold text-emerald-950">
                    Qualified opportunity
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-6 grid gap-4 md:grid-cols-3">
              <MetricCard
                icon={Target}
                label="Deal health"
                value="78"
                suffix="/100"
                description="+9 points this week"
              />

              <MetricCard
                icon={CircleDollarSign}
                label="Opportunity"
                value="$85K"
                description="Estimated annual contract"
              />

              <MetricCard
                icon={Clock3}
                label="Next action"
                value="Today"
                description="Recommended within 4 hours"
              />
            </section>

            <section className="mb-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Live intelligence</p>
                    <h3 className="text-xl font-semibold">Agent signals</h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live
                  </div>
                </div>

                <div className="space-y-3">
                  {signals.map((signal) => (
                    <div
                      key={signal.label}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">{signal.label}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {signal.description}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                        {signal.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-8 flex items-center gap-2 text-indigo-300">
                    <Sparkles size={18} />
                    <span className="text-sm font-medium">
                      Recommended next action
                    </span>
                  </div>

                  <p className="text-2xl font-semibold leading-tight">
                    {recommendation
                      ? recommendation.recommendation
                      : "Ready to analyze Acme's account signals."}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {recommendation
                      ? recommendation.reasoning
                      : "The Strategy Agent can analyze the research, enrichment, and buying-intent signals to determine the best next action."}
                  </p>
                  <div className="mt-5 rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Confidence
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-medium">
                        {recommendation ? "AI confidence" : "Awaiting analysis"}
                      </p>

                      <p className="font-semibold">
                        {recommendation ? `${recommendation.confidence}%` : "—"}
                      </p>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
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

                  {error && (
                    <p className="mt-3 text-center text-sm text-rose-300">
                      {error}
                    </p>
                  )}

                  {recommendation && (
                    <Link
                      href="/accounts/acme/review"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                      Review & approve
                      <ChevronRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Agent workspace</p>
                  <h3 className="text-xl font-semibold">
                    Recent agent activity
                  </h3>
                </div>

                <button className="text-sm font-medium text-slate-600">
                  View all
                </button>
              </div>

              <div className="space-y-2">
                {agentActivity.map((activity) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      key={activity.title}
                      className="flex gap-4 rounded-2xl p-4 transition hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-xs text-slate-400">
                            {activity.time}
                          </p>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
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
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  suffix?: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon size={18} />
      </div>

      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-semibold">
        {value}
        {suffix && (
          <span className="text-base font-normal text-slate-400">{suffix}</span>
        )}
      </p>

      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
}
