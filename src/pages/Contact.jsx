import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from '../components/shared';

export default function Contact() {
    const { t } = useTranslation();
    return (
        <>
            <header className="flex header-sm">
                <div className="container">
                    <div className="hero-content">
                        <h1>{t('contact.title')}</h1>
                        <p dangerouslySetInnerHTML={{ __html: t('contact.headerSubtitle') }} />
                    </div>
                </div>
            </header>

            <section className="py-4y">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">Get in touch with us</span>
                        <h2 className="lg-title">Contact us</h2>
                    </div>
                </div>
            </section>

            <ContactForm />

            <section id="location" className="py-4x">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('contact.location.smTitle')}</span>
                        <h2 className="lg-title">{t('contact.location.lgTitle')}</h2>
                    </div>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.999!2d-8.0257651!3d31.6259758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafef007a3f58d3%3A0xa6485d9ed7022b4c!2sAmsirar+Travel!5e0!3m2!1sen!2sma!4v1699999999999!5m2!1sen!2sma"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="AmsirarTrip Agency Location - Marrakech, Morocco"
                            aria-label="Interactive map showing AmsirarTrip agency location in Marrakech"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
}
