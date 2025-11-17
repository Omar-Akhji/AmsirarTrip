import React from "react";
import { Trans, useTranslation } from 'react-i18next';
import { BookingForm } from '../../components/shared';

const Excursion2 = () => {
    const { t } = useTranslation();
    const highlights = t('excursion2.highlights', { returnObjects: true });
    return (
        <>
            <header className="flex header-sm">
                <div className="container">
                    <div className="hero-content">
                        <h1>{t('excursion.detailsTitle')}</h1>
                        <p>{t('excursion.detailsSubtitle')}</p>
                    </div>
                </div>
            </header>

            <section id="excursion-single" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('excursion.exploreThisExcursion')}</span>
                        <h2 className="lg-title">{t('excursion2.title')}</h2>
                    </div>

                    <div className="excursion-single-row">
                        <article className="excursion-single-content">
                            <p>
                                <img
                                    className="img-frame-orange"
                                    src="/images/Excursions/Essaouira.webp"
                                    alt={t('excursion2.alt')}
                                />
                            </p>
                            <div className="info-card">
                                <div className="info-meta">
                                    <span className="badge"><i className="fa fa-road" aria-hidden="true"></i> {t('excursion.common.distance', { value: t('excursion2.distanceValue') })}</span>
                                    <span className="badge"><i className="fa fa-clock-o" aria-hidden="true"></i> {t('excursion.common.duration', { value: t('excursion2.durationLabel') })}</span>
                                </div>

                                <h3>{t('excursion.common.highlights')}</h3>
                                <ul className="text icon-list">
                                    {Array.isArray(highlights) ? highlights.map((item, idx) => (
                                        <li key={idx}><i className="fa fa-check" aria-hidden="true"></i> {item}</li>
                                    )) : null}
                                </ul>

                                <h3>{t('excursion.common.overview')}</h3>
                                <p className="text">
                                    <Trans i18nKey="excursion2.overview" components={{ strong: <strong /> }} />
                                </p>
                            </div>
                        </article>
                        <aside className="excursion-single-sidebar">
                            <div className="excursion-sidebar-box">
                                <div className="excursion-tripadvisor-box">
                                    <img src="/images/Excursions/Airport.webp" alt={t('excursion.sidebar.alt')} />
                                </div>
                                <div className="excursion-welcome-text-box">
                                    <h4>{t('excursion.sidebar.title')}</h4>
                                    <div className="brand-container">
                                        <span className="brand-main">{t('excursion.sidebar.mainBrand')}</span>
                                        <span className="brand-sub">{t('excursion.sidebar.subBrand')}</span>
                                    </div>
                                    <p>
                                        <Trans i18nKey="excursion.sidebar.intro" components={{ strong: <strong /> }} /><br /><br />
                                        {t('excursion.sidebar.details')}<br /><br />
                                        {t('excursion.sidebar.items', { returnObjects: true }).map((item, idx) => (
                                            <React.Fragment key={idx}>
                                                <i className="fas fa-check"></i> {item}<br />
                                            </React.Fragment>
                                        ))}
                                        <br />{t('excursion.sidebar.conclusion')}
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>

            <section className="py-4x">
                <div className="container">
                    <BookingForm excursionId={2} excursionTitle={t('excursion2.bookingTitle')} />
                </div>
            </section>
        </>
    );
};

export default Excursion2;