"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Landmark, AlertCircle, CreditCard } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Administration</h1>
          <p className="text-muted-foreground">Global overview and verification management.</p>
        </div>
        <Link href="/admin/subscription-plans">
          <Button className="gap-2 rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
            <CreditCard size={20} />
            Subscription Plans
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "32,450", icon: Users, color: "text-primary" },
          { title: "Verified MFIs", value: "42", icon: Landmark, color: "text-secondary" },
          { title: "Pending Verifications", value: "3", icon: ShieldCheck, color: "text-green-600" },
          { title: "Reported Issues", value: "12", icon: AlertCircle, color: "text-destructive" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon size={18} className={stat.color} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2rem] border-none shadow-sm p-6">
          <CardHeader className="flex flex-row items-center justify-between px-0 pt-0 mb-6">
            <CardTitle>MFI Verification Requests</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 border-l-4 border-primary">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border">
                    <Landmark />
                  </div>
                  <div>
                    <p className="font-bold">Trust Microfinance Ltd.</p>
                    <p className="text-xs text-muted-foreground">Submitted: 2 hours ago • Reg ID: #MFI-8829</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Review Docs</Button>
                  <Button size="sm">Verify</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-sm p-6">
          <CardHeader className="px-0 pt-0 mb-6">
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Uptime</span>
                <span className="font-bold text-green-600">99.98%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-full w-[99.9%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verification Queue</span>
                <span className="font-bold text-primary">Normal</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-full w-[30%]" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-widest">Recent Logs</h4>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground italic">10:45 AM - User #992 registered (Entrepreneur)</p>
                <p className="text-xs text-muted-foreground italic">10:42 AM - Backup completed successfully</p>
                <p className="text-xs text-muted-foreground italic">10:30 AM - New MFI application received</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
