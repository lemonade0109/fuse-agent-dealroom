"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleX,
  Clock3,
  PencilLine,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DecisionState = "pending" | "approved" | "rejected";

type AIRecommendation = {
  recommendation: string;
  reasoning: string;
  confidence: number;
  message: string;
};

const fallbackMessage =
  "Hi Maya, I noticed Acme has been expanding its GTM team and investing more in revenue operations. I thought it might be useful to share how Fuse could help your team automate account research and outreach workflows.";

const evidence = [
  {
    title: "Hiring acceleration",
    description: "12 GTM roles opened this month",
    confidence: "94%",
    source: "Careers page",
    icon: Users,
  },
  {
    title: "Revenue operations expansion",
    description: "Multiple revenue-ops signals detected",
    confidence: "88%",
    source: "Company updates",
    icon: Search,
  },
  {
    title: "Likely economic buyer identified",
    description: "Maya Chen, VP Sales",
    confidence: "92%",
    source: "Enrichment data",
    icon: Target,
  },
];

function loadStoredRecommendation(): AIRecommendation | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem("fuse-recommendation");

  if (!stored) return null;

  try {
    return JSON.parse(stored) as AIRecommendation;
  } catch (error) {
    console.error("Could not load AI recommendation:", error);
    return null;
  }
}

export default function ReviewPage() {
  const [decision, setDecision] = useState<DecisionState>("pending");
  const [isEditing, setIsEditing] = useState(false);
  const [aiRecommendation, setAiRecommendation] =
    useState<AIRecommendation | null>(loadStoredRecommendation);
  const [message, setMessage] = useState(
    () => loadStoredRecommendation()?.message ?? fallbackMessage,
  );
  const [savedMessage, setSavedMessage] = useState(
    () => loadStoredRecommendation()?.message ?? fallbackMessage,
  );
  const editSectionRef = useRef<HTMLDivElement | null>(null);

  const startEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      editSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const saveEdit = () => {
    setSavedMessage(message);
    setIsEditing(false);
    sessionStorage.setItem("fuse-approved-message", message);
  };

  const cancelEdit = () => {
    setMessage(savedMessage);
    setIsEditing(false);
  };

  const approve = () => {
    setDecision("approved");
    sessionStorage.setItem("fuse-approved-message", savedMessage);
    sessionStorage.setItem("fuse-execution-status", "approved");
  };

  const reject = () => {
    setDecision("rejected");
    sessionStorage.setItem("fuse-execution-status", "rejected");
  };

  const reconsider = () => {
    setDecision("pending");
    sessionStorage.removeItem("fuse-execution-status");
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-5 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to dealroom
            </Link>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Acme Corp
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">
              Review agent action
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
            <ShieldCheck size={17} />
            Human approval required
          </div>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 md:p-7">
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                <Sparkles size={17} />
                Strategy Agent recommendation
              </div>

              <h2 className="mt-5 text-2xl font-semibold leading-tight">
                {aiRecommendation?.recommendation ??
                  "Reach out to Maya Chen with a tailored expansion message."}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                {aiRecommendation?.reasoning ??
                  "The agent believes Acme Corp is entering a strong buying window based on hiring activity, revenue-operations expansion, and the identification of a likely decision maker."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <DarkStat
                  label="Confidence"
                  value={
                    aiRecommendation ? `${aiRecommendation.confidence}%` : "91%"
                  }
                />
                <DarkStat label="Signals used" value="3" />
                <DarkStat label="Recommended timing" value="Today" />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Supporting evidence
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-950">
                Why the agent recommended this
              </h3>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {evidence.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <item.icon size={18} />
                    </div>
                    <p className="mt-4 font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="font-semibold text-indigo-600">
                        {item.confidence}
                      </span>
                      <span className="text-slate-400">{item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              ref={editSectionRef}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Proposed execution
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-950">
                    Outreach message
                  </h3>
                </div>

                {!isEditing && (
                  <button
                    onClick={startEditing}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <PencilLine size={15} />
                    Edit message
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="mt-5">
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-indigo-300 bg-indigo-50/30 p-4 text-sm leading-7 text-slate-700 outline-none ring-indigo-100 transition focus:ring-4"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={saveEdit}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <Check size={15} />
                      Save edit
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm leading-7 text-slate-600">
                    {savedMessage}
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Strategy Agent
              </p>
              <div className="mt-4 space-y-4">
                <InfoRow label="Goal" value="Create qualified outreach" />
                <InfoRow label="Target" value="Maya Chen, VP Sales" />
                <InfoRow label="Account" value="Acme Corp" />
                <InfoRow label="Opportunity" value="$85K ARR" />
              </div>
            </section>

            <section className="rounded-[28px] border border-indigo-100 bg-indigo-50 p-5">
              <p className="font-semibold text-indigo-950">
                Why human approval?
              </p>
              <p className="mt-2 text-sm leading-6 text-indigo-900/70">
                The agent can gather evidence and prepare an action, but a human
                controls whether customer-facing outreach is actually executed.
              </p>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              {decision === "pending" && (
                <>
                  <p className="font-semibold text-slate-950">Decision</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Review the evidence and message before releasing the action.
                  </p>

                  <button
                    onClick={approve}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    <CheckCircle2 size={17} />
                    Approve action
                  </button>

                  <button
                    onClick={startEditing}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <PencilLine size={17} />
                    Edit first
                  </button>

                  <button
                    onClick={reject}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    <CircleX size={17} />
                    Reject recommendation
                  </button>
                </>
              )}

              {decision === "approved" && (
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 size={22} />
                  </div>
                  <p className="mt-4 font-semibold text-slate-950">
                    Action approved
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Added to execution queue. The Outreach Agent is ready to
                    execute the approved message.
                  </p>

                  <Link
                    href="/accounts/acme/execution"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white"
                  >
                    View execution
                  </Link>

                  <button
                    onClick={reconsider}
                    className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
                  >
                    Undo approval
                  </button>
                </div>
              )}

              {decision === "rejected" && (
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
                    <CircleX size={22} />
                  </div>
                  <p className="mt-4 font-semibold text-slate-950">
                    Recommendation rejected
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    No action will be executed. The decision remains visible in
                    the audit trail.
                  </p>
                  <button
                    onClick={reconsider}
                    className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700"
                  >
                    Reconsider recommendation
                  </button>
                </div>
              )}
            </section>

            <div className="flex items-center gap-2 px-1 text-xs text-slate-400">
              <Clock3 size={14} />
              Decision captured in the audit trail
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DarkStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
