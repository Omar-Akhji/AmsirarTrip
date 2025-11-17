import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import useNavbar from '../../hooks/useNavbar';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const navbarRef = useNavbar();

    const [asideOpen, setAsideOpen] = useState(false);
    const collapseRef = useRef(null);
    const btnRef = useRef(null);
    // Breakpoint flags
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const { t, i18n } = useTranslation();
    // Language selector (icon in social links)
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const [currentLang, setCurrentLang] = useState(i18n.language);

    // Close aside when clicking outside (React-managed)
    useEffect(() => {
        function onDocClick(e) {
            if (!collapseRef.current || !btnRef.current) return;
            const clickInsideAside = collapseRef.current.contains(e.target);
            const clickOnToggle = btnRef.current.contains(e.target);
            if (!clickInsideAside && !clickOnToggle && asideOpen) {
                setAsideOpen(false);
            }
        }
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, [asideOpen]);

    // Close language dropdown when clicking outside
    useEffect(() => {
        function onLangClick(e) {
            if (!langRef.current) return;
            const inside = langRef.current.contains(e.target);
            if (!inside && langOpen) setLangOpen(false);
        }
        document.addEventListener('click', onLangClick);
        return () => document.removeEventListener('click', onLangClick);
    }, [langOpen]);

    // Update currentLang when i18n.language changes
    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    // Update isTablet, isMobile, and isDesktop on mount and resize
    useEffect(() => {
        const evaluate = () => {
            const w = window.innerWidth;
            setIsTablet(w >= 767 && w <= 1050);
            setIsMobile(w < 767);
            setIsDesktop(w >= 1051);
        };
        evaluate();
        window.addEventListener('resize', evaluate, { passive: true });
        return () => window.removeEventListener('resize', evaluate);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    // Handle navigation link clicks - show preloader, scroll to top and navigate
    const handleNavClick = useCallback((e, to) => {
        // If event provided, prevent default native navigation so we can show loader first
        if (e && e.preventDefault) e.preventDefault();

        // If already on the target route, just scroll and close
        if (location.pathname === to) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setAsideOpen(false);
            return;
        }

        // Show global preloader immediately so the user sees it before navigation
        try {
            document.body.classList.add('is-preloading');
        } catch {
            // ignore
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setAsideOpen(false); // Close mobile menu

        // Delay navigation slightly to allow the preloader to render (very small)
        setTimeout(() => {
            navigate(to);
        }, 40);
    }, [location.pathname, navigate]);

    // Toggle the aside (no debug logging in production)
    const toggleAside = () => {
        setAsideOpen((s) => !s);
    };

    // Languages
    const languages = [
        { code: 'en', name: 'English', shortName: 'EN' },
        { code: 'fr', name: 'Français', shortName: 'FR' },
        { code: 'de', name: 'Deutsch', shortName: 'DE' },
        { code: 'es', name: 'Español', shortName: 'ES' }
    ];

    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    const changeLanguage = (code) => {
        try { localStorage.setItem('site-language', code); } catch { /* ignore */ }
        i18n.changeLanguage(code);
        setLangOpen(false);
    };

    return (
        <nav className="navbar full-bleed" ref={navbarRef}>
            {/* Desktop Layout (992px and above) */}
            {isDesktop && (
                <>
                    {/* Top row with phone and brand - full width */}
                    <div className="navbar-top-row-fullwidth">
                        <div className="container">
                            {/* Phone number section */}
                            <a href="tel:+212061173144" className="helpline-box">
                                <div className="icon-box">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                </div>
                                <div className="wrapper">
                                    <p className="helpline-title">{t('helplineTitle')}</p>
                                    <p className="helpline-number">{t('helplineNumber')}</p>
                                </div>
                            </a>

                            {/* Brand in the middle */}
                            <NavLink to="/" className="site-brand" onClick={(e) => handleNavClick(e, '/')}>Amsirar<span>Trip</span></NavLink>
                        </div>
                    </div>

                    {/* Navigation links below */}
                    <div className="container navbar-nav-container">
                        <div className="navbar-socials">
                            <a href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html" className="social-link social-tripadvisor" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/tripadvisor-nav_icon.svg" alt="Tripadvisor" className="social-icon" />
                            </a>
                            <a href="https://wa.me/212661173144" className="social-link social-whatsapp" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/whatsapp-nav_icon.svg" alt="WhatsApp" className="social-icon" />
                            </a>
                            <a href="mailto:contact@amsirartrip.com" className="social-link social-mail">
                                <img src="/icons/mail-nav_icon.svg" alt="Email" className="social-icon" />
                            </a>
                            {/* Language icon with dropdown */}
                            <div className="social-lang" ref={langRef}>
                                <button
                                    type="button"
                                    className={`social-link social-lang-btn ${langOpen ? 'open' : ''}`}
                                    aria-haspopup="listbox"
                                    aria-expanded={langOpen}
                                    aria-label={t('language') || 'Language'}
                                    onClick={() => setLangOpen(o => !o)}
                                >
                                    <img src="/icons/translate-icon-com.svg" alt="" className="social-icon lang-icon" />
                                    <span className="lang-badge" aria-hidden="true">{currentLanguage.shortName}</span>
                                </button>
                                {langOpen && (
                                    <ul className="lang-menu" role="listbox">
                                        {languages.map((lang) => (
                                            <li
                                                key={lang.code}
                                                className={`lang-item ${lang.code === currentLanguage.code ? 'active' : ''}`}
                                                role="option"
                                                aria-selected={lang.code === currentLanguage.code}
                                                onClick={() => changeLanguage(lang.code)}
                                            >
                                                <span className="lang-name">{lang.name}</span>
                                                <span className="lang-code">{lang.shortName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/')}>
                                    <span className="nav-label">{t('home')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tours" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/tours')}>
                                    <span className="nav-label">{t('tours')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/excursion" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/excursion')}>
                                    <span className="nav-label">{t('excursion')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/about')}>
                                    <span className="nav-label">{t('about')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/contact')}>
                                    <span className="nav-label">{t('contact')}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </>
            )}

            {/* Tablet and Mobile Layout (below 992px) */}
            {!isDesktop && (
                <div className="container flex">
                    {/* Brand */}
                    <NavLink to="/" className="site-brand" onClick={(e) => handleNavClick(e, '/')}>Amsirar<span>Trip</span></NavLink>

                    {isTablet && (
                        <div className="navbar-socials">
                            <a href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html" className="social-link social-tripadvisor" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/tripadvisor-nav_icon.svg" alt="Tripadvisor" className="social-icon" />
                            </a>
                            <a href="https://wa.me/212661173144" className="social-link social-whatsapp" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/whatsapp-nav_icon.svg" alt="WhatsApp" className="social-icon" />
                            </a>
                            <a href="mailto:contact@amsirartrip.com" className="social-link social-mail">
                                <img src="/icons/mail-nav_icon.svg" alt="Email" className="social-icon" />
                            </a>
                            {/* Language icon with dropdown */}
                            <div className="social-lang" ref={langRef}>
                                <button
                                    type="button"
                                    className={`social-link social-lang-btn ${langOpen ? 'open' : ''}`}
                                    aria-haspopup="listbox"
                                    aria-expanded={langOpen}
                                    aria-label={t('language') || 'Language'}
                                    onClick={() => setLangOpen(o => !o)}
                                >
                                    <img src="/icons/translate-icon-com.svg" alt="" className="social-icon lang-icon" />
                                    <span className="lang-badge" aria-hidden="true">{currentLanguage.shortName}</span>
                                </button>
                                {langOpen && (
                                    <ul className="lang-menu" role="listbox">
                                        {languages.map((lang) => (
                                            <li
                                                key={lang.code}
                                                className={`lang-item ${lang.code === currentLanguage.code ? 'active' : ''}`}
                                                role="option"
                                                aria-selected={lang.code === currentLanguage.code}
                                                onClick={() => changeLanguage(lang.code)}
                                            >
                                                <span className="lang-name">{lang.name}</span>
                                                <span className="lang-code">{lang.shortName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mobile language dropdown (moved out of collapse) */}
                    {isMobile && (
                        <div className="social-lang" ref={langRef}>
                            <button
                                type="button"
                                className={`social-link social-lang-btn ${langOpen ? 'open' : ''}`}
                                aria-haspopup="listbox"
                                aria-expanded={langOpen}
                                aria-label={t('language') || 'Language'}
                                onClick={() => setLangOpen(o => !o)}
                            >
                                <img src="/icons/translate-icon-com.svg" alt="" className="social-icon lang-icon" />
                                <span className="lang-badge" aria-hidden="true">{currentLanguage.shortName}</span>
                            </button>
                            {langOpen && (
                                <ul className="lang-menu" role="listbox">
                                    {languages.map((lang) => (
                                        <li
                                            key={lang.code}
                                            className={`lang-item ${lang.code === currentLanguage.code ? 'active' : ''}`}
                                            role="option"
                                            aria-selected={lang.code === currentLanguage.code}
                                            onClick={() => changeLanguage(lang.code)}
                                        >
                                            <span className="lang-name">{lang.name}</span>
                                            <span className="lang-code">{lang.shortName}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        id="navbar-show-btn"
                        className="flex"
                        aria-expanded={asideOpen}
                        aria-controls="navbar-collapse"
                        onClick={toggleAside}
                        ref={btnRef}
                    >
                        <i className={asideOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-list-ul'} aria-hidden="true"></i>
                    </button>

                    {/* Inline style override on tablet when open to ensure max-height wins over conflicting CSS */}
                    <div
                        id="navbar-collapse"
                        ref={collapseRef}
                        className={asideOpen ? 'navbar-collapse-rmw' : ''}
                    /* CSS-only: inline style removed so responsive.css controls sizing */
                    >
                        {isMobile && (
                            <div className="navbar-socials">
                                <a href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html" className="social-link social-tripadvisor" target="_blank" rel="noopener noreferrer">
                                    <img src="/icons/tripadvisor-nav_icon.svg" alt="Tripadvisor" className="social-icon" />
                                </a>
                                <a href="https://wa.me/212661173144" className="social-link social-whatsapp" target="_blank" rel="noopener noreferrer">
                                    <img src="/icons/whatsapp-nav_icon.svg" alt="WhatsApp" className="social-icon" />
                                </a>
                                <a href="mailto:contact@amsirartrip.com" className="social-link social-mail">
                                    <img src="/icons/mail-nav_icon.svg" alt="Email" className="social-icon" />
                                </a>
                            </div>
                        )}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/')}>
                                    {!isTablet && !isMobile && <img src="/icons/home.svg" alt="" className="nav-icon" />}
                                    <span className="nav-label">{t('home')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tours" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/tours')}>
                                    {!isTablet && !isMobile && <img src="/icons/tours.svg" alt="" className="nav-icon" />}
                                    <span className="nav-label">{t('tours')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/excursion" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/excursion')}>
                                    {!isTablet && !isMobile && <img src="/icons/tours.svg" alt="" className="nav-icon" />}
                                    <span className="nav-label">{t('excursion')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/about')}>
                                    {!isTablet && !isMobile && <img src="/icons/about.svg" alt="" className="nav-icon" />}
                                    <span className="nav-label">{t('about')}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavClick(e, '/contact')}>
                                    {!isTablet && !isMobile && <img src="/icons/contact.svg" alt="" className="nav-icon" />}
                                    <span className="nav-label">{t('contact')}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
