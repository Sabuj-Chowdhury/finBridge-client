"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface Plan {
  id: string;
  name: string;
  price_bdt: number;
}

const PLAN_META: Record<string, { badge?: string; features: string[]; highlight: boolean }> = {
  trial: {
    features: [
      "Access to all loan listings",
      "1 active loan application",
      "Basic profile page",
      "Email support",
    ],
    highlight: false,
  },
  pro: {
    badge: "Most Popular",
    features: [
      "Everything in Trial",
      "Unlimited loan applications",
      "Priority matching with MFIs",
      "Advanced analytics dashboard",
      "Dedicated account support",
    ],
    highlight: true,
  },
};

function planLabel(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");
}

function getPlanMeta(name: string) {
  return PLAN_META[name.toLowerCase()] ?? {
    features: ["Full platform access", "Priority support"],
    highlight: false,
  };
}

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/subscription-plans")
      .then((res) => setPlans(res.data?.data ?? []))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="plans" className="py-24 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Sparkles size={16} />
            Subscription Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your journey. Start for free, upgrade when you&apos;re ready.
          </p>
        </motion.div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={36} className="animate-spin text-primary" />
          </div>
        ) : plans.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No plans available at the moment.</p>
        ) : (
          <div className={cn(
            "grid gap-8 mx-auto",
            plans.length === 1 ? "max-w-sm" : plans.length === 2 ? "md:grid-cols-2 max-w-3xl" : "md:grid-cols-3 max-w-5xl"
          )}>
            {plans.map((plan, i) => {
              const meta = getPlanMeta(plan.name);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn(
                    "relative rounded-[2rem] p-8 flex flex-col gap-8 border transition-all duration-300",
                    meta.highlight
                      ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/30 scale-[1.02]"
                      : "bg-background border-border shadow-sm hover:shadow-md hover:border-primary/30"
                  )}
                >
                  {/* Popular badge */}
                  {meta.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-lg">
                        <Zap size={12} />
                        {meta.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan name & price */}
                  <div className="space-y-3">
                    <p className={cn(
                      "text-xs font-bold uppercase tracking-widest",
                      meta.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                    )}>
                      {planLabel(plan.name)}
                    </p>
                    <div className="flex items-end gap-1">
                      {plan.price_bdt === 0 ? (
                        <span className="text-5xl font-extrabold">Free</span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold mt-2">৳</span>
                          <span className="text-5xl font-extrabold">{plan.price_bdt.toLocaleString()}</span>
                          <span className={cn(
                            "text-sm mb-2",
                            meta.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                          )}>/mo</span>
                        </>
                      )}
                    </div>
                    {plan.price_bdt === 0 && (
                      <p className={cn("text-sm", meta.highlight ? "text-primary-foreground/60" : "text-muted-foreground")}>
                        No credit card required
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className={cn("border-t", meta.highlight ? "border-primary-foreground/20" : "border-border")} />

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {meta.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <CheckCircle2
                          size={17}
                          className={cn(
                            "mt-0.5 shrink-0",
                            meta.highlight ? "text-primary-foreground/80" : "text-primary"
                          )}
                        />
                        <span className={meta.highlight ? "text-primary-foreground/90" : ""}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — wired up later */}
                  <Button
                    size="lg"
                    className={cn(
                      "w-full h-12 rounded-xl font-semibold",
                      meta.highlight
                        ? "bg-white text-primary hover:bg-white/90"
                        : "shadow-lg shadow-primary/20"
                    )}
                    disabled
                    aria-label={`Get ${planLabel(plan.name)} plan`}
                  >
                    {plan.price_bdt === 0 ? "Get Started Free" : `Get ${planLabel(plan.name)}`}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
