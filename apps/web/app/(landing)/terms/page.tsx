import type { Metadata } from "next";
import { TermsContent } from "@/app/(landing)/terms/content";

export const metadata: Metadata = {
  title: "Terms of Service - Mailto Live",
  description: "Terms of Service - Mailto Live",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <TermsContent />;
}
