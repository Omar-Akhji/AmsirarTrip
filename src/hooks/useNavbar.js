import { useEffect, useRef } from 'react';

export default function useNavbar() {
    const navbarRef = useRef(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        let ticking = false;

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY || window.pageYOffset;
                    if (scrollY > 15) {
                        navbar.classList.add('navbar-cng');
                    } else {
                        navbar.classList.remove('navbar-cng');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }

        function setNavbarHeightVar() {
            try {
                const h = navbar.getBoundingClientRect().height;
                document.documentElement.style.setProperty('--navbar-height', h + 'px');
            } catch { /* ignore errors reading element size */ }
        }

        function onResize() {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(window.__resizeTimer);
            window.__resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
            try {
                // keep resize debounce logic; no aside toggle here (component handles it)
                window.matchMedia('(min-width: 992px)');
            } catch { /* ignore media query errors */ }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('DOMContentLoaded', setNavbarHeightVar);
        window.addEventListener('resize', setNavbarHeightVar);
        window.addEventListener('scroll', setNavbarHeightVar);
        window.addEventListener('resize', onResize);

        // Note: hamburger open/close and outside click handling is managed in the
        // React `Navbar` component (uses state and refs). This hook only manages
        // scroll/resize behaviors and the CSS var for navbar height.

        // active link state is managed by React Router NavLink

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('DOMContentLoaded', setNavbarHeightVar);
            window.removeEventListener('resize', setNavbarHeightVar);
            window.removeEventListener('scroll', setNavbarHeightVar);
            window.removeEventListener('resize', onResize);
            // component handles its own document listeners; nothing extra to remove here
        };
    }, []);

    return navbarRef;
}
