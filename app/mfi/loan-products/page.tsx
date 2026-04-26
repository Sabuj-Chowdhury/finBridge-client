"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Landmark,
  Loader2,
  ArrowLeft,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  BadgePercent,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface LoanProductForm {
  name: string;
  max_amount: string;
  interest_rate: string;
  duration_months: string;
  description: string;
  processing_fee: string;
}

const initialForm: LoanProductForm = {
  name: "",
  max_amount: "",
  interest_rate: "",
  duration_months: "",
  description: "",
  processing_fee: "",
};

interface FieldProps {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, required, icon, children, hint }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary shrink-0">
          {icon}
        </span>
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground pl-8">{hint}</p>}
    </div>
  );
}

export default function CreateLoanProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoanProductForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    if (!form.name.trim()) {
      toast.error("Product name is required.");
      return false;
    }
    if (!form.max_amount || Number(form.max_amount) <= 0) {
      toast.error("Please enter a valid maximum loan amount.");
      return false;
    }
    if (!form.interest_rate || Number(form.interest_rate) < 0) {
      toast.error("Please enter a valid interest rate.");
      return false;
    }
    if (!form.duration_months || Number(form.duration_months) < 1) {
      toast.error("Duration must be at least 1 month.");
      return false;
    }
    if (!form.description.trim()) {
      toast.error("Please provide a description for the loan product.");
      return false;
    }
    if (!form.processing_fee || Number(form.processing_fee) < 0) {
      toast.error("Please enter a valid processing fee.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.post("/mfi/loan-products", {
        name: form.name.trim(),
        max_amount: Number(form.max_amount),
        interest_rate: Number(form.interest_rate),
        duration_months: Number(form.duration_months),
        description: form.description.trim(),
        processing_fee: parseFloat(form.processing_fee),
      });
      toast.success("Loan product created successfully!");
      setTimeout(() => router.push("/mfi"), 1500);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to create loan product. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="space-y-8 pb-10">

      {/* ── Page Header ── */}
      <div>
        <Link
          href="/mfi"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-5 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-[2rem] overflow-hidden bg-primary p-8 md:p-10 text-primary-foreground shadow-xl shadow-primary/20">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={12} />
                MFI Admin
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Create Loan Product
              </h1>
              <p className="text-primary-foreground/70 text-sm max-w-md leading-relaxed">
                Define a structured loan offering that entrepreneurs across the platform can discover and apply for.
              </p>
            </div>

            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Landmark size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="max-w-2xl mx-auto">
        <div className="rounded-[2rem] border border-border bg-card shadow-sm overflow-hidden">

          {/* Card top accent strip */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary/40" />

          <div className="p-8 space-y-8">

            {/* Section: Basic Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Basic Information</p>
                  <p className="text-xs text-muted-foreground">Name and description of the loan product</p>
                </div>
              </div>

              <Field label="Product Name" required icon={<FileText size={13} />}>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Small Business Loan"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
                  className={inputClass}
                />
              </Field>

              <Field label="Description" required icon={<FileText size={13} />} hint="Describe purpose, eligibility criteria, and key benefits.">
                <textarea
                  name="description"
                  rows={4}
                  placeholder="This loan product is designed for small business owners seeking capital to expand operations, purchase inventory, or manage working capital needs..."
                  value={form.description}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/50 text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </Field>
            </div>

            {/* Section: Financial Terms */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <DollarSign size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Financial Terms</p>
                  <p className="text-xs text-muted-foreground">Amount limits, rate, and repayment period</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Max Amount (৳)" required icon={<DollarSign size={13} />} hint="Maximum disbursable amount">
                  <input
                    type="number"
                    name="max_amount"
                    min="1"
                    placeholder="50000"
                    value={form.max_amount}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputClass}
                  />
                </Field>

                <Field label="Interest Rate (%)" required icon={<Percent size={13} />} hint="Annual percentage rate">
                  <input
                    type="number"
                    name="interest_rate"
                    min="0"
                    step="0.01"
                    placeholder="12"
                    value={form.interest_rate}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputClass}
                  />
                </Field>

                <Field label="Duration (Months)" required icon={<Calendar size={13} />} hint="Repayment period in months">
                  <input
                    type="number"
                    name="duration_months"
                    min="1"
                    placeholder="6"
                    value={form.duration_months}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputClass}
                  />
                </Field>

                <Field label="Processing Fee" required icon={<BadgePercent size={13} />} hint="One-time fee charged on disbursal">
                  <input
                    type="number"
                    name="processing_fee"
                    min="0"
                    step="0.01"
                    placeholder="250.00"
                    value={form.processing_fee}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Submit area */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:flex-1 h-12 rounded-xl font-semibold shadow-lg shadow-primary/20 gap-2"
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Product…
                  </>
                ) : (
                  <>
                    <Landmark size={18} />
                    Create Loan Product
                  </>
                )}
              </Button>
              <Link href="/mfi" className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full h-12 rounded-xl font-semibold"
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Helper note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Fields marked with <span className="text-destructive font-bold">*</span> are required. All values can be edited after creation.
        </p>
      </div>
    </div>
  );
}
