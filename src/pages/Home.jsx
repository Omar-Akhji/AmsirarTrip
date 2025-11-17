import React from "react";
import { useTranslation } from 'react-i18next';
import { HeaderRotator } from "../components/shared";
import {
    FeaturedTours,
    ServicesSection,
    TestimonialsSection,
    VideoSection
} from "../components/home";

const Home = () => {
    const { t } = useTranslation();
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section" aria-labelledby="hero-heading">
                <HeaderRotator
                    images="/images/Header/header-1.webp, /images/Header/header-2.webp, /images/Header/header-3.webp"
                    interval={3000}
                >
                    <div className="container">
                        <div className="hero-content">
                            <h1 id="hero-heading">{t('home.heroTitle')}</h1>
                            <p>{t('home.heroSubtitle')}</p>
                        </div>
                    </div>
                </HeaderRotator>
            </section>

            {/* Main Content Sections */}
            <FeaturedTours />
            <ServicesSection />
            <TestimonialsSection />
            <VideoSection />
        </>
    );
}

export default Home;
