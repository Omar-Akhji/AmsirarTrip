import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import { BookingForm } from '../../components/shared';
import { TOURS_DATA } from '../../constants/toursData';

export default function Tour5() {
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
            <h2 className="lg-title">{t('tour5.title')}</h2>
          </div>

          <div className="tour-single-row">
            <article className="tour-single-content">
              <p>
                <img
                  className="img-frame-orange"
                  src="/images/Tours/Tour5.webp"
                  alt="Blog detail image"
                />
              </p>

              {/* Overview Section */}
              <div className="tour-section">
                <h3><i className="fas fa-map-marked-alt"></i> {t('tours.overview')}</h3>
                <div className="tour-overview">
                  <p className="text">{t('tour5.overview')}</p>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-clock"></i> {t('tours.durationLabel', { count: TOURS_DATA[4].duration })}</span>
                    <span className="detail-item"><i className="fas fa-play"></i> {t('tours.startLabel', { city: t(TOURS_DATA[4].start) })}</span>
                    <span className="detail-item"><i className="fas fa-stop"></i> {t('tours.endLabel', { city: t(TOURS_DATA[4].end) })}</span>
                  </div>
                </div>
              </div>

              {/* Day 1 */}
              <div className="tour-section">
                <h3><i className="fas fa-sun"></i> Day 1<br /><span className="route-text">Arrival in Marrakech</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day1.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day1.accommodation')}</span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="tour-section">
                <h3><i className="fas fa-moon"></i> Day 2<br /><span className="route-text">Marrakech – Guided City Tour</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day2.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day2.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day2.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="tour-section">
                <h3><i className="fas fa-sunrise"></i> Day 3<br /><span className="route-text">Marrakech <i className="fas fa-arrow-right"></i> Ait Ben Haddou <i className="fas fa-arrow-right"></i> Ouarzazate <i className="fas fa-arrow-right"></i> Dades Valley</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day3.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day3.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day3.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 4 */}
              <div className="tour-section">
                <h3><i className="fas fa-mountain"></i> Day 4<br /><span className="route-text">Dades Valley <i className="fas fa-arrow-right"></i> Todra Gorges <i className="fas fa-arrow-right"></i> Merzouga Desert</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day4.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day4.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day4.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 5 */}
              <div className="tour-section">
                <h3><i className="fas fa-star"></i> Day 5<br /><span className="route-text">Merzouga <i className="fas fa-arrow-right"></i> Ziz Valley <i className="fas fa-arrow-right"></i> Midelt <i className="fas fa-arrow-right"></i> Fes</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day5.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day5.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day5.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 6 */}
              <div className="tour-section">
                <h3><i className="fas fa-city"></i> Day 6<br /><span className="route-text">Full-Day Exploration of Fes</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day6.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day6.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day6.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 7 */}
              <div className="tour-section">
                <h3><i className="fas fa-crown"></i> Day 7<br /><span className="route-text">Fes <i className="fas fa-arrow-right"></i> Meknes <i className="fas fa-arrow-right"></i> Volubilis <i className="fas fa-arrow-right"></i> Chefchaouen</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day7.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day7.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day7.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 8 */}
              <div className="tour-section">
                <h3><i className="fas fa-water"></i> Day 8<br /><span className="route-text">Chefchaouen <i className="fas fa-arrow-right"></i> Rabat</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day8.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day8.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day8.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 9 */}
              <div className="tour-section">
                <h3><i className="fas fa-building"></i> Day 9<br /><span className="route-text">Rabat <i className="fas fa-arrow-right"></i> Casablanca</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day9.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour5.day9.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day9.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 10 */}
              <div className="tour-section">
                <h3><i className="fas fa-plane"></i> Day 10<br /><span className="route-text">Casablanca <i className="fas fa-arrow-right"></i> Departure</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour5.day10.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour5.day10.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Tour Includes */}
              <div className="tour-section includes-section">
                <h3> {t('tours.includes')}</h3>
                <ul className="tour-list includes-list">
                  {t('tour5.includes').split('\n').map((line, index) => (
                    <li key={index}><i className="fas fa-check-circle"></i> {line}</li>
                  ))}
                </ul>
              </div>

              {/* Tour Excludes */}
              <div className="tour-section excludes-section">
                <h3> {t('tours.excludes')}</h3>
                <ul className="tour-list excludes-list">
                  {t('tour5.excludes').split('\n').map((line, index) => (
                    <li key={index}><i className="fas fa-times-circle"></i> {line}</li>
                  ))}
                </ul>
              </div>

              {/* Good to Know */}
              <div className="tour-section tips-section">
                <h3> {t('tours.goodToKnow')}</h3>
                <ul className="tour-list tips-list">
                  {t('tour5.goodToKnow').split('\n').map((line, index) => (
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
          <BookingForm tourId={5} tourTitle={t(TOURS_DATA.find(t => t.id === 5).title)} />
        </div>
      </section>
      {/* end of booking section */}
    </>
  );
}
