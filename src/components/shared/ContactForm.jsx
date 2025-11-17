import React, { useState, useRef } from 'react';
import './ContactForm.css';
import ReCAPTCHA from 'react-google-recaptcha';

// Lightweight, accessible contact form modeled after contact-form-02 aesthetic.
// Uses controlled inputs and simple front-end validation. No external libraries.
const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState({ state: 'idle', message: '' });
    const recaptchaRef = useRef(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.name.trim()) return 'Name is required';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Valid email required';
        if (!form.phone.trim()) return 'Phone is required';
        if (form.message.trim().length < 10) return 'Message should be at least 10 characters';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ state: 'submitting', message: '' });

        // Validate CAPTCHA
        const recaptchaToken = recaptchaRef.current?.getValue();
        if (!recaptchaToken) {
            setStatus({ state: 'error', message: 'Please complete the CAPTCHA verification.' });
            return;
        }

        const error = validate();
        if (error) {
            setStatus({ state: 'error', message: error });
            return;
        }
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, recaptchaToken }),
            });
            const data = await response.json();
            if (data.ok) {
                setStatus({ state: 'success', message: 'Message sent successfully. We will reply in less than 24 hours.' });
                setForm({ name: '', email: '', phone: '', message: '' });
                recaptchaRef.current?.reset();
            } else {
                setStatus({ state: 'error', message: data.error || 'Failed to send message' });
            }
        } catch {
            setStatus({ state: 'error', message: 'Failed to send message' });
        }
        setTimeout(() => setStatus({ state: 'idle', message: '' }), 5000);
    };

    return (
        <section className="cf2-section" aria-labelledby="contactFormTitle">
            <div className="cf2-container">
                <div className="cf2-grid">
                    <div className="cf2-pane cf2-pane-form">
                        <div className="cf2-header">
                            <h2 id="contactFormTitle" className="cf2-title">Contact Us</h2>
                            <p className="cf2-subtitle">We'd love to hear from you. Fill the form and we'll be in touch.</p>
                        </div>
                        {status.message && (
                            <div
                                id="cf2-status"
                                className={`cf2-alert cf2-${status.state}`}
                                role={status.state === 'error' ? 'alert' : 'status'}
                                aria-live="polite"
                            >
                                {status.message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} noValidate className="cf2-form">
                            <div className="cf2-row">
                                <div className="cf2-field">
                                    <input
                                        id="cf2-name"
                                        name="name"
                                        type="text"
                                        className="cf2-input"
                                        placeholder="Name"
                                        value={form.name}
                                        onChange={onChange}
                                        autoComplete="name"
                                        required
                                        aria-invalid={status.state === 'error'}
                                        aria-describedby={status.state === 'error' ? 'cf2-status' : undefined}
                                    />
                                </div>
                                <div className="cf2-field">
                                    <input
                                        id="cf2-email"
                                        name="email"
                                        type="email"
                                        className="cf2-input"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={onChange}
                                        autoComplete="email"
                                        required
                                        aria-invalid={status.state === 'error'}
                                        aria-describedby={status.state === 'error' ? 'cf2-status' : undefined}
                                    />
                                </div>
                            </div>
                            <div className="cf2-row">
                                <div className="cf2-field cf2-full">
                                    <input
                                        id="cf2-phone"
                                        name="phone"
                                        type="tel"
                                        className="cf2-input"
                                        placeholder="Phone Number"
                                        value={form.phone}
                                        onChange={onChange}
                                        autoComplete="tel"
                                        required
                                        aria-invalid={status.state === 'error'}
                                        aria-describedby={status.state === 'error' ? 'cf2-status' : undefined}
                                    />
                                </div>
                            </div>
                            <div className="cf2-row">
                                <div className="cf2-field cf2-full">
                                    <textarea
                                        id="cf2-message"
                                        name="message"
                                        className="cf2-textarea"
                                        placeholder="Message"
                                        rows={6}
                                        value={form.message}
                                        onChange={onChange}
                                        autoComplete="off"
                                        required
                                        aria-invalid={status.state === 'error'}
                                        aria-describedby={status.state === 'error' ? 'cf2-status' : undefined}
                                    />
                                </div>
                            </div>
                            <div className="cf2-actions">
                                <div style={{ marginBottom: '1rem' }}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="cf2-btn"
                                    disabled={status.state === 'submitting'}
                                >
                                    {status.state === 'submitting' ? 'Sending…' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="cf2-pane cf2-pane-info">
                        <div className="cf2-info-block">
                            <h3 className="cf2-info-title">Reach Us</h3>
                            <ul className="cf2-info-list" aria-label="Contact information">
                                <li className="cf2-info-item">
                                    <img src="/icons/map-point-wave-svgrepo-com.svg" alt="" className="social-icon" />
                                    <a className="cf2-info-text">Imm. J appt N° 5, Résidence La Perle de l'Atlas, angle Rue aboubakr, Marrakech</a>
                                </li>
                                <li className="cf2-info-item">
                                    <img src="/icons/smartphone-2-svgrepo-com.svg" alt="" className="social-icon" />
                                    <a className="cf2-info-link" href="tel:+21266173144">+212 (0) 6 61 17 31 44</a>
                                </li>
                                <li className="cf2-info-item">
                                    <img src="/icons/letter-svgrepo-com.svg" alt="" className="social-icon" />
                                    <a className="cf2-info-link" href="mailto:amsirare@gmail.com">amsirare@gmail.com</a>
                                </li>
                                <li className="cf2-info-item">
                                    <img src="/icons/phone-rounded.svg" alt="" className="social-icon" />
                                    <a className="cf2-info-link" href="tel:+212566173144" target="_blank" rel="noopener noreferrer">+212 (0) 5 6 61 73 14 44</a>
                                </li>
                            </ul>
                            <p className="cf2-info-text">We are here to assist you with any inquiries or bookings. Feel free to reach out!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
