import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import { BookingForm } from '../../components/shared';
import { TOURS_DATA } from '../../constants/toursData';

const Tour2 = () => {
    const { t } = useTranslation();
    const sidebarDetails = t('tours.sidebar.details');
    const sidebarItems = t('tours.sidebar.items', { returnObjects: true });
    const sidebarConclusion = t('tours.sidebar.conclusion');
    return (
        <>
            {/* header */}
            <header className="flex header-sm">
                <div className="container">
                    <div className="hero-content">
                        <h1>{t('tours.detailsTitle')}</h1>
                        <p>{t('tours.detailsSubtitle')}</p>
                    </div>
                </div>
            </header>
            {/* header */}

            {/* tour single */}
            <section id="tour-single" className="py-4">
                <div className="container">
                    <div className="title-wrap">
                        <span className="sm-title">{t('tours.exploreThisTour')}</span>
                        <h2 className="lg-title">{t('tour2.title')}</h2>
                    </div>

                    <div className="tour-single-row">
                        <article className="tour-single-content">
                            <p>
                                <img
                                    className="img-frame-orange"
                                    src="/images/Tours/Tour2.webp"
                                    alt="Blog detail image"
                                />
                            </p>

                            {/* Overview Section */}
                            <div className="tour-section">
                                <h3><i className="fas fa-map-marked-alt"></i> {t('tours.overview')}</h3>
                                <div className="tour-overview">
                                    <p className="text">
                                        This 6-day journey takes you through Morocco's most iconic cities and breathtaking landscapes. From the cosmopolitan energy of Casablanca to the blue charm of Chefchaouen, the ancient medina of Fes, and the golden dunes of the Sahara — experience Morocco's culture, colors, and traditions in one unforgettable adventure.
                                    </p>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-clock"></i> {t('tours.durationLabel', { count: TOURS_DATA[1].duration })}</span>
                                        <span className="detail-item"><i className="fas fa-play"></i> {t('tours.startLabel', { city: t(TOURS_DATA[1].start) })}</span>
                                        <span className="detail-item"><i className="fas fa-stop"></i> {t('tours.endLabel', { city: t(TOURS_DATA[1].end) })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day 1 */}
                            <div className="tour-section">
                                <h3><i className="fas fa-sun"></i> Day 1<br /><span className="route-text">Casablanca <i className="fas fa-arrow-right"></i> Rabat <i className="fas fa-arrow-right"></i> Chefchaouen</span></h3>
                                <div className="day-content">
                                    <ul className="text icon-list">
                                        {t('tour2.day1.text', { returnObjects: true }).map((item, idx) => (
                                            <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                                        ))}
                                    </ul>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour2.day1.accommodation')}</span>
                                        <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour2.day1.meals')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day 2 */}
                            <div className="tour-section">
                                <h3><i className="fas fa-moon"></i> Day 2<br /><span className="route-text">Chefchaouen <i className="fas fa-arrow-right"></i> Volubilis <i className="fas fa-arrow-right"></i> Meknes <i className="fas fa-arrow-right"></i> Fes</span></h3>
                                <div className="day-content">
                                    <ul className="text icon-list">
                                        {t('tour2.day2.text', { returnObjects: true }).map((item, idx) => (
                                            <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                                        ))}
                                    </ul>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour2.day2.accommodation')}</span>
                                        <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour2.day2.meals')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day 3 */}
                            <div className="tour-section">
                                <h3><i className="fas fa-city"></i> Day 3<br /><span className="route-text">Guided Tour of Fes</span></h3>
                                <div className="day-content">
                                    <ul className="text icon-list">
                                        {t('tour2.day3.text', { returnObjects: true }).map((item, idx) => (
                                            <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                                        ))}
                                    </ul>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour2.day3.accommodation')}</span>
                                        <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour2.day3.meals')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day 4 */}
                            <div className="tour-section">
                                <h3><i className="fas fa-mountain"></i> Day 4<br /><span className="route-text">Fes <i className="fas fa-arrow-right"></i> Midelt <i className="fas fa-arrow-right"></i> Ziz Valley <i className="fas fa-arrow-right"></i> Merzouga Desert</span></h3>
                                <div className="day-content">
                                    <ul className="text icon-list">
                                        {t('tour2.day4.text', { returnObjects: true }).map((item, idx) => (
                                            <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                                        ))}
                                    </ul>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour2.day4.accommodation')}</span>
                                        <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour2.day4.meals')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day 5 */}
                            <div className="tour-section">
                                <h3><i className="fas fa-campground"></i> Day 5<br /><span className="route-text">Merzouga <i className="fas fa-arrow-right"></i> Todra Gorges <i className="fas fa-arrow-right"></i> Dades Valley</span></h3>
                                <div className="day-content">
                                    <ul className="text icon-list">
                                        {t('tour2.day5.text', { returnObjects: true }).map((item, idx) => (
                                            <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                                        ))}
                                    </ul>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour2.day5.accommodation')}</span>
                                        <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour2.day5.meals')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day 6 */}
                            <div className="tour-section">
                                <h3><i className="fas fa-home"></i> Day 6<br /><span className="route-text">Dades Valley <i className="fas fa-arrow-right"></i> Ouarzazate <i className="fas fa-arrow-right"></i> Ait Ben Haddou <i className="fas fa-arrow-right"></i> Marrakech</span></h3>
                                <div className="day-content">
                                    <ul className="text icon-list">
                                        {t('tour2.day6.text', { returnObjects: true }).map((item, idx) => (
                                            <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                                        ))}
                                    </ul>
                                    <div className="day-details">
                                        <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour2.day6.meals')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tour Includes */}
                            <div className="tour-section includes-section">
                                <h3><i className="fas fa-check-circle"></i> {t('tours.includes')}</h3>
                                <ul className="tour-list includes-list">
                                    {t('tour2.includes').split('\n').map((line, index) => (
                                        <li key={index}><i className="fas fa-check-circle"></i> {line}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tour Excludes */}
                            <div className="tour-section excludes-section">
                                <h3><i className="fas fa-times-circle"></i> {t('tours.excludes')}</h3>
                                <ul className="tour-list excludes-list">
                                    {t('tour2.excludes').split('\n').map((line, index) => (
                                        <li key={index}><i className="fas fa-times-circle"></i> {line}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Good to Know */}
                            <div className="tour-section tips-section">
                                <h3><i className="fas fa-lightbulb"></i> {t('tours.goodToKnow')}</h3>
                                <ul className="tour-list tips-list">
                                    {t('tour2.goodToKnow').split('\n').map((line, index) => (
                                        <li key={index}><i className="fas fa-lightbulb"></i> {line}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                        <aside className="tour-single-sidebar">
                            <div className="sidebar-box">
                                <div className="tripadvisor-box">
                                    <img src="/images/Excursions/Airport.webp" alt="Sidebar Tour" />
                                </div>
                                <div className="welcome-text-box">
                                    <h4>Airport Transfer Services in Morocco</h4>
                                    <div className="brand-container">
                                        <span className="brand-main">Amsirar</span>
                                        <span className="brand-sub">Transport Touristique</span>
                                    </div>
                                    <p>
                                        <Trans i18nKey="tours.sidebar.intro" components={{ strong: <strong /> }} /><br /><br />
                                        {sidebarDetails}<br /><br />
                                        {sidebarItems.map((item, idx) => (
                                            <React.Fragment key={idx}>
                                                <i className="fas fa-check"></i> {item}<br />
                                            </React.Fragment>
                                        ))}
                                        <br />{sidebarConclusion}
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>
            {/* end of tour single */}

            {/* booking section */}
            <section className="py-4x">
                <div className="container">
                    <BookingForm tourId={2} tourTitle={t(TOURS_DATA.find(t => t.id === 2).title)} />
                </div>
            </section>
            {/* end of booking section */}
        </>
    );
};

export default Tour2;
