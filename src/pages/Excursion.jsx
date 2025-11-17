import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../constants/routes.js';

const EXCURSION_DATA = [
    {
        id: 1,
        image: '/images/Excursions/Ouzoud Waterfalls.webp',
        titleKey: 'excursion.list.ouzoud.title',
        altKey: 'excursion.list.ouzoud.alt',
        descriptionKey: 'excursion.list.ouzoud.description',
        taglineKey: 'excursion.list.ouzoud.tagline',
        durationKey: 'excursion.list.ouzoud.duration',
        route: ROUTES.EXCURSION_1
    },
    {
        id: 2,
        image: '/images/Excursions/Essaouira.webp',
        titleKey: 'excursion.list.essaouira.title',
        altKey: 'excursion.list.essaouira.alt',
        descriptionKey: 'excursion.list.essaouira.description',
        taglineKey: 'excursion.list.essaouira.tagline',
        durationKey: 'excursion.list.essaouira.duration',
        route: ROUTES.EXCURSION_2
    },
    {
        id: 3,
        image: '/images/Excursions/Imlil & Toubkal.webp',
        titleKey: 'excursion.list.imlil.title',
        altKey: 'excursion.list.imlil.alt',
        descriptionKey: 'excursion.list.imlil.description',
        taglineKey: 'excursion.list.imlil.tagline',
        durationKey: 'excursion.list.imlil.duration',
        route: ROUTES.EXCURSION_3
    },
    {
        id: 4,
        image: '/images/Excursions/Ourika Valley.webp',
        titleKey: 'excursion.list.ourika.title',
        altKey: 'excursion.list.ourika.alt',
        descriptionKey: 'excursion.list.ourika.description',
        taglineKey: 'excursion.list.ourika.tagline',
        durationKey: 'excursion.list.ourika.duration',
        route: ROUTES.EXCURSION_4
    },
    {
        id: 5,
        image: '/images/Excursions/Agafay.webp',
        titleKey: 'excursion.list.agafay.title',
        altKey: 'excursion.list.agafay.alt',
        descriptionKey: 'excursion.list.agafay.description',
        taglineKey: 'excursion.list.agafay.tagline',
        durationKey: 'excursion.list.agafay.duration',
        route: ROUTES.EXCURSION_5
    },
    {
        id: 6,
        image: '/images/Excursions/Hot Air Balloon Ride.webp',
        titleKey: 'excursion.list.balloon.title',
        altKey: 'excursion.list.balloon.alt',
        descriptionKey: 'excursion.list.balloon.description',
        taglineKey: 'excursion.list.balloon.tagline',
        durationKey: 'excursion.list.balloon.duration',
        route: ROUTES.EXCURSION_6
    }
];

export default function Excursion() {
    const { t } = useTranslation();

    useEffect(() => {
        // Function to animate element properties
        const animate = (element, properties, duration) => {
            const start = performance.now();
            const initialStyles = {};

            // Get initial values
            Object.keys(properties).forEach(prop => {
                if (prop === 'height') {
                    initialStyles[prop] = element.offsetHeight;
                } else if (prop === 'opacity') {
                    initialStyles[prop] = parseFloat(getComputedStyle(element).opacity) || 0;
                }
            });

            const animateFrame = (timestamp) => {
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                Object.keys(properties).forEach(prop => {
                    if (properties[prop] === 'toggle') {
                        if (prop === 'height') {
                            const targetHeight = initialStyles.height === 0 ? element.scrollHeight : 0;
                            element.style.height = initialStyles.height + (targetHeight - initialStyles.height) * progress + 'px';
                        } else if (prop === 'opacity') {
                            const targetOpacity = initialStyles.opacity === 0 ? 1 : 0;
                            element.style.opacity = initialStyles.opacity + (targetOpacity - initialStyles.opacity) * progress;
                        }
                    }
                });

                if (progress < 1) {
                    requestAnimationFrame(animateFrame);
                } else {
                    // Set final values
                    Object.keys(properties).forEach(prop => {
                        if (properties[prop] === 'toggle') {
                            if (prop === 'height') {
                                element.style.height = initialStyles.height === 0 ? 'auto' : '0px';
                            } else if (prop === 'opacity') {
                                element.style.opacity = initialStyles.opacity === 0 ? '1' : '0';
                            }
                        }
                    });
                }
            };

            requestAnimationFrame(animateFrame);
        };

        const handleHover = (event) => {
            const postModule = event.currentTarget;
            const description = postModule.querySelector('.description');

            if (!description) return;

            // Stop any ongoing animation
            description.style.transition = 'none';

            if (event.type === 'mouseenter') {
                // Show description with animation
                description.style.display = 'block';
                description.style.height = '0px';
                description.style.opacity = '0';

                setTimeout(() => {
                    animate(description, { height: 'toggle', opacity: 'toggle' }, 300);
                }, 10);
            } else {
                // Hide description with animation
                animate(description, { height: 'toggle', opacity: 'toggle' }, 300);

                setTimeout(() => {
                    description.style.display = 'none';
                }, 300);
            }
        };

        const postModules = document.querySelectorAll('.post-module');
        postModules.forEach(module => {
            module.addEventListener('mouseenter', handleHover);
            module.addEventListener('mouseleave', handleHover);
        });

        return () => {
            postModules.forEach(module => {
                module.removeEventListener('mouseenter', handleHover);
                module.removeEventListener('mouseleave', handleHover);
            });
        };
    }, []);

    return (
        <>
            <header className="flex header-sm">
                <div className="container">
                    <div className="hero-content">
                        <h1>{t('excursion.title')}</h1>
                        <p>{t('excursion.headerSubtitle')}</p>
                    </div>
                </div>
            </header>

            <section id="tour" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <h2 className="sm-title">{t('excursion.blog.smTitle')}</h2>
                        <h3 className="lg-title">{t('excursion.blog.lgTitle')}</h3>
                    </div>
                    <div className="tour-row">
                        {EXCURSION_DATA.map(excursion => (
                            <div key={excursion.id} className="post-module">
                                {/* Thumbnail */}
                                <div className="thumbnail">
                                    <img src={excursion.image} alt={t(excursion.altKey)} />
                                </div>

                                {/* Post Content */}
                                <div className="post-content">
                                    <div className="category">{t('excursion.card.category')}</div>
                                    <h1 className="title">{t(excursion.titleKey)}</h1>
                                    <h2 className="sub-title" style={{ fontSize: '0.9rem' }}>{t(excursion.taglineKey)}</h2>
                                    <p className="description">{t(excursion.descriptionKey)}</p>
                                    <div className="post-meta">
                                        <span className="timestamp">
                                            <i className="fa fa-clock-o"></i> {t(excursion.durationKey)}
                                        </span>
                                        <span className="comments">
                                            <NavLink to={excursion.route}>
                                                {t('excursion.exploreLink')}
                                            </NavLink>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}