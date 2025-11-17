import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatusKey, setNewsletterStatusKey] = useState('');

    const SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;

    // Load reCAPTCHA v3 script once and return a promise when grecaptcha is ready
    const loadRecaptchaV3 = () => {
        return new Promise((resolve) => {
            if (!SITE_KEY) {
                resolve(null); // Let backend fail gracefully if not configured
                return;
            }
            if (window.grecaptcha && window.grecaptcha.execute) {
                window.grecaptcha.ready(() => resolve(window.grecaptcha));
                return;
            }
            const existing = document.getElementById('recaptcha-v3');
            if (existing) {
                existing.addEventListener('load', () => {
                    if (window.grecaptcha) {
                        window.grecaptcha.ready(() => resolve(window.grecaptcha));
                    } else {
                        resolve(null);
                    }
                });
                existing.addEventListener('error', () => resolve(null));
                return;
            }
            const script = document.createElement('script');
            script.id = 'recaptcha-v3';
            script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (window.grecaptcha) {
                    window.grecaptcha.ready(() => resolve(window.grecaptcha));
                } else {
                    resolve(null);
                }
            };
            script.onerror = () => resolve(null);
            document.head.appendChild(script);
        });
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;

        try {
            // Get reCAPTCHA v3 token
            let recaptchaToken = '';
            try {
                const grecaptcha = await loadRecaptchaV3();
                if (grecaptcha && SITE_KEY) {
                    recaptchaToken = await grecaptcha.execute(SITE_KEY, { action: 'newsletter' });
                }
            } catch {
                // ignore, backend will reject without token
            }

            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newsletterEmail, recaptchaToken }),
            });
            const data = await response.json();
            if (data.ok) {
                setNewsletterStatusKey('footer.newsletterSuccess');
                setNewsletterEmail('');
            } else {
                setNewsletterStatusKey('footer.newsletterFailure');
            }
        } catch {
            setNewsletterStatusKey('footer.newsletterNetwork');
        }
        setTimeout(() => setNewsletterStatusKey(''), 5000);
    };
    return (
        // Converted HTML from user into JSX, scoped with .custom-footer to avoid global overrides
        <footer className="custom-footer" role="contentinfo">
            <div className="row">
                <section className="col">
                    <div className="logo-details">
                        <a href="/" className="site-brand" aria-label="AmsirarTrip homepage">Amsirar<span className="brand-accent">Trip</span></a>
                    </div>
                    <p className="font-yellowtail">{t('footer.description')}</p>
                </section>
                <address className="col">
                    <h3>{t('footer.office')}</h3>
                    <p>
                        Imm. J appt N° 5,{"\u00A0"}Résidence La Perle de l'Atlas,{"\u00A0"}angle Rue aboubakr,{"\u00A0"}Marrakech
                    </p>
                    <p className="mail-id"><a href="mailto:amsirare@gmail.com">amsirare@gmail.com</a></p>
                    <p><a href="tel:+212661173144">Mobile: +212 (0) 6 61 17 31 44</a></p>
                    <p><a href="tel:+212524439314">Fixe: +212 (0) 5 24 43 93 14</a></p>
                </address>
                <nav className="col" aria-labelledby="popular-places">
                    <h3 id="popular-places">{t('footer.popularPlaces')}</h3>
                    <ul>
                        <li>Marrakech</li>
                        <li>Casablanca</li>
                        <li>Fes</li>
                        <li>Chefchaouen</li>
                        <li>Agadir</li>
                    </ul>
                </nav>
                <section className="col">
                    <h3>{t('footer.newsletter')}</h3>
                    <form onSubmit={handleNewsletterSubmit} aria-label={t('footer.newsletterAria')}>
                        <img src="/icons/letter-white.svg" alt="" className="mail-icon" aria-hidden="true" />
                        <input
                            type="email"
                            name="email"
                            placeholder={t('footer.newsletterPlaceholder')}
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                            aria-label={t('footer.newsletterInputAria')}
                            autoComplete="email"
                        />
                        <button type="submit" aria-label={t('footer.newsletterButtonAria')}>
                            <img src="/icons/arrow-right-circle_icon.svg" alt="" className="arrow-icon" aria-hidden="true" />
                        </button>
                    </form>
                    {newsletterStatusKey && <p className="newsletter-status">{t(newsletterStatusKey)}</p>}
                    <nav aria-label={t('footer.socialAria')}>
                        <div className="social-icons">
                            <a href="#" className="facebook" aria-label={t('footer.social.facebook')}>
                                <i className="fab fa-facebook-f" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="twitter" aria-label={t('footer.social.twitter')}>
                                <i className="fab fa-x-twitter" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="google" aria-label={t('footer.social.instagram')}>
                                <i className="fab fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="linkedin" aria-label={t('footer.social.linkedin')}>
                                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="tiktok" aria-label={t('footer.social.tiktok')}>
                                <i className="fab fa-tiktok" aria-hidden="true"></i>
                            </a>
                        </div>
                    </nav>
                </section>
            </div>
            <hr />
            <p className="copyright">{t('footer.copyright')}</p>

        </footer>
    );
};

export default Footer;
