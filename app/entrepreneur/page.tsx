"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, CheckCircle, Search } from "lucide-react";
import Link from "next/link";

export default function EntrepreneurOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Welcome back to your business dashboard.</p>
        </div>
        <Link href="/entrepreneur/loans">
          <Button className="gap-2 rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
            <PlusCircle size={20} />
            Apply for New Loan
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Active Applications", value: "2", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Approved Loans", value: "1", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { title: "Matched Products", value: "12", icon: Search, color: "text-primary", bg: "bg-primary/5" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="rounded-[2rem] border-none shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border">
                    <Clock className="text-muted-foreground" size={18} />
                  </div>
                  <div>
                    <p className="font-bold">Small Business Expansion</p>
                    <p className="text-xs text-muted-foreground">Applied on Oct {10 + i}, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">৳ 50,000</p>
                  <p className="text-[10px] uppercase font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">Pending</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-primary font-bold">View All Applications</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-sm p-6 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-white">Loan Discovery</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <p className="text-primary-foreground/80 leading-relaxed">
              We found 5 new loan products that match your business profile and NID verification status.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
              <p className="text-xs uppercase font-bold text-white/60 mb-1">Top Match</p>
              <p className="text-xl font-bold">BRAC Microfinance</p>
              <p className="text-sm">9.5% APR • 12 Months</p>
            </div>
            <Button className="w-full h-12 bg-white text-primary hover:bg-white/90 font-bold rounded-xl">
              Explore Matches
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
