import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/app/(landing)/home/Hero";
import { Testimonials } from "@/app/(landing)/home/Testimonials";
import { Pricing } from "@/app/(app)/premium/Pricing";
import { FAQs } from "@/app/(landing)/home/FAQs";
import { CTA } from "@/app/(landing)/home/CTA";
import { FeaturesAiAssistant } from "@/app/(landing)/home/Features";
import { BasicLayout } from "@/components/layouts/BasicLayout";

export const metadata: Metadata = {
  title: "AI Email Analytics: Revolutionize Your Inbox Productivity | MailtoLive",
  description: "Transform email management with cutting-edge AI-powered analytics. Gain deep insights, automate workflows, and achieve unprecedented inbox efficiency with MailtoLive's intelligent email solution.",
  keywords: [
    "AI email analytics",
    "email productivity tools",
    "inbox optimization",
    "email management AI",
    "smart email automation",
    "productivity software",
    "email insights",
    "workflow efficiency",
    "Gmail AI assistant",
    "email performance tracking"
  ],
  openGraph: {
    title: "AI-Powered Email Analytics: Maximize Your Productivity | MailtoLive",
    description: "Unlock transformative email management with AI-driven insights. Streamline communication, boost efficiency, and conquer inbox chaos.",
    url: "https://mailto.live/email-analytics",
    images: [
      {
        url: "/images/analytics.png",
        width: 1200,
        height: 630,
        alt: "AI-Powered Email Analytics Dashboard Visualization"
      }
    ]
  }
};


export default function EmailAnalytics() {
  return (
    <BasicLayout>
      <Hero
        title="Understand Your Inbox with AI Email Analytics"
        subtitle="Maximize your email management efficiency by gaining insights into your email patterns and improving productivity."
        image="/images/analytics.png"
      />
      <Testimonials />
      <FeaturesAiAssistant />
      <Suspense>
        <div className="pb-32">
          <Pricing />
        </div>
      </Suspense>
      <FAQs />
      <CTA />
    </BasicLayout>
  );
}
