/**
 * Get the month key in YYYY-MM format
 */
export function getMonthKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

/**
 * Get number of days in a month
 */
export function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Format date for display (e.g., "November 2025")
 */
export function formatMonthYear(date) {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Get the day number as a zero-padded string (01-31)
 */
export function getDayKey(dayNumber) {
    return String(dayNumber).padStart(2, '0');
}

/**
 * Navigate to next month
 */
export function getNextMonth(currentDate) {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    return next;
}

/**
 * Navigate to previous month
 */
export function getPreviousMonth(currentDate) {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    return prev;
}
