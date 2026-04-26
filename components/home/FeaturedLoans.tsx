"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Info, Landmark } from "lucide-react";

const loans = [
  {
    institution: "Grameen Bank",
    title: "Small Business Loan",
    amount: "৳ 20,000 - ৳ 100,000",
    rate: "9% APR",
    tenure: "12 - 24 Months",
    tags: ["SME", "Low Interest"],
  },
  {
    institution: "BRAC Microfinance",
    title: "Agro-Business Fund",
    amount: "৳ 50,000 - ৳ 500,000",
    rate: "10% APR",
    tenure: "24 - 36 Months",
    tags: ["Agriculture", "Large Scale"],
  },
  {
    institution: "ASA Bangladesh",
    title: "Women Entrepreneur Loan",
    amount: "৳ 10,000 - ৳ 50,000",
    rate: "8% APR",
    tenure: "6 - 18 Months",
    tags: ["Women Only", "Quick Approval"],
  },
];

export default function FeaturedLoans() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Featured Loan Products</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Explore some of the most popular loan products from our verified MFI partners.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            View All Products <Info size={18} />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-[2rem] overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                <CardHeader className="bg-primary/5 p-8 flex flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Landmark />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{loan.institution}</p>
                    <h3 className="text-xl font-bold">{loan.title}</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {loan.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white border">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-tight">Amount</p>
                      <p className="font-bold text-lg">{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-tight">Rate</p>
                      <p className="font-bold text-lg text-primary">{loan.rate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-tight">Tenure</p>
                      <p className="font-bold">{loan.tenure}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button className="w-full rounded-xl h-12 group-hover:bg-primary transition-colors">
                    Check Eligibility
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
