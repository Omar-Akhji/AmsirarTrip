import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __resizeTimer?: number;
  }
}

export default function useNavbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          setScrolled(scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    }

    function setNavbarHeightVar() {
      if (!navbar) return;
      try {
        const h = navbar.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--navbar-height", h + "px");
      } catch {
        /* ignore errors reading element size */
      }
    }

    function onResize() {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(window.__resizeTimer);
      window.__resizeTimer = window.setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
      try {
        // keep resize debounce logic; no aside toggle here (component handles it)
        window.matchMedia("(min-width: 992px)");
      } catch {
        /* ignore media query errors */
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("DOMContentLoaded", setNavbarHeightVar);
    window.addEventListener("resize", setNavbarHeightVar);
    window.addEventListener("scroll", setNavbarHeightVar);
    window.addEventListener("resize", onResize);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("DOMContentLoaded", setNavbarHeightVar);
      window.removeEventListener("resize", setNavbarHeightVar);
      window.removeEventListener("scroll", setNavbarHeightVar);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { navbarRef, scrolled };
}
