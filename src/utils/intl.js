// src/utils/intl.js
// Intl-based formatting utilities for dates and numbers, respecting current locale

export const formatDate = (date, options = {}) => {
    const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat(i18n.language, { ...defaultOptions, ...options }).format(new Date(date));
};

export const formatNumber = (number, options = {}) => {
    const defaultOptions = { minimumFractionDigits: 0, maximumFractionDigits: 2 };
    return new Intl.NumberFormat(i18n.language, { ...defaultOptions, ...options }).format(number);
};

export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency,
    }).format(amount);
};

// Import i18n to access current language
import i18n from '../i18n';