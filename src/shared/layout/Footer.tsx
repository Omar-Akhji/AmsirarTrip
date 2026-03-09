import { MotionFooter } from "./footer/MotionFooter";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterContactInfo } from "./footer/FooterContactInfo";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export default function FooterTailwind() {
  return (
    <MotionFooter>
      {/* Subtle radial overlay for depth */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.8)_0%,rgba(15,23,42,0.4)_55%,transparent_90%)]"
        aria-hidden="true"
      />
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-orange/5 absolute -top-16 -right-16 size-72 rounded-full blur-3xl" />
        <div className="bg-orange/3 absolute -bottom-20 -left-20 size-87.5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-white/2 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="mx-auto max-w-7xl p-8">
          <div className="grid grid-cols-1 items-baseline gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <FooterBrand />
            <FooterContactInfo />
            <FooterNewsletter />
          </div>
        </div>

        <FooterBottomBar />
      </div>
    </MotionFooter>
  );
}
