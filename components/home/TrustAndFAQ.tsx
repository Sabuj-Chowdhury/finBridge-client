"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Users, Briefcase, FileCheck } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Users", value: "25k+" },
  { icon: Briefcase, label: "Loans Processed", value: "৳ 500M+" },
  { icon: FileCheck, label: "MFI Partners", value: "40+" },
];

const faqs = [
  {
    question: "What documents do I need to apply?",
    answer: "Generally, you will need a valid National ID (NID), a recent photo, and your Trade License or TIN if applicable. Requirements may vary slightly depending on the MFI.",
  },
  {
    question: "How long does the approval process take?",
    answer: "Digital applications through finBridge are typically reviewed within 24-48 hours. Once pre-approved, the final disbursement usually takes 3-5 working days.",
  },
  {
    question: "Is my personal data safe?",
    answer: "Yes, we use bank-grade encryption to protect your data. Your information is only shared with the specific MFI you choose to apply to.",
  },
  {
    question: "Can I apply for multiple loans at once?",
    answer: "We recommend applying for one loan at a time to maintain a healthy credit score and increase your chances of approval.",
  },
];

export default function TrustAndFAQ() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2 p-8 rounded-3xl bg-primary/5 border border-primary/10"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-4 shadow-sm">
                <stat.icon size={24} />
              </div>
              <p className="text-4xl font-black text-primary">{stat.value}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Testimonials */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">What Our Users Say</h2>
              <p className="text-muted-foreground text-lg">
                Real stories from entrepreneurs who changed their lives with finBridge.
              </p>
            </div>

            <div className="space-y-8">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-background rounded-3xl border shadow-sm relative"
                >
                  <div className="flex gap-1 text-accent mb-4">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg italic leading-relaxed mb-6">
                    "{i === 1 ? "The easiest way to compare loan rates in Bangladesh. I saved thousands on interest by finding the right partner through finBridge." : "As an MFI, this platform has completely transformed how we reach rural borrowers. The document verification is a lifesaver."}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 10}`} alt="avatar" />
                    </div>
                    <div>
                      <p className="font-bold">{i === 1 ? "Mohammad Karim" : "Selina Akter"}</p>
                      <p className="text-sm text-muted-foreground">{i === 1 ? "Small Business Owner" : "MFI Branch Head"}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about getting started.
              </p>
            </div>

            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-primary/10 py-2">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
