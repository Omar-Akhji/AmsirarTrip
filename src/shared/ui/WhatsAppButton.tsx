"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/212661173144"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "border-whatsapp text-whatsapp fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-[3px] bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:brightness-110",
        "animate-in fade-in zoom-in duration-500"
      )}
      aria-label="Contact us on WhatsApp"
    >
      <span className="bg-whatsapp absolute inset-0 -z-10 animate-ping rounded-full opacity-20 duration-1000" />
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={40}
        height={40}
        className="h-10 w-10"
      />
    </a>
  );
};

export default WhatsAppButton;
