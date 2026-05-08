import { FooterBrand } from "./footer/FooterBrand";
import { FooterContactInfo } from "./footer/FooterContactInfo";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterBottomBar } from "./footer/FooterBottomBar";
import { AnimateOnScroll } from "@/shared/ui";

export default function FooterTailwind() {
  return (
    <footer
      className="border-orange relative z-10 mbs-0 box-border overflow-hidden border-t-4 bg-slate-950 pbs-6 text-start leading-[1.6] text-white shadow-[0_-8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5 inline-full sm:pbs-8"
      role="contentinfo"
    >
      {/* Subtle radial overlay for depth */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.8)_0%,rgba(15,23,42,0.4)_55%,transparent_90%)]"
        aria-hidden="true"
      />
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-orange/5 absolute -end-16 -top-16 size-72 rounded-full blur-3xl" />
        <div className="bg-orange/3 absolute -start-20 -bottom-20 size-87.5 rounded-full blur-3xl" />
        <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-white/2 to-transparent block-125 inline-125" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="mx-auto p-8 max-inline-7xl">
          <div className="grid grid-cols-1 items-baseline gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AnimateOnScroll animation="fade-up" delay={0}>
              <FooterBrand />
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={150}>
              <FooterContactInfo />
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <FooterNewsletter />
            </AnimateOnScroll>
          </div>
        </div>

        <AnimateOnScroll animation="fade-up" delay={450}>
          <FooterBottomBar />
        </AnimateOnScroll>
      </div>
    </footer>
  );
}
