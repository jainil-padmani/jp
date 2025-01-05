"use client";

import { OnboardingModalDialog } from "@/components/OnboardingModal";
import { useOnboarding } from "@/components/OnboardingModal";

export function SimpleModeOnboarding() {
  const { isOpen, setIsOpen } = useOnboarding("SimpleMode");

  return (
    <OnboardingModalDialog
      title="Welcome to Simple Email Mode"
      description={
        <>
          Simple email mode shows your emails for the past 24 hours, and helps
          you reach Inbox Zero for the day quickly.
        </>
      }
      videoId="1234567"
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
    />
  );
}
