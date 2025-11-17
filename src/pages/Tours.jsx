import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TOURS_DATA } from '../constants/toursData';
import { useTranslation } from 'react-i18next';

export default function Tours() {
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
    }, []); return (
        <>
            <header className="flex header-sm">
                <div className="container">
                    <div className="hero-content">
                        <h1>{t('tours.title')}</h1>
                        <p>{t('tours.headerSubtitle')}</p>
                    </div>
                </div>
            </header>

            <section id="tour" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <h2 className="sm-title">{t('tours.tour.smTitle')}</h2>
                        <h3 className="lg-title">{t('tours.tour.lgTitle')}</h3>
                    </div>
                    <div className="tour-row">
                        {TOURS_DATA.map(tour => (
                            <div key={tour.id} className="post-module">
                                {/* Thumbnail */}
                                <div className="thumbnail">
                                    <img src={tour.image} alt={t(tour.title)} />
                                </div>

                                {/* Post Content */}
                                <div className="post-content">
                                    <div className="category">{t(tour.category)}</div>
                                    <h1 className="title">{t(tour.title)}</h1>
                                    <h2 className="sub-title">{t('tours.departure', { city: t(tour.author) })}</h2>
                                    <p className="description">{t(tour.description)}</p>
                                    <div className="post-meta">
                                        <span className="timestamp">
                                            <i className="fa fa-clock-o"></i> {t('tours.durationDays', { count: tour.duration })}
                                        </span>
                                        <span className="comments">
                                            <NavLink to={tour.route}>
                                                {t('tours.exploreLink')}
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
