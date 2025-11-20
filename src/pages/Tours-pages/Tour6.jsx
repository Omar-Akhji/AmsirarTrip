import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import { BookingForm } from '../../components/shared';
import { TOURS_DATA } from '../../constants/toursData';

const Tour6 = () => {
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
            <h2 className="lg-title">
              {t('tour6.title')}
            </h2>
          </div>

          <div className="tour-single-row">
            <article className="tour-single-content">
              <p>
                <img
                  className="img-frame-orange"
                  src="/images/Tours/Tour6.webp"
                  alt="Blog detail image" />
              </p>

              {/* Overview Section */}
              <div className="tour-section">
                <h3><i className="fas fa-map-marked-alt"></i> {t('tours.overview')}</h3>
                <div className="tour-overview">
                  <p className="text">{t('tour6.overview')}</p>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-clock"></i> {t('tours.durationLabel', { count: TOURS_DATA[5].duration })}</span>
                    <span className="detail-item"><i className="fas fa-play"></i> {t('tours.startLabel', { city: t(TOURS_DATA[5].start) })}</span>
                    <span className="detail-item"><i className="fas fa-stop"></i> {t('tours.endLabel', { city: t(TOURS_DATA[5].end) })}</span>
                  </div>
                </div>
              </div>

              {/* Day 1 */}
              <div className="tour-section">
                <h3><i className="fas fa-sun"></i> Day 1<br /><span className="route-text">Marrakech <i className="fas fa-arrow-right"></i> Ait Ben Haddou <i className="fas fa-arrow-right"></i> Ouarzazate <i className="fas fa-arrow-right"></i> Dades Valley</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour6.day1.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour6.day1.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour6.day1.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="tour-section">
                <h3><i className="fas fa-moon"></i> Day 2<br /><span className="route-text">Dades Valley <i className="fas fa-arrow-right"></i> Todra Gorges <i className="fas fa-arrow-right"></i> Merzouga Desert</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour6.day2.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour6.day2.accommodation')}</span>
                    <span className="detail-item"><i className="fa-solid fa-horse-head"></i> {t('tours.activities')}: {t('tour6.day2.activities')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour6.day2.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="tour-section">
                <h3><i className="fas fa-sunrise"></i> Day 3<br /><span className="route-text">Merzouga <i className="fas fa-arrow-right"></i> Alnif <i className="fas fa-arrow-right"></i> Draa Valley <i className="fas fa-arrow-right"></i> Ouarzazate</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour6.day3.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-home"></i> {t('tours.accommodation')}: {t('tour6.day3.accommodation')}</span>
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour6.day3.meals')}</span>
                  </div>
                </div>
              </div>

              {/* Day 4 */}
              <div className="tour-section">
                <h3><i className="fas fa-home"></i> Day 4<br /><span className="route-text">Ouarzazate <i className="fas fa-arrow-right"></i> High Atlas Mountains <i className="fas fa-arrow-right"></i> Marrakech</span></h3>
                <div className="day-content">
                  <ul className="text icon-list">
                    {t('tour6.day4.text', { returnObjects: true }).map((item, idx) => (
                      <li key={idx}><i className="fa-regular fa-circle-dot"></i> {item}</li>
                    ))}
                  </ul>
                  <div className="day-details">
                    <span className="detail-item"><i className="fas fa-utensils"></i> {t('tours.meals')}: {t('tour6.day4.meals')}</span>
                    <span className="detail-item"><i className="fas fa-clock"></i> {t('tours.arrival')}: {t('tour6.day4.arrival')}</span>
                  </div>
                </div>
              </div>

              {/* Tour Includes */}
              <div className="tour-section includes-section">
                <h3> {t('tours.includes')}</h3>
                <ul className="tour-list includes-list">
                  {t('tour6.includes').split('\n').map((line, index) => (
                    <li key={index}><i className="fas fa-check-circle"></i> {line}</li>
                  ))}
                </ul>
              </div>

              {/* Tour Excludes */}
              <div className="tour-section excludes-section">
                <h3> {t('tours.excludes')}</h3>
                <ul className="tour-list excludes-list">
                  {t('tour6.excludes').split('\n').map((line, index) => (
                    <li key={index}><i className="fas fa-times-circle"></i> {line}</li>
                  ))}
                </ul>
              </div>

              {/* Good to Know */}
              <div className="tour-section tips-section">
                <h3> {t('tours.goodToKnow')}</h3>
                <ul className="tour-list tips-list">
                  {t('tour6.goodToKnow').split('\n').map((line, index) => (
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
          <BookingForm tourId={6} tourTitle={t(TOURS_DATA.find(t => t.id === 6).title)} />
        </div>
      </section>
      {/* end of booking section */}
    </>
  );
};

export default Tour6;
