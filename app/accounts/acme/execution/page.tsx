"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

type ExecutionStatus = "ready" | "sending" | "sent";

const fallbackMessage =
  "Hi Maya, I noticed Acme has been expanding its GTM team and investing more in revenue operations. I thought it might be useful to share how Fuse could help your team automate account research and outreach workflows.";

const timeline = [
  {
    title: "Research Agent",
    description: "Collected recent account and hiring signals",
    status: "Completed",
    time: "12 min ago",
    icon: Search,
  },
  {
    title: "Enrichment Agent",
    description: "Identified Maya Chen as likely economic buyer",
    status: "Completed",
    time: "8 min ago",
    icon: Target,
  },
  {
    title: "Strategy Agent",
    description: "Generated the recommended next action",
    status: "Completed",
    time: "4 min ago",
    icon: Sparkles,
  },
  {
    title: "Human approval",
    description: "Recommendation reviewed and released",
    status: "Approved",
    time: "Just now",
    icon: UserCheck,
  },
  {
    title: "Outreach Agent",
    description: "Deliver the approved message to Maya Chen",
    status: "Ready",
    time: "Waiting",
    icon: Bot,
  },
];

export default function ExecutionPage() {
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>(
    () => {
      if (typeof window !== "undefined") {
        const storedStatus = sessionStorage.getItem("fuse-execution-status");
        if (storedStatus === "sent") return "sent";
      }
      return "ready";
    },
  );
  const [approvedMessage, setApprovedMessage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedMessage = sessionStorage.getItem("fuse-approved-message");
      if (storedMessage) return storedMessage;
    }
    return fallbackMessage;
  });

  const executeOutreach = () => {
    if (executionStatus !== "ready") return;

    sessionStorage.setItem("fuse-execution-status", "executing");
    setExecutionStatus("sending");

    setTimeout(() => {
      setExecutionStatus("sent");
      sessionStorage.setItem("fuse-execution-status", "sent");
    }, 1800);
  };

  const resetDemo = () => {
    sessionStorage.removeItem("fuse-execution-status");
    setExecutionStatus("ready");
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-5 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Link
              href="/accounts/acme/review"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to review
            </Link>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Acme Corp
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">
              Execution timeline
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            <ShieldCheck size={17} />
            Action approved
          </div>
        </header>

        <section className="mt-7 rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 md:p-7">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                <Bot size={17} />
                Agent execution
              </div>
              <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight">
                Outreach to Maya Chen is{" "}
                {executionStatus === "sent"
                  ? "complete."
                  : executionStatus === "sending"
                    ? "being executed."
                    : "ready for execution."}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                The action passed research, enrichment, strategy, and human
                approval before reaching the Outreach Agent.
              </p>
            </div>

            <div className="grid min-w-[300px] grid-cols-3 gap-2">
              <DarkStat label="Agents involved" value="4" />
              <DarkStat label="Human gates" value="1" />
              <DarkStat
                label="Current state"
                value={
                  executionStatus === "sent"
                    ? "Sent"
                    : executionStatus === "sending"
                      ? "Executing"
                      : "Ready"
                }
              />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Execution summary
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryItem label="Target" value="Maya Chen" />
                <SummaryItem label="Role" value="VP Sales" />
                <SummaryItem label="Opportunity" value="$85K ARR" />
                <SummaryItem label="Confidence" value="91%" />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Execution chain
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-950">
                Agent timeline
              </h3>

              <div className="mt-6">
                {timeline.map((item, index) => {
                  const isOutreach = item.title === "Outreach Agent";
                  const dynamicStatus = isOutreach
                    ? executionStatus === "sent"
                      ? "Completed"
                      : executionStatus === "sending"
                        ? "Executing"
                        : "Ready"
                    : item.status;

                  const dynamicTime = isOutreach
                    ? executionStatus === "sent"
                      ? "Just now"
                      : executionStatus === "sending"
                        ? "In progress"
                        : item.time
                    : item.time;

                  return (
                    <div key={item.title} className="relative flex gap-4 pb-7">
                      {index !== timeline.length - 1 && (
                        <div className="absolute left-[19px] top-10 h-[calc(100%-18px)] w-px bg-slate-200" />
                      )}

                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                        <item.icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {item.description}
                            </p>
                          </div>

                          <div className="text-right">
                            <StatusBadge status={dynamicStatus} />
                            <p className="mt-1 text-xs text-slate-400">
                              {dynamicTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Audit trail
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-950">
                Human-controlled automation
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                The system preserves the path from account evidence to AI
                recommendation, human review, approved content, and execution
                status. No customer-facing action is released before the human
                approval gate.
              </p>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Outreach Agent</p>
                  <p className="text-sm text-slate-500">
                    {executionStatus === "sent"
                      ? "Execution completed"
                      : executionStatus === "sending"
                        ? "Executing approved action..."
                        : "Waiting for execution"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Approved message
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {approvedMessage}
                </p>
              </div>

              <button
                onClick={executeOutreach}
                disabled={executionStatus !== "ready"}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold transition ${
                  executionStatus === "sent"
                    ? "bg-emerald-600 text-white"
                    : executionStatus === "sending"
                      ? "cursor-wait bg-slate-700 text-white"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                }`}
              >
                {executionStatus === "sent" ? (
                  <>
                    <CheckCircle2 size={17} />
                    Outreach sent
                  </>
                ) : executionStatus === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Outreach Agent executing...
                  </>
                ) : (
                  <>
                    <Mail size={17} />
                    Execute outreach
                  </>
                )}
              </button>

              {executionStatus === "sent" && (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-950">
                        Message sent successfully
                      </p>
                      <p className="mt-1 text-sm leading-6 text-emerald-800/70">
                        Outreach Agent delivered the approved message to Maya
                        Chen. The action has been recorded in the audit trail.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-700">
                        <Clock3 size={14} />
                        Sent just now
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetDemo}
                    className="mt-4 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800"
                  >
                    Reset execution demo
                  </button>
                </div>
              )}
            </section>

            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Back to dealroom
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DarkStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes =
    status === "Completed" || status === "Approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Executing"
        ? "bg-indigo-50 text-indigo-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}
