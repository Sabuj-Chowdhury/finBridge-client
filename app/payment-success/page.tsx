"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Download, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

type ConfirmState = "confirming" | "confirmed" | "failed";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [confirmState, setConfirmState] = useState<ConfirmState>("confirming");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // SSL Commerz sends transactionId as query param
  const transactionId =
    searchParams.get("transactionId") ??
    searchParams.get("tran_id") ??
    searchParams.get("transaction_id");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency") ?? "BDT";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fire confirmation call once mounted and transactionId is available
  useEffect(() => {
    if (!isMounted) return;

    if (!transactionId) {
      setErrorMsg("No transaction ID found in the URL. Please contact support.");
      setConfirmState("failed");
      return;
    }

    const confirm = async () => {
      try {
        await api.post("/payment/confirm", {
          transaction_id: transactionId,
        });
        setConfirmState("confirmed");
      } catch (err: unknown) {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ??
          "Payment confirmation failed. Your payment may still have been processed — please contact support.";
        setErrorMsg(msg);
        setConfirmState("failed");
      }
    };

    confirm();
  }, [isMounted, transactionId]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-emerald-50/30 to-background px-4 py-20">
      {/* Background blobs */}
      <div className="pointer-events-none fixed top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px] -mr-24 -mt-24" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-64 h-64 bg-emerald-300/10 rounded-full blur-[100px] -ml-20 -mb-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-card rounded-[2rem] shadow-2xl overflow-hidden border border-emerald-100">
          {/* Top accent — colour shifts per state */}
          <div
            className={`h-2 w-full transition-all duration-700 ${
              confirmState === "confirmed"
                ? "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"
                : confirmState === "failed"
                ? "bg-gradient-to-r from-red-400 via-red-500 to-red-400"
                : "bg-gradient-to-r from-primary/60 via-primary to-primary/60 animate-pulse"
            }`}
          />

          <div className="p-10 flex flex-col items-center text-center gap-8">
            <AnimatePresence mode="wait">

              {/* ── CONFIRMING ─────────────────────────────────────── */}
              {confirmState === "confirming" && (
                <motion.div
                  key="confirming"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center">
                    <Loader2 size={40} className="text-primary animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold tracking-tight">Confirming Payment…</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Please wait while we verify your transaction with the payment gateway.
                      <br />
                      <span className="font-medium">Do not close this page.</span>
                    </p>
                  </div>
                  {transactionId && (
                    <div className="w-full bg-muted/40 rounded-2xl p-4 text-left">
                      <p className="text-xs text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-xs font-semibold mt-0.5 break-all">{transactionId}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── CONFIRMED ──────────────────────────────────────── */}
              {confirmState === "confirmed" && (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center gap-8 w-full"
                >
                  {/* Success icon */}
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={44} className="text-emerald-500" />
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight">Payment Confirmed!</h1>
                    <p className="text-muted-foreground leading-relaxed">
                      Your subscription is now active. Welcome to finBridge Premium.
                    </p>
                  </div>

                  {/* Transaction details */}
                  {(transactionId || amount) && (
                    <div className="w-full bg-muted/40 rounded-2xl p-5 space-y-3 text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Transaction Details
                      </p>
                      {transactionId && (
                        <div className="flex justify-between text-sm gap-4">
                          <span className="text-muted-foreground shrink-0">Transaction ID</span>
                          <span className="font-mono font-semibold text-xs break-all text-right">
                            {transactionId}
                          </span>
                        </div>
                      )}
                      {amount && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Amount Paid</span>
                          <span className="font-bold text-emerald-600">
                            {currency} {amount}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-bold text-emerald-600 uppercase text-xs tracking-wider">
                          Confirmed ✓
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-3 w-full">
                    <Link href="/" className="w-full">
                      <Button className="gap-2 rounded-xl h-12 shadow-lg shadow-primary/20 w-full">
                        Go to Home
                        <ArrowRight size={18} />
                      </Button>
                    </Link>
                    <Button variant="outline" className="gap-2 rounded-xl h-12 w-full" disabled>
                      <Download size={18} />
                      Download Receipt
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ── FAILED ─────────────────────────────────────────── */}
              {confirmState === "failed" && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-8 w-full"
                >
                  <div className="w-24 h-24 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center">
                    <XCircle size={44} className="text-red-500" />
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold tracking-tight">Confirmation Failed</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {errorMsg}
                    </p>
                  </div>

                  {transactionId && (
                    <div className="w-full bg-muted/40 rounded-2xl p-4 text-left">
                      <p className="text-xs text-muted-foreground">Transaction ID (save this)</p>
                      <p className="font-mono text-xs font-semibold mt-0.5 break-all">{transactionId}</p>
                    </div>
                  )}

                  <div className="w-full p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left">
                    <p className="text-sm font-semibold text-amber-800 mb-1">Important</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      If your bank statement shows a deduction, your payment was likely processed.
                      Save your Transaction ID above and contact our support team — we&apos;ll resolve this quickly.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <Button
                      className="gap-2 rounded-xl h-12 shadow-lg shadow-primary/20 w-full"
                      onClick={() => {
                        setConfirmState("confirming");
                        setErrorMsg(null);
                        if (transactionId) {
                          api
                            .post("/payment/confirm", { transaction_id: transactionId })
                            .then(() => setConfirmState("confirmed"))
                            .catch((err: unknown) => {
                              setErrorMsg(
                                (err as { response?: { data?: { message?: string } } })
                                  ?.response?.data?.message ??
                                  "Confirmation failed again. Please contact support."
                              );
                              setConfirmState("failed");
                            });
                        }
                      }}
                    >
                      <RefreshCw size={18} />
                      Retry Confirmation
                    </Button>
                    <Link href="/contact" className="w-full">
                      <Button variant="outline" className="gap-2 rounded-xl h-12 w-full">
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
