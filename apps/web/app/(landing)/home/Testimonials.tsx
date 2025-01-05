// Removed unused imports since they're not needed
// import clsx from "clsx";
// import Image from "next/image";

// Keeping the featuredTestimonial constant if it's needed later
const featuredTestimonial = {
  body: "Loving it so far! Cleaned up my top cluttering newsletter and promotional email subscriptions in just a few minutes.",
  author: {
    name: "Jonni Lundy",
    handle: "jonnilundy",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1651273413053542400/6ul40RRM_400x400.jpg",
    logoUrl: "/images/logos/resend.svg",
  },
};

// Disable the Testimonials section by returning null
export function Testimonials() {
  return null; // This ensures the section is not rendered
}
