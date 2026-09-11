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
  UserRound,
} from "lucide-react";
import { useState, useEffect } from "react";

const timeline = [
  {
    title: "Research Agent",
    description:
      "Detected Acme Corp's GTM hiring acceleration and revenue-operations expansion.",
    time: "28 min ago",
    status: "Completed",
    icon: Search,
  },
  {
    title: "Enrichment Agent",
    description:
      "Identified Maya Chen, VP of Sales, as the likely economic buyer.",
    time: "21 min ago",
    status: "Completed",
    icon: UserRound,
  },
  {
    title: "Strategy Agent",
    description:
      "Generated a tailored outreach recommendation using three verified signals.",
    time: "14 min ago",
    status: "Completed",
    icon: Sparkles,
  },
  {
    title: "Human approval",
    description: "Recommendation reviewed and approved for external outreach.",
    time: "Just now",
    status: "Approved",
    icon: ShieldCheck,
  },
  {
    title: "Outreach Agent",
    description: "Preparing the approved message for delivery to Maya Chen.",
    time: "Queued",
    status: "Ready",
    icon: Mail,
  },
];

type ExecutionStatus = "ready" | "sending" | "sent";

export default function ExecutionPage() {
  const [approvedMessage, setApprovedMessage] = useState(() => {
    if (typeof window === "undefined") {
      return "Hi Maya, I noticed Acme has been expanding its GTM team and investing more in revenue operations. I thought it might be useful to share how Fuse could help your team automate account research and outreach workflows.";
    }

    return (
      sessionStorage.getItem("fuse-approved-message") ??
      "Hi Maya, I noticed Acme has been expanding its GTM team and investing more in revenue operations. I thought it might be useful to share how Fuse could help your team automate account research and outreach workflows."
    );
  });

  const [executionStatus, setExecutionStatus] =
    useState<ExecutionStatus>("ready");

  const executeOutreach = () => {
    if (executionStatus !== "ready") return;

    sessionStorage.setItem("fuse-execution-status", "executing");

    setExecutionStatus("sending");

    setTimeout(() => {
        
      setExecutionStatus("sent");
      sessionStorage.setItem("fuse-execution-status", "sent");
        }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/accounts/acme/review"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-sm text-slate-500">Acme Corp</p>
              <h1 className="text-xl font-semibold">Execution timeline</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 md:flex">
            <CheckCircle2 size={16} />
            Action approved
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <section className="mb-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm md:p-7">
            <div className="mb-5 flex items-center gap-2 text-indigo-300">
              <Bot size={18} />
              <span className="text-sm font-medium">Agent execution</span>
            </div>

            <h2 className="max-w-2xl text-2xl font-semibold leading-tight md:text-3xl">
              Outreach to Maya Chen is ready for execution.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              Fuse coordinated research, enrichment, strategy, and human
              approval before handing the task to the Outreach Agent.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat label="Agents involved" value="4" />
              <Stat label="Human gates" value="1" />
              <Stat
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Execution summary</p>
            <h2 className="mt-1 text-xl font-semibold">Approved outreach</h2>

            <div className="mt-6 space-y-4">
              <InfoRow label="Target" value="Maya Chen" />
              <InfoRow label="Role" value="VP of Sales" />
              <InfoRow label="Account" value="Acme Corp" />
              <InfoRow label="Opportunity" value="$85K ARR" />
              <InfoRow label="Confidence" value="91%" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-7">
              <p className="text-sm text-slate-500">Multi-agent workflow</p>
              <h2 className="text-xl font-semibold">Execution chain</h2>
            </div>

            <div className="relative">
              <div className="absolute bottom-6 left-5 top-6 w-px bg-slate-200" />

              <div className="space-y-2">
                {timeline.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="relative flex gap-4 rounded-2xl p-4"
                    >
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 p-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                            <StatusBadge status={item.status} />
                            <span className="text-xs text-slate-400">
                              {item.title === "Outreach Agent" &&
                              executionStatus === "sent"
                                ? "Just now"
                                : item.title === "Outreach Agent" &&
                                    executionStatus === "sending"
                                  ? "In progress"
                                  : item.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-semibold">Outreach Agent</p>
                  <p className="text-sm text-slate-500">
                    {executionStatus === "sent"
                      ? "Execution completed"
                      : executionStatus === "sending"
                        ? "Executing approved action..."
                        : "Waiting for execution"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Approved message
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Hi Maya, I noticed Acme has been expanding its GTM team,
                  particularly across Sales and Revenue Operations...
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

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {approvedMessage}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-700">
                        <Clock3 size={14} />
                        Sent just now
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-700">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="font-semibold text-indigo-950">
                    Full audit trail
                  </p>

                  <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                    Every agent step, signal, decision, and human approval is
                    recorded before an external action is executed.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to dealroom
            </Link>
          </aside>
        </section>
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
      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Ready"
        ? "bg-indigo-50 text-indigo-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
