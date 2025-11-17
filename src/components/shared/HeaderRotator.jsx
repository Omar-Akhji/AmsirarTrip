import React, { useEffect, useRef } from 'react';

const HeaderRotator = ({ images, interval = 2000, children }) => {
    const headerRef = useRef(null);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const urls = images ? images.split(',').map(s => s.trim()).filter(Boolean) : [];
        if (urls.length < 2) return;

        const intervalMs = Number.isFinite(interval) && interval > 0 ? interval : 2000;

        // header.classList.add('header-rotator', 'show-a', 'kb-a');

        urls.forEach(u => { const img = new Image(); img.src = u; });

        // Set data-images for preloader
        header.setAttribute('data-images', images);

        const setVar = (name, url) => {
            const clean = url.startsWith('url(') ? url : `url("${url}")`;
            header.style.setProperty(name, clean);
        };

        let index = 0;
        setVar('--rot-img-a', urls[index]);
        setVar('--rot-img-b', urls[(index + 1) % urls.length]);
        let showingA = true;
        // header.style.backgroundImage = `${gradient}, url("${urls[index]}")`;

        function updateDots(activeIdx) {
            if (!dots.length) return;
            dots.forEach((d, i) => {
                if (i === activeIdx) { d.classList.add('active'); d.setAttribute('aria-selected', 'true'); } else { d.classList.remove('active'); d.setAttribute('aria-selected', 'false'); }
            });
        }

        function goTo(targetIndex) {
            if (targetIndex === index) return;
            const nextUrl = urls[targetIndex];
            if (showingA) {
                setVar('--rot-img-b', nextUrl);
                header.classList.remove('show-a');
                header.classList.add('show-b');
                header.classList.remove('kb-a');
                void header.offsetWidth;
                header.classList.add('kb-b');
            } else {
                setVar('--rot-img-a', nextUrl);
                header.classList.remove('show-b');
                header.classList.add('show-a');
                header.classList.remove('kb-b');
                void header.offsetWidth;
                header.classList.add('kb-a');
            }
            showingA = !showingA;
            index = targetIndex;
            // header.style.backgroundImage = `${gradient}, url("${nextUrl}")`;
            updateDots(index);
        }

        const dotsWrap = header.querySelector('.header-dots');
        const dots = [];
        if (dotsWrap) {
            dotsWrap.innerHTML = '';
            urls.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'header-dot' + (i === index ? ' active' : '');
                dot.setAttribute('aria-label', `Show slide ${i + 1}`);
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
                dot.addEventListener('click', () => { goTo(i); });
                dotsWrap.appendChild(dot);
                dots.push(dot);
            });
        }

        header.style.setProperty('--rot-dur', `${intervalMs}ms`);
        const timer = setInterval(() => {
            index = (index + 1) % urls.length;
            const nextUrl = urls[index];
            if (showingA) {
                setVar('--rot-img-b', nextUrl);
                header.classList.remove('show-a');
                header.classList.add('show-b');
                header.classList.remove('kb-a');
                void header.offsetWidth;
                header.classList.add('kb-b');
            } else {
                setVar('--rot-img-a', nextUrl);
                header.classList.remove('show-b');
                header.classList.add('show-a');
                header.classList.remove('kb-b');
                void header.offsetWidth;
                header.classList.add('kb-a');
            }
            showingA = !showingA;
            // header.style.backgroundImage = `${gradient}, url("${nextUrl}")`;
            updateDots(index);
        }, intervalMs);

        return () => {
            clearInterval(timer);
        };
    }, [images, interval]);

    return (
        <header ref={headerRef} id="featured" className="flex header-rotator show-a kb-a">
            {children}
            <div className="header-dots" aria-label="Header image pagination" role="tablist" />
        </header>
    );
};

export default HeaderRotator;