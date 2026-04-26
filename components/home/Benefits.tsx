"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const entrepreneurBenefits = [
  "Easy loan access without middle-men",
  "Compare multiple MFIs in one place",
  "Fast application with digital processing",
  "Transparent process with no hidden costs",
];

const mfiBenefits = [
  "Access to verified and pre-screened applicants",
  "Manage all applications in a digital pipeline",
  "Increase outreach across rural Bangladesh",
  "Reduce processing time and operational costs",
];

export default function Benefits() {
  return (
    <section className="py-24 space-y-24">
      {/* Entrepreneurs */}
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Empowering <span className="text-primary">Entrepreneurs</span></h2>
            <p className="text-muted-foreground text-lg">
              We help you grow your small business by providing a direct bridge to the financial support you need.
            </p>
          </div>
          
          <div className="grid gap-4">
            {entrepreneurBenefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <Link href="/register/entrepreneur">
            <Button className="mt-4 gap-2">
              Start Your Application <ArrowUpRight size={18} />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-muted rounded-[3rem] aspect-square lg:aspect-video flex items-center justify-center overflow-hidden border shadow-2xl relative"
        >
           <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop" 
            alt="Entrepreneur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p className="text-white font-medium italic">"finBridge helped me secure a loan for my tailoring shop in just 3 days." - Rahima Begum, Dhaka</p>
          </div>
        </motion.div>
      </div>

      {/* MFIs */}
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-muted rounded-[3rem] aspect-square lg:aspect-video flex items-center justify-center overflow-hidden border shadow-2xl relative order-2 lg:order-1"
        >
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
            alt="MFI Management" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p className="text-white font-medium italic">"Digitizing our application pipeline has increased our efficiency by 40%." - MFI Branch Manager</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 order-1 lg:order-2"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Solutions for <span className="text-secondary">MFIs</span></h2>
            <p className="text-muted-foreground text-lg">
              Streamline your lending operations and reach more qualified applicants across the country.
            </p>
          </div>
          
          <div className="grid gap-4">
            {mfiBenefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <Link href="/register/mfi">
            <Button variant="secondary" className="mt-4 gap-2">
              Partner With Us <ArrowUpRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
