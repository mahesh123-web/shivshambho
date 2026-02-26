const db = require('../config/db');

// Create a booking
exports.createBooking = async (req, res) => {
    try {
        const { customer_name, email, phone, preferred_date, package_id, message } = req.body;

        // Basic validation
        if (!customer_name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and phone are required.'
            });
        }

        const result = await db.query(
            'INSERT INTO bookings (customer_name, email, phone, preferred_date, package_id, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [customer_name, email, phone, preferred_date || null, package_id || null, message || null]
        );

        res.status(201).json({
            success: true,
            message: 'Appointment request submitted successfully! We will contact you shortly.',
            bookingId: result.rows[0].id
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit booking. Please try again or call us directly.'
        });
    }
};

// Submit a contact form
exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required.'
            });
        }

        const result = await db.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, subject || null, message]
        );

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
            contactId: result.rows[0].id
        });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
};
