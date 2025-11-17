import React from 'react';
import { useTranslation } from 'react-i18next';

const FeaturedTours = () => {
    const { t } = useTranslation();
    const cities = [
        {
            key: 'marrakech',
            image: '/images/Home/Marrakech-tourist.webp',
            titleKey: 'featured.cards.marrakech.title',
            descriptionKey: 'featured.marrakech.description',
            altKey: 'featured.cards.marrakech.alt'
        },
        {
            key: 'casablanca',
            image: '/images/Home/Casablanca-tourist.webp',
            titleKey: 'featured.cards.casablanca.title',
            descriptionKey: 'featured.casablanca.description',
            altKey: 'featured.cards.casablanca.alt'
        },
        {
            key: 'fez',
            image: '/images/Home/Fez-tourist.webp',
            titleKey: 'featured.cards.fez.title',
            descriptionKey: 'featured.fez.description',
            altKey: 'featured.cards.fez.alt'
        },
        {
            key: 'dadesValley',
            image: '/images/Home/valley-tourisit.webp',
            titleKey: 'featured.cards.dadesValley.title',
            descriptionKey: 'featured.dadesValley.description',
            altKey: 'featured.cards.dadesValley.alt'
        },
        {
            key: 'chefchaouen',
            image: '/images/Home/Chefchaouen-tourist.webp',
            titleKey: 'featured.cards.chefchaouen.title',
            descriptionKey: 'featured.chefchaouen.description',
            altKey: 'featured.cards.chefchaouen.alt'
        },
        {
            key: 'rabat',
            image: '/images/Home/Rabat-tourist.webp',
            titleKey: 'featured.cards.rabat.title',
            descriptionKey: 'featured.rabat.description',
            altKey: 'featured.cards.rabat.alt'
        }
    ];

    return (
        <section id="featured" className="py-4">
            <div className="container">
                <div className="title-wrap">
                    <span className="sm-title">{t('featured.smTitle')}</span>
                    <h2 className="lg-title">{t('featured.lgTitle')}</h2>
                </div>
                <div className="featured-row">
                    {cities.map((city) => (
                        <article key={city.key} className="card-article">
                            <img src={city.image} alt={t(city.altKey)} className="card-img" />
                            <div className="card-data">
                                <h2 className="card-title">{t(city.titleKey)}</h2>
                                <p className="card-text">{t(city.descriptionKey)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTours;