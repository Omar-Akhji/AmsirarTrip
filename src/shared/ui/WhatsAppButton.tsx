import Image from "next/image";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/212661173144"
      target="_blank"
      rel="noopener noreferrer"
      className="border-whatsapp text-whatsapp fixed end-6 bottom-6 z-50 flex items-center justify-center rounded-full border-[3px] bg-white shadow-lg transition-all duration-300 block-16 inline-16 pointer-fine:hover:scale-110 pointer-fine:hover:shadow-xl pointer-fine:hover:brightness-110"
      aria-label="Contact us on WhatsApp"
    >
      <span className="bg-whatsapp absolute inset-0 -z-10 animate-ping rounded-full opacity-20 duration-1000" />
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={40}
        height={40}
        className="size-10"
      />
    </a>
  );
};

export default WhatsAppButton;
