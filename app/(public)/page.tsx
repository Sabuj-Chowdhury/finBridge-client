import React from "react";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import FeaturedLoans from "@/components/home/FeaturedLoans";
import TrustAndFAQ from "@/components/home/TrustAndFAQ";
import SubscriptionPlans from "@/components/home/SubscriptionPlans";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <FeaturedLoans />
      <SubscriptionPlans />
      <TrustAndFAQ />
    </>
  );
}
