"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Modal, useModal } from "@/components/Modal";
import { SectionDescription } from "@/components/Typography";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const error = searchParams?.get("error");

  const [loading, setLoading] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex justify-center px-4 sm:px-16">
        <Button onClick={openModal} size="2xl">
          <span className="flex items-center justify-center">
            <Image
              src="/images/google.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
            />
            <span className="ml-2">Sign in with Google</span>
          </span>
        </Button>
        <Modal title="Sign in" isOpen={isModalOpen} hideModal={closeModal}>
          <div className="mt-2">
            <div className="mt-8">
              <SectionDescription>
                Mailto Live{"'"}s use and transfer of information received from
                Google APIs to any other app will adhere to{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  className="underline underline-offset-4 hover:text-gray-900"
                >
                  Google API Services User Data
                </a>{" "}
                Policy, including the Limited Use requirements.
              </SectionDescription>
            </div>

            <div className="mt-8">
              <Button
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  signIn(
                    "google",
                    {
                      ...(next && next.length > 0
                        ? { callbackUrl: next }
                        : { callbackUrl: "/welcome" }),
                    },
                    error === "RequiresReconsent"
                      ? { consent: true }
                      : undefined,
                  );
                }}
              >
                I agree
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
