import { useEffect, useRef, useState } from "react";

export default function useNavbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    let ticking = false;

    // 1. Handle scroll state (toggling background/styles)
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          setScrolled(scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 2. Sync navbar height with CSS variable
    const syncNavbarHeight = () => {
      if (!navbar) return;
      try {
        const height = navbar.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--spacing-navbar", `${height}px`);
      } catch {
        /* ignore errors reading element size */
      }
    };

    // 3. Handle resize with animation suppression
    const onResize = () => {
      syncNavbarHeight();

      document.body.classList.add("resize-animation-stopper");

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    };

    // Initial sync
    onScroll();
    syncNavbarHeight();

    // Event listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", syncNavbarHeight, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Fallback for initial layout shifts
    window.addEventListener("load", syncNavbarHeight);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", syncNavbarHeight);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", syncNavbarHeight);

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  return { navbarRef, scrolled };
}
