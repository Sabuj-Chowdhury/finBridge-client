"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, FileText, Landmark, UserCheck, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function MFIDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MFI Management</h1>
          <p className="text-muted-foreground">Monitor your loan products and application pipeline.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/mfi/loan-products">
            <Button className="gap-2 rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
              <Landmark size={20} />
              Manage Loan Products
            </Button>
          </Link>
          <Link href="/mfi/applications">
            <Button variant="outline" className="gap-2 rounded-xl h-12 px-6">
              <ClipboardList size={20} />
              View Applications
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Applicants", value: "1,240", icon: UserCheck, color: "text-primary" },
          { title: "Pending Review", value: "48", icon: FileText, color: "text-blue-600" },
          { title: "Active Products", value: "6", icon: Landmark, color: "text-secondary" },
          { title: "Disbursal Rate", value: "+12.5%", icon: TrendingUp, color: "text-green-600" },
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

      <Card className="rounded-[2rem] border-none shadow-sm p-6">
        <CardHeader className="flex flex-row items-center justify-between px-0 pt-0 mb-6">
          <CardTitle>Recent Applications Pipeline</CardTitle>
          <Button variant="outline" size="sm">View Full Pipeline</Button>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-muted-foreground text-sm">
                  <th className="pb-4 font-bold">Applicant</th>
                  <th className="pb-4 font-bold">Product</th>
                  <th className="pb-4 font-bold">Amount</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold">KB</div>
                        <div>
                          <p className="font-bold text-sm">Kamrul Bin Hasan</p>
                          <p className="text-[10px] text-muted-foreground">ID: #APP-239{i}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">Small Biz Expansion</td>
                    <td className="py-4 text-sm font-bold text-primary">৳ 120,000</td>
                    <td className="py-4">
                      <span className="text-[10px] uppercase font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">Under Review</span>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-primary hover:bg-primary/5">Review</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
