"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  const { isAuthenticated, user } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -mr-24 -mt-24 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Zap size={16} />
            <span>Fast-tracking Microfinance in Bangladesh</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Get Microfinance Loans <br />
            <span className="text-primary italic">Easily</span> Across <br />
            Bangladesh
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            finBridge connects ambitious entrepreneurs with verified Microfinance Institutions. 
            Apply, track, and secure your business growth with zero hassle.
          </p>

          {!isMounted ? (
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-14 w-48 bg-muted animate-pulse rounded-lg"></div>
              <div className="h-14 w-48 bg-muted animate-pulse rounded-lg"></div>
            </div>
          ) : isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={user?.role?.toLowerCase().includes("mfi") ? "/mfi" : user?.role?.toLowerCase().includes("admin") ? "/admin" : "/entrepreneur"}
                className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg gap-2 group w-full sm:w-auto")}
              >
                Go to Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/register/entrepreneur" 
                className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg gap-2 group w-full sm:w-auto")}
              >
                Register as Entrepreneur
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/register/mfi" 
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-14 px-8 text-lg w-full sm:w-auto")}
              >
                Register as MFI Institution
              </Link>
            </div>
          )}

          <div className="flex items-center gap-6 pt-8 border-t">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-muted overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-lg">10,000+ Users</p>
              <p className="text-sm text-muted-foreground">Already joined our platform</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Loan Application</p>
                <h3 className="text-2xl font-bold">Small Business Growth</h3>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck />
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-muted/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Requested Amount</span>
                  <span className="font-bold text-primary">৳ 50,000</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="bg-primary h-full" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                  <p className="font-bold">9% APR</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-bold">12 Months</p>
                </div>
              </div>

              <Button className="w-full h-12 rounded-xl" disabled>
                Analyzing Documents...
              </Button>
            </div>
          </div>
          
          {/* Decorative cards */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
