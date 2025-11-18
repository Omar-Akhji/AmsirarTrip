/* eslint-env node */
// Node backend (Express + Nodemailer). Declares process for ESLint in browser-oriented project.
/* global process */
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Basic CORS config: allow local dev origins; adjust as needed for prod
// In production, if frontend and backend are on the same domain, you can remove CORS entirely
// If they're on different domains, replace localhost URLs with your production domain(s)
const allowedOrigins = [
    'http://localhost:5173',    // Vite dev server (remove in prod)
    'http://127.0.0.1:5173',    // Alternative localhost (remove in prod)
    'http://localhost:5174',    // Vite dev server alt port (remove in prod)
    'http://127.0.0.1:5174',    // Alternative localhost alt port (remove in prod)
    process.env.CLIENT_ORIGIN     // Production domain from environment variable
].filter(Boolean);

app.use(cors({
    origin: (origin, cb) => {
        // allow non-browser or same-origin requests
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
    },
}));
app.use(express.json());

// Healthcheck
app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
});

// Booking endpoint
app.post('/api/booking', async (req, res) => {
    try {
        const {
            reservationType,
            fullName,
            email,
            phone,
            persons,
            date,
            message,
            language,
            duration,
            recaptchaToken
        } = req.body || {};

        if (!reservationType || !fullName || !email || !phone || !persons || !date) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' });
        }

        // Verify CAPTCHA
        if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
            return res.status(400).json({ ok: false, error: 'CAPTCHA verification failed' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS, // App password
            },
        });

        const mailTo = process.env.MAIL_TO || process.env.GMAIL_USER;

        const html = `
      <h2>New Booking Request</h2>
      <p><strong>Website display language :</strong> ${escapeHtml(getLanguageName(language))}</p>
      <p><strong>Type of reservation :</strong> ${escapeHtml(cleanReservationType(reservationType))}</p>
      <p><strong>Duration :</strong> ${escapeHtml(duration ? `${duration} days` : 'Not specified')}</p>
      <p><strong>Full Name :</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Phone Number :</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
      <p><strong>Date of reservation :</strong> ${escapeHtml(date)}</p>
      <p><strong>Number of people :</strong> ${escapeHtml(String(persons))}</p>
      ${message ? `<p><strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
    `;

        const info = await transporter.sendMail({
            from: `AmsirarTrip Bookings <${process.env.GMAIL_USER}>`,
            to: mailTo,
            replyTo: email,
            subject: `Booking: ${fullName} (${reservationType})`,
            text: `Website display language : ${getLanguageName(language)}
Type of reservation : ${cleanReservationType(reservationType)}
Duration : ${duration ? `${duration} days` : 'Not specified'}
Full Name : ${fullName}
Phone Number : ${phone}
E-mail : ${email}
Date of reservation : ${date}
Number of people : ${persons}${message ? `\nMessage : ${message}` : ''}`,
            html,
        });

        return res.json({ ok: true, id: info.messageId });
    } catch (err) {
        console.error('Booking error:', err);
        return res.status(500).json({ ok: false, error: 'Failed to send message' });
    }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message, recaptchaToken } = req.body || {};

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' });
        }

        // Verify CAPTCHA
        if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
            return res.status(400).json({ ok: false, error: 'CAPTCHA verification failed' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS, // App password
            },
        });

        const mailTo = process.env.MAIL_TO || process.env.GMAIL_USER;

        const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name :</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone :</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `;

        const info = await transporter.sendMail({
            from: `AmsirarTrip Contact <${process.env.GMAIL_USER}>`,
            to: mailTo,
            replyTo: email,
            subject: `Contact from ${name}`,
            text: `Name : ${name}
E-mail : ${email}
Phone : ${phone}
Message : ${message}`,
            html,
        });

        return res.json({ ok: true, id: info.messageId });
    } catch (err) {
        console.error('Contact error:', err);
        return res.status(500).json({ ok: false, error: 'Failed to send message' });
    }
});

// Newsletter endpoint
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email, recaptchaToken } = req.body || {};

        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            return res.status(400).json({ ok: false, error: 'Valid email required' });
        }

        // Verify CAPTCHA
        if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken, process.env.RECAPTCHA_V3_SECRET_KEY))) {
            return res.status(400).json({ ok: false, error: 'CAPTCHA verification failed' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS, // App password
            },
        });

        const mailTo = process.env.MAIL_TO || process.env.GMAIL_USER;

        const html = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    `;

        const info = await transporter.sendMail({
            from: `AmsirarTrip Newsletter <${process.env.GMAIL_USER}>`,
            to: mailTo,
            replyTo: email,
            subject: `Newsletter Subscription: ${email}`,
            text: `New newsletter subscription: ${email}`,
            html,
        });

        return res.json({ ok: true, id: info.messageId });
    } catch (err) {
        console.error('Newsletter error:', err);
        return res.status(500).json({ ok: false, error: 'Failed to subscribe' });
    }
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

// small HTML escaper
function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Convert language code to full name
function getLanguageName(code = '') {
    const languages = {
        'en': 'English',
        'fr': 'Français',
        'de': 'Deutsch',
        'es': 'Español'
    };
    return languages[code] || code;
}

// Clean reservation type (remove TourX prefix)
function cleanReservationType(type = '') {
    return type.replace(/^Tour\d+\s/, '');
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token, secret = process.env.RECAPTCHA_SECRET_KEY) {
    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret,
                response: token
            }
        });
        return response.data.success;
    } catch (error) {
        console.error('CAPTCHA verification error:', error);
        return false;
    }
}
