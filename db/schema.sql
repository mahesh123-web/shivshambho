-- Ceramic Coating Studio Database Schema (PostgreSQL / Supabase)

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(50),
    features JSON,
    is_popular BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services / Process Steps
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    step_number INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings (appointment requests)
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    preferred_date DATE,
    package_id INT,
    vehicle_type VARCHAR(50),
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data: Packages
INSERT INTO packages (name, tagline, price, duration, features, is_popular, sort_order) VALUES
(
    'Two Wheelers',
    'Perfect for Two Wheelers',
    4500,
    '15-Year',
    '["9H Ceramic", "10H Ceramic", "Graphene Ceramic", "Koch Ceramic", "Kovalent Ceramic"]',
    FALSE,
    1
),
(
    'Four Wheelers',
    'Perfect for Four Wheelers',
    15000,
    '15-Year',
    '["10H Ceramic", "Graphene Ceramic", "Koch Ceramic", "Kovalent Ceramic"]',
    FALSE,
    2
),
(
    'Tractors',
    'Perfect for Tractors',
    6500,
    '15-Year',
    '["Rubbingc", "Polishing", "Ceramic Coating"]',
    FALSE,
    3
);

-- Seed data: Process Steps
INSERT INTO services (step_number, title, description, icon, sort_order) VALUES
(1, 'Deep Clean', 'Snow foam bath, iron removal, and clay bar treatment to strip contaminants.', 'clean', 1),
(2, 'Paint Correction', 'Machine polishing to remove swirls and scratches for a flawless surface.', 'polish', 2),
(3, 'Coating Application', 'Precise, section-by-section application of the ceramic liquid polymer.', 'coating', 3),
(4, 'Curing', 'Infrared lamp curing process to ensure a permanent bond with the paint.', 'curing', 4);
