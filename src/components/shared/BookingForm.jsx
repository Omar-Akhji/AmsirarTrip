import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { format as formatDate } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { TOURS_DATA } from '../../constants/toursData';

const BookingForm = ({ tourTitle, tourId, excursionTitle, excursionId }) => {
    const { t, i18n } = useTranslation();
    const recaptchaRef = useRef(null);
    const [formData, setFormData] = useState({
        selectedTour: tourTitle && tourId ? `${tourTitle} - Duration: ${TOURS_DATA.find(t => t.id === tourId)?.duration || ''} Days` : (tourTitle || excursionTitle || ''),
        fullName: '',
        email: '',
        phone: '',
        numberOfPeople: '',
        reservationDate: null,
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [buttonText, setButtonText] = useState('booking.checkAvailability');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        // Validate CAPTCHA
        const recaptchaToken = recaptchaRef.current?.getValue();
        if (!recaptchaToken) {
            alert('Please complete the CAPTCHA verification.');
            return;
        }

        try {
            setSubmitting(true);

            const persons = Number(formData.numberOfPeople || 0);
            const dateStr = formData.reservationDate
                ? formatDate(formData.reservationDate, 'yyyy-MM-dd')
                : '';

            const reservationTypeValue = formData.selectedTour
                ? `${tourId ? `Tour${tourId} ` : excursionId ? `Excursion${excursionId} ` : ''}${formData.selectedTour}`
                : 'General';

            const tourDuration = tourId ? TOURS_DATA.find(t => t.id === tourId)?.duration : null;

            const payload = {
                reservationType: reservationTypeValue,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                persons: persons > 0 ? persons : 1,
                date: dateStr,
                message: formData.message,
                language: i18n.language,
                duration: tourDuration,
                recaptchaToken
            };

            const base = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3001';
            const res = await fetch(`${base}/api/booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) {
                alert('Sorry, we could not send your booking. Please try again later.');
            } else {
                setButtonText('Your booking request has been sent');
                setTimeout(() => {
                    setButtonText('booking.checkAvailability');
                }, 4000);
                // optional: reset minimal fields
                setFormData((prev) => ({
                    ...prev,
                    fullName: '',
                    email: '',
                    phone: '',
                    numberOfPeople: '',
                    reservationDate: null,
                    message: ''
                }));
                // Reset CAPTCHA
                recaptchaRef.current?.reset();
            }
        } catch {
            alert('Network error sending booking. Please check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="booking" className="section">
            <main className="section-center">
                <article className="container">
                    <div className="row">
                        <section className="booking-form">
                            <section className="booking-bg">
                                <div className="form-header">
                                    <h2>{t('booking.makeReservation', 'Make your reservation')}</h2>
                                    <p>{t('booking.description', 'Book your perfect Morocco adventure with us')}</p>
                                </div>
                            </section>
                            <form onSubmit={handleSubmit}>
                                {(tourTitle && tourId) && (
                                    <div className="form-group">
                                        <input
                                            className="form-control selected-tour"
                                            type="text"
                                            name="selectedTour"
                                            placeholder={t('booking.selectedTour', 'Selected Tour')}
                                            value={`${tourTitle} - Duration: ${TOURS_DATA.find(t => t.id === tourId)?.duration || ''} Days`}
                                            readOnly
                                        />
                                    </div>
                                )}
                                {(excursionTitle && excursionId) && (
                                    <div className="form-group">
                                        <input
                                            className="form-control selected-tour"
                                            type="text"
                                            name="selectedTour"
                                            placeholder={t('booking.selectedExcursion', 'Selected Excursion')}
                                            value={excursionTitle}
                                            readOnly
                                        />
                                    </div>
                                )}
                                <div className="form-row">
                                    <div className="form-group-half">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="fullName"
                                                placeholder={t('booking.fullName', 'Full Name')}
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                autoComplete="name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group-half">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="tel"
                                                name="phone"
                                                placeholder={t('booking.phone', 'Phone Number')}
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                autoComplete="tel"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder={t('booking.email', 'Email')}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group-half">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="numberOfPeople"
                                                placeholder={t('booking.numberOfPeople', 'Number of People')}
                                                value={formData.numberOfPeople}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                min="1"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group-half">
                                        <div className="form-group">
                                            <DatePicker
                                                name="reservationDate"
                                                selected={formData.reservationDate}
                                                onChange={(date) => setFormData(prev => ({ ...prev, reservationDate: date }))}
                                                placeholderText={t('booking.reservationDate')}
                                                className="form-control"
                                                dateFormat="yyyy-MM-dd"
                                                minDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
                                                portalId="root"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        placeholder={t('booking.message', 'Your message')}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        rows="4"
                                    />
                                </div>
                                <div className="form-group">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                        onChange={(token) => setFormData(prev => ({ ...prev, recaptchaToken: token }))}
                                    />
                                </div>
                                <div className="form-btn">
                                    <button className="submit-btn" type="submit" disabled={submitting}>
                                        {buttonText === 'booking.checkAvailability' ? t(buttonText, 'Reserve Now') : buttonText}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </article>
            </main>
        </section>
    );
};

export default BookingForm;