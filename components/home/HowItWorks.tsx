"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Profile",
    desc: "Register and complete your business profile with basic details and NID/TIN.",
  },
  {
    icon: Search,
    title: "Explore Products",
    desc: "Compare different microfinance products from verified institutions in Bangladesh.",
  },
  {
    icon: Send,
    title: "Apply Online",
    desc: "Submit your application digitally in minutes. No need for physical branch visits.",
  },
  {
    icon: CheckCircle,
    title: "Track Status",
    desc: "Monitor your application progress in real-time and get notified on approval.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get your loan in 4 simple steps. We've simplified the entire process to make it low-tech friendly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 bg-background rounded-3xl border hover:border-primary/50 transition-all hover:shadow-xl group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <step.icon size={32} />
              </div>
              <div className="absolute top-8 right-8 text-4xl font-black text-muted/20">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
