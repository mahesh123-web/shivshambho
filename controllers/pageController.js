const db = require('../config/db');

// Home page
exports.getHome = async (req, res) => {
    try {
        const [packages] = await db.query('SELECT * FROM packages ORDER BY sort_order');
        const [services] = await db.query('SELECT * FROM services ORDER BY sort_order');

        // Parse JSON features
        packages.forEach(pkg => {
            if (typeof pkg.features === 'string') {
                pkg.features = JSON.parse(pkg.features);
            }
        });

        res.render('index', {
            title: 'Ceramic Coating Studio | Premium Auto Protection',
            packages,
            services
        });
    } catch (error) {
        console.error('Home page error:', error);
        // Render with fallback data if DB is unavailable
        res.render('index', {
            title: 'Ceramic Coating Studio | Premium Auto Protection',
            packages: getDefaultPackages(),
            services: getDefaultServices()
        });
    }
};

// Packages page
exports.getPackages = async (req, res) => {
    try {
        const [packages] = await db.query('SELECT * FROM packages ORDER BY sort_order');
        packages.forEach(pkg => {
            if (typeof pkg.features === 'string') {
                pkg.features = JSON.parse(pkg.features);
            }
        });
        res.render('packages', {
            title: 'Protection Packages | Ceramic Coating Studio',
            packages
        });
    } catch (error) {
        console.error('Packages page error:', error);
        res.render('packages', {
            title: 'Protection Packages | Ceramic Coating Studio',
            packages: getDefaultPackages()
        });
    }
};

// Booking page
exports.getBooking = async (req, res) => {
    try {
        const [packages] = await db.query('SELECT id, name, price FROM packages ORDER BY sort_order');
        res.render('booking', {
            title: 'Book an Appointment | Ceramic Coating Studio',
            packages
        });
    } catch (error) {
        console.error('Booking page error:', error);
        res.render('booking', {
            title: 'Book an Appointment | Ceramic Coating Studio',
            packages: getDefaultPackages()
        });
    }
};

// Contact page
exports.getContact = (req, res) => {
    res.render('contact', {
        title: 'Contact Us | Ceramic Coating Studio'
    });
};

// Fallback data when DB is unavailable
function getDefaultPackages() {
    return [
        {
            id: 1, name: 'Essential', tagline: 'Perfect for daily drivers',
            price: 599, duration: '2-Year', is_popular: false,
            features: ['1 Layer of Nano Coating', 'Paint Decontamination', 'High Gloss Finish', 'Glass & Wheel Coating']
        },
        {
            id: 2, name: 'Professional', tagline: 'Enhanced durability and shine',
            price: 999, duration: '5-Year', is_popular: true,
            features: ['2 Layers of Ceramic', 'Stage 1 Paint Correction', 'Hydrophobic Top Coat', 'Glass Protection']
        },
        {
            id: 3, name: 'Signature', tagline: 'Ultimate protection for life',
            price: 1499, duration: 'Lifetime', is_popular: false,
            features: ['3 Layers of 9H Ceramic', 'Full Paint Correction', 'Wheel & Caliper Coating', 'Interior Leather Protection']
        }
    ];
}

function getDefaultServices() {
    return [
        { step_number: 1, title: 'Deep Clean', description: 'Snow foam bath, iron removal, and clay bar treatment to strip contaminants.', icon: 'clean' },
        { step_number: 2, title: 'Paint Correction', description: 'Machine polishing to remove swirls and scratches for a flawless surface.', icon: 'polish' },
        { step_number: 3, title: 'Coating Application', description: 'Precise, section-by-section application of the ceramic liquid polymer.', icon: 'coating' },
        { step_number: 4, title: 'Curing', description: 'Infrared lamp curing process to ensure a permanent bond with the paint.', icon: 'curing' }
    ];
}
