import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const location = useLocation();

    // Add preloading class immediately when component mounts
    useEffect(() => {
        document.body.classList.add('is-preloading');
        return () => {
            document.body.classList.remove('is-preloading');
        };
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                setIsLoading(true);
                setIsHidden(false);

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
                    setIsLoading(false);
                    // Keep is-preloading class until loader is fully hidden
                    setTimeout(() => {
                        document.body.classList.remove('is-preloading');
                        setIsHidden(true);
                    }, 350); // Match CSS transition duration
                }, wait);
            } catch {
                setIsLoading(false);
                // Keep is-preloading class until loader is fully hidden
                setTimeout(() => {
                    document.body.classList.remove('is-preloading');
                    setIsHidden(true);
                }, 350);
            }
        };

        init();
    }, [location.pathname]);

    if (isHidden) return null;

    return (
        <div
            id="page-loader"
            className={isLoading ? '' : 'hidden'}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                zIndex: 99999,
                opacity: isLoading ? 1 : 0,
                visibility: isLoading ? 'visible' : 'hidden',
                transition: 'opacity 0.35s ease, visibility 0.35s',
                pointerEvents: isLoading ? 'auto' : 'none'
            }}
        >
            <div
                className="spinner"
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '4px solid rgba(0,0,0,0.08)',
                    borderTopColor: 'var(--orange,#e54a1f)',
                    animation: 'loader-spin 0.6s ease-in-out infinite',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                aria-hidden="true"
            />
            <style>{`
                @keyframes loader-spin {
                    to { transform: rotate(360deg); }
                }
                body.is-preloading > *:not(#page-loader):not(#video) {
                    visibility: hidden !important;
                }
            `}</style>
        </div>
    );
};

export default Preloader;