"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  User,
  Banknote,
  Calendar,
  Package,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  applicant_name: string;
  product_name: string;
  amount: string;
  duration_months: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

type Tab = "pending" | "approved";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "text-amber-600 bg-amber-50 border-amber-200",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    className: "text-emerald-600 bg-emerald-50 border-emerald-200",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    className: "text-destructive bg-destructive/5 border-destructive/20",
    icon: XCircle,
  },
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString("en-BD");
}

// ── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mb-6",
          tab === "pending" ? "bg-amber-50" : "bg-emerald-50"
        )}
      >
        {tab === "pending" ? (
          <Clock size={36} className="text-amber-400" />
        ) : (
          <CheckCircle2 size={36} className="text-emerald-400" />
        )}
      </div>
      <h3 className="text-lg font-bold mb-2">
        {tab === "pending"
          ? "No Pending Applications"
          : "No Approved Applications"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        {tab === "pending"
          ? "All caught up! There are no applications waiting for your review right now."
          : "No applications have been approved yet. Reviewed applications will appear here."}
      </p>
    </div>
  );
}

// ── Application Row Card ─────────────────────────────────────────────────────
function ApplicationCard({ app }: { app: Application }) {
  const status = STATUS_CONFIG[app.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
      {/* Left: Avatar + Name + Meta */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
          {initials(app.applicant_name)}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{app.applicant_name}</p>
          <p className="text-[11px] text-muted-foreground font-mono truncate">
            #{app.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Middle: Details grid */}
      <div className="flex flex-wrap gap-x-6 gap-y-1.5 sm:flex-1 sm:justify-center px-0 sm:px-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Package size={13} className="text-primary/60 shrink-0" />
          <span className="font-medium text-foreground">{app.product_name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Banknote size={13} className="text-primary/60 shrink-0" />
          <span className="font-semibold text-primary">৳ {formatAmount(app.amount)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={13} className="shrink-0" />
          <span>{app.duration_months} month{app.duration_months !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <User size={13} className="shrink-0" />
          <span>{formatDate(app.created_at)}</span>
        </div>
      </div>

      {/* Right: Status badge */}
      <div className="shrink-0">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border",
            status.className
          )}
        >
          <StatusIcon size={12} />
          {status.label}
        </span>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function MFIApplicationsPage() {
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("pending");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await api.get("/mfi/applications");
        setAllApplications(res.data?.data ?? []);
      } catch (err: unknown) {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "Failed to load applications.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const pending = allApplications.filter((a) => a.status === "pending");
  const approved = allApplications.filter((a) => a.status === "approved");

  const displayed = activeTab === "pending" ? pending : approved;

  const tabs: { key: Tab; label: string; count: number; icon: React.ElementType; activeColor: string }[] = [
    {
      key: "pending",
      label: "Pending Review",
      count: pending.length,
      icon: Clock,
      activeColor: "text-amber-600 bg-amber-50 border-amber-300",
    },
    {
      key: "approved",
      label: "Approved",
      count: approved.length,
      icon: CheckCircle2,
      activeColor: "text-emerald-600 bg-emerald-50 border-emerald-300",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div>
        <Link
          href="/mfi"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-5 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Dashboard
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-[2rem] overflow-hidden bg-primary p-8 md:p-10 text-primary-foreground shadow-xl shadow-primary/20">
          <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <ClipboardList size={12} />
                MFI Admin
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Loan Applications
              </h1>
              <p className="text-primary-foreground/70 text-sm max-w-md leading-relaxed">
                Review and manage all incoming loan applications from
                entrepreneurs across the platform.
              </p>
            </div>

            {/* Summary pills */}
            <div className="flex gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-center backdrop-blur-sm min-w-[72px]">
                <p className="text-2xl font-extrabold">{pending.length}</p>
                <p className="text-[11px] text-primary-foreground/60 uppercase tracking-wider mt-0.5">
                  Pending
                </p>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-center backdrop-blur-sm min-w-[72px]">
                <p className="text-2xl font-extrabold">{approved.length}</p>
                <p className="text-[11px] text-primary-foreground/60 uppercase tracking-wider mt-0.5">
                  Approved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs + List ── */}
      <div className="space-y-5">
        {/* Tab switcher */}
        <div className="flex gap-2 p-1.5 bg-muted rounded-2xl w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={16} />
                {tab.label}
                <span
                  className={cn(
                    "inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold border transition-colors",
                    isActive ? tab.activeColor : "bg-muted-foreground/10 border-transparent text-muted-foreground"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 size={36} className="animate-spin text-primary" />
                <p className="text-sm text-muted-foreground font-medium">
                  Loading applications…
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle size={28} className="text-destructive" />
                </div>
                <p className="font-bold text-sm">Something went wrong</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {error}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 rounded-xl"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : displayed.length === 0 ? (
              <EmptyState tab={activeTab} />
            ) : (
              <div className="space-y-3">
                {displayed.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
