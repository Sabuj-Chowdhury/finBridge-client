"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ReceiptText, Loader2, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface Payment {
  id: string;
  amount: number;
  status: "success" | "pending" | "failed";
  created_at: string;
  mfi_name: string;
  plan_name: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/admin/payments");
        const data = res.data?.data || [];
        setPayments(data);
      } catch (err) {
        console.error("Failed to fetch admin payments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const successfulPayments = payments.filter(p => p.status === "success");
  const pendingPayments = payments.filter(p => p.status === "pending");
  const failedPayments = payments.filter(p => p.status === "failed");
  const totalRevenue = successfulPayments.reduce((acc, curr) => acc + curr.amount, 0);

  // Status Distribution Chart Data
  const pieData = [
    { name: "Success", value: successfulPayments.length, color: "#10b981" },
    { name: "Pending", value: pendingPayments.length, color: "#f59e0b" },
    { name: "Failed", value: failedPayments.length, color: "#ef4444" },
  ].filter(d => d.value > 0);

  // Spend Over Time Chart Data
  const areaData = [...payments].reverse().map(p => ({
    name: new Date(p.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
    amount: p.status === "success" ? p.amount : 0,
  }));

  return (
    <div className="space-y-8 pb-10">
      <div className="relative rounded-[2rem] overflow-hidden bg-primary p-8 md:p-10 text-primary-foreground shadow-xl shadow-primary/20">
        <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider">
              <CreditCard size={12} /> Platform Revenue
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Global Payments</h1>
            <p className="text-primary-foreground/70 text-sm max-w-md leading-relaxed">
              Monitor incoming subscription payments and revenue streams from all MFIs across the platform.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm shrink-0">
            <p className="text-sm text-primary-foreground/70 mb-1">Total Generated Revenue</p>
            <p className="text-3xl font-extrabold">৳ {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={36} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading payment data…</p>
        </div>
      ) : payments.length === 0 ? (
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="py-20 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ReceiptText size={28} className="text-muted-foreground" />
            </div>
            <p className="font-bold">No Payments Found</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              No MFIs have successfully processed a subscription payment yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Transaction Health</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Revenue Timeline</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAmountAdmin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(val) => `৳${val}`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                      formatter={(value: any) => [`৳${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmountAdmin)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card className="rounded-[2rem] border-none shadow-sm p-6">
            <CardHeader className="px-0 pt-0 mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-extrabold tracking-tight">Global Transaction Ledger</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="pb-4 font-bold pl-4">Transaction ID</th>
                      <th className="pb-4 font-bold">Institution</th>
                      <th className="pb-4 font-bold">Date</th>
                      <th className="pb-4 font-bold">Plan</th>
                      <th className="pb-4 font-bold">Amount</th>
                      <th className="pb-4 font-bold text-right pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {payments.map((payment, i) => (
                      <motion.tr 
                        key={payment.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 pl-4">
                          <p className="font-mono text-xs font-bold text-foreground">{payment.id.toUpperCase()}</p>
                        </td>
                        <td className="py-4">
                          <p className="font-bold text-sm">{payment.mfi_name}</p>
                        </td>
                        <td className="py-4">
                          <p className="text-sm font-medium">{new Date(payment.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(payment.created_at).toLocaleTimeString()}</p>
                        </td>
                        <td className="py-4">
                          <span className="inline-flex px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            {payment.plan_name}
                          </span>
                        </td>
                        <td className="py-4 text-sm font-extrabold whitespace-nowrap text-primary">
                          ৳ {payment.amount.toLocaleString()}
                        </td>
                        <td className="py-4 text-right pr-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ml-auto",
                            payment.status === "success" ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
                            payment.status === "failed" ? "text-destructive bg-destructive/10 border-destructive/20" :
                            "text-amber-600 bg-amber-50 border-amber-200"
                          )}>
                            {payment.status === "success" && <CheckCircle2 size={12} />}
                            {payment.status === "failed" && <XCircle size={12} />}
                            {payment.status === "pending" && <Clock size={12} />}
                            {payment.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
