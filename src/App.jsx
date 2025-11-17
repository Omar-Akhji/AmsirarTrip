
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Preloader, Footer } from "./components/shared";
import { ROUTES } from "./constants/routes";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Tours = React.lazy(() => import("./pages/Tours"));
const Excursion = React.lazy(() => import("./pages/Excursion"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Tour1 = React.lazy(() => import("./pages/Tours-pages/Tour1"));
const Tour2 = React.lazy(() => import("./pages/Tours-pages/Tour2"));
const Tour3 = React.lazy(() => import("./pages/Tours-pages/Tour3"));
const Tour4 = React.lazy(() => import("./pages/Tours-pages/Tour4"));
const Tour5 = React.lazy(() => import("./pages/Tours-pages/Tour5"));
const Tour6 = React.lazy(() => import("./pages/Tours-pages/Tour6"));
const Excursion1 = React.lazy(() => import("./pages/Excursions-pages/Excursion1"));
const Excursion2 = React.lazy(() => import("./pages/Excursions-pages/Excursion2"));
const Excursion3 = React.lazy(() => import("./pages/Excursions-pages/Excursion3"));
const Excursion4 = React.lazy(() => import("./pages/Excursions-pages/Excursion4"));
const Excursion5 = React.lazy(() => import("./pages/Excursions-pages/Excursion5"));
const Excursion6 = React.lazy(() => import("./pages/Excursions-pages/Excursion6"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.TOURS} element={<Tours />} />
            <Route path={ROUTES.EXCURSION} element={<Excursion />} />
            <Route path={ROUTES.TOUR_1} element={<Tour1 />} />
            <Route path={ROUTES.TOUR_2} element={<Tour2 />} />
            <Route path={ROUTES.TOUR_3} element={<Tour3 />} />
            <Route path={ROUTES.TOUR_4} element={<Tour4 />} />
            <Route path={ROUTES.TOUR_5} element={<Tour5 />} />
            <Route path={ROUTES.TOUR_6} element={<Tour6 />} />
            <Route path={ROUTES.EXCURSION_1} element={<Excursion1 />} />
            <Route path={ROUTES.EXCURSION_2} element={<Excursion2 />} />
            <Route path={ROUTES.EXCURSION_3} element={<Excursion3 />} />
            <Route path={ROUTES.EXCURSION_4} element={<Excursion4 />} />
            <Route path={ROUTES.EXCURSION_5} element={<Excursion5 />} />
            <Route path={ROUTES.EXCURSION_6} element={<Excursion6 />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default App;
