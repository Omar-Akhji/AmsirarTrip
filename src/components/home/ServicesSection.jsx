import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ServicesSection = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth <= 991);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const services = [
        { key: 'handcrafted', icon: '/icons/globus-icon.svg', altKey: 'services.cards.handcrafted.alt' },
        { key: 'guide', icon: '/icons/map-icon.svg', altKey: 'services.cards.guide.alt' },
        { key: 'price', icon: '/icons/dollar-icon.svg', altKey: 'services.cards.price.alt' }
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 991);
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-rotate every 3 seconds on tablet and mobile
    useEffect(() => {
        if (!isTablet && !isMobile) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isTablet, isMobile, services.length]);

    // Get the two services to display
    const getVisibleServices = () => {
        const firstIndex = currentIndex;
        const secondIndex = (currentIndex + 1) % services.length;
        return [services[firstIndex], services[secondIndex]];
    };

    if (!isTablet && !isMobile) {
        // Original layout for desktop
        return (
            <section id="services" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('services.smTitle')}</span>
                        <h2 className="lg-title">{t('services.lgTitle')}</h2>
                    </div>
                    <div className="services-row">
                        {services.map((service, index) => (
                            <article key={index} className="services-item">
                                <span className="services-icon">
                                    <img src={service.icon} alt={t(service.altKey)} />
                                </span>
                                <h3>{t(`services.cards.${service.key}.title`)}</h3>
                                <p className="text">{t(`services.cards.${service.key}.text`)}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isMobile) {
        // Mobile layout with auto-rotating single service
        return (
            <section id="services" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('services.smTitle')}</span>
                        <h2 className="lg-title">{t('services.lgTitle')}</h2>
                    </div>
                    <div className="services-row services-rotator">
                        <article key={`service-mobile-${currentIndex}`} className="services-item">
                            <span className="services-icon">
                                <img src={services[currentIndex].icon} alt={t(services[currentIndex].altKey)} />
                            </span>
                            <h3>{t(`services.cards.${services[currentIndex].key}.title`)}</h3>
                            <p className="text">{t(`services.cards.${services[currentIndex].key}.text`)}</p>
                        </article>
                        <div className="services-dots" aria-label="Services rotation indicator" role="tablist">
                            {services.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`services-dot ${index === currentIndex ? 'active' : ''}`}
                                    aria-label={t('services.aria.single', {
                                        service: t(`services.cards.${services[index].key}.title`)
                                    })}
                                    aria-selected={index === currentIndex}
                                    disabled
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Tablet layout with auto-rotating 2 services
    const visibleServices = getVisibleServices();

    return (
        <section id="services" className="py-4">
            <div className="container">
                <div className="title-wrap">
                    <span className="sm-title">{t('services.smTitle')}</span>
                    <h2 className="lg-title">{t('services.lgTitle')}</h2>
                </div>
                <div className="services-row services-rotator">
                    {visibleServices.map((service, index) => (
                        <article key={`service-${currentIndex}-${index}`} className="services-item">
                            <span className="services-icon">
                                <img src={service.icon} alt={t(service.altKey)} />
                            </span>
                            <h3>{t(`services.cards.${service.key}.title`)}</h3>
                            <p className="text">{t(`services.cards.${service.key}.text`)}</p>
                        </article>
                    ))}
                    <div className="services-dots" aria-label="Services rotation indicator" role="tablist">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`services-dot ${index === currentIndex ? 'active' : ''}`}
                                aria-label={t('services.aria.pairStarting', {
                                    service: t(`services.cards.${services[index].key}.title`)
                                })}
                                aria-selected={index === currentIndex}
                                disabled
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;