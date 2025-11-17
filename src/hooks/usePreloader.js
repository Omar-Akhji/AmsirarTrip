import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ensureGlobalPreloader() {
    try {
        if (document.getElementById('page-loader')) return;
        if (!document.getElementById('page-loader-styles')) {
            const style = document.createElement('style');
            style.id = 'page-loader-styles';
            style.textContent = `
body.is-preloading > *:not(#page-loader){visibility:hidden !important}
#page-loader{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#ffffff;z-index:99999}
#page-loader.hidden{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .35s ease,visibility .35s}
#page-loader .spinner{width:32px;height:32px;border-radius:50%;border:4px solid rgba(0,0,0,0.08);border-top-color:var(--orange,#e54a1f);animation:loader-spin 0.6s ease-in-out infinite;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
@keyframes loader-spin{to{transform:rotate(360deg)}}
`;
            (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
        }

        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
        document.body.appendChild(loader);
        document.body.classList.add('is-preloading');
    } catch {
        // ignore
        // console.error('ensureGlobalPreloader error', e);
    }
}

function waitImages(urls = []) {
    const unique = Array.from(new Set(urls.filter(Boolean)));
    if (!unique.length) return Promise.resolve();
    return new Promise((resolve) => {
        let remaining = unique.length;
        const timeout = setTimeout(resolve, 6000);
        unique.forEach((src) => {
            const img = new Image();
            img.onload = img.onerror = () => {
                remaining -= 1;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    resolve();
                }
            };
            img.src = src;
        });
    });
}

export default function usePreloader() {
    const location = useLocation();

    useEffect(() => {
        ensureGlobalPreloader();

        const init = async () => {
            try {
                const loader = document.getElementById('page-loader');
                if (!loader) return;

                const header = document.querySelector('header.flex');
                const urls = [];
                if (header && header.dataset && header.dataset.images) {
                    header.dataset.images.split(',').forEach((s) => {
                        const u = s.trim();
                        if (u) urls.push(u);
                    });
                }
                document.querySelectorAll('#featured img').forEach((img) => {
                    if (img && img.src) urls.push(img.src);
                });

                const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
                const start = Date.now();
                const minShow = 350;

                await Promise.all([fontsReady, waitImages(urls)]);
                const elapsed = Date.now() - start;
                const wait = Math.max(0, minShow - elapsed);
                setTimeout(() => {
                    document.body.classList.remove('is-preloading');
                    if (loader) loader.classList.add('hidden');
                }, wait);
            } catch {
                document.body.classList.remove('is-preloading');
                const loader = document.getElementById('page-loader'); if (loader) loader.classList.add('hidden');
            }
        };

        // Defer init until DOMContentLoaded to ensure header/data attributes are present
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init, { once: true });
        } else {
            init();
        }

        return () => {
            // cleanup: remove loader element and styles if desired
            const loader = document.getElementById('page-loader');
            if (loader) loader.remove();
            const s = document.getElementById('page-loader-styles');
            if (s) s.remove();
            document.body.classList.remove('is-preloading');
        };
    }, [location.pathname]);
}
