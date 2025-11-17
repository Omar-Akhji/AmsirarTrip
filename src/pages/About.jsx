import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();
    return (
        <>
            <header className="flex header-sm">
                <div className="container">
                    <div className="hero-content">
                        <h1>{t('about.title')}</h1>
                        <p>{t('about.headerSubtitle')}</p>
                    </div>
                </div>
            </header>

            <section id="about" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('about.smTitle')}</span>
                        <h2 className="lg-title">{t('about.ourStory')}</h2>
                    </div>

                    <div className="about-row">
                        <figure className="about-left my-2">
                            <img src="/images/about-img.webp" alt="Amsirar landscape showcasing traditional Moroccan architecture and culture" />
                        </figure>
                        <article className="about-right">
                            <h2>{t('about.experienceTitle')}</h2>
                            <p className="text">
                                {t('about.experienceText1')}
                            </p>
                            <p className="text">
                                {t('about.experienceText2')}
                            </p>
                            <p className="text">
                                {t('about.experienceText3')}
                            </p>

                            <h4>{t('about.whyTrustTitle')}</h4>

                            <ol className="text">
                                <li>{t('about.whyTrust.point1')}</li>
                                <li>{t('about.whyTrust.point2')}</li>
                                <li>{t('about.whyTrust.point3')}</li>
                                <li>{t('about.whyTrust.point4')}</li>
                            </ol>
                            <p className="text">
                                {t('about.conclusionText')}
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Facts Section */}
            <section id="facts" className="py-4 flex">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('about.facts.smTitle')}</span>
                        <h2 className="lg-title">{t('about.facts.lgTitle')}</h2>
                    </div>
                    <div className="facts-row">
                        <div className="facts-item">
                            <span className="facts-icon">
                                <img src="/icons/camera-icon.svg" alt="" aria-hidden="true" />
                            </span>
                            <strong className="facts-number">1220</strong>
                            <p className="text">{t('about.facts.photos')}</p>
                        </div>
                        <div className="facts-item">
                            <span className="facts-icon">
                                <img src="/icons/beach-icon.svg" alt="" aria-hidden="true" />
                            </span>
                            <strong className="facts-number">450</strong>
                            <p className="text">{t('about.facts.beaches')}</p>
                        </div>
                        <div className="facts-item">
                            <span className="facts-icon">
                                <img src="/icons/mountain-icon.svg" alt="" aria-hidden="true" />
                            </span>
                            <strong className="facts-number">84</strong>
                            <p className="text">{t('about.facts.mountains')}</p>
                        </div>
                        <div className="facts-item">
                            <span className="facts-icon">
                                <img src="/icons/travel-icon.svg" alt="" aria-hidden="true" />
                            </span>
                            <strong className="facts-number">120</strong>
                            <p className="text">{t('about.facts.cruises')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
