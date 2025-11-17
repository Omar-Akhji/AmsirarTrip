import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const testimonials = [
    { key: 'kevin' },
    { key: 'ben' },
    { key: 'sara' }
];

const TestimonialsSection = () => {
    const { t } = useTranslation();
    return (
        <section id="testimonials" className="py-4">
            <article className="container">
                <div className="title-wrap">
                    <span className="sm-title">{t('testimonials.smTitle')}</span>
                    <h2 className="lg-title">{t('testimonials.lgTitle')}</h2>
                </div>
                <div className="test-row">
                    {testimonials.map(({ key }) => (
                        <figure key={key} className="test-item">
                            <blockquote className="text">
                                <Trans i18nKey={`testimonials.items.${key}.quote`} components={{ montserrat: <span className="montserrat" /> }} />
                            </blockquote>
                            <div className="stars" aria-label={t('testimonials.starsLabel')}>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <figcaption className="test-item-info">
                                <img src="/icons/face-img.svg" alt={t(`testimonials.items.${key}.alt`)} />
                                <div>
                                    <h3>{t(`testimonials.items.${key}.name`)}</h3>
                                    <p className="text">{t(`testimonials.items.${key}.country`)}</p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </article>
        </section>
    );
};

export default TestimonialsSection;