-- AgroTech Database Schema
-- MySQL Database

CREATE DATABASE IF NOT EXISTS agrotech;
USE agrotech;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description TEXT,
    full_description LONGTEXT,
    cover_image VARCHAR(255),
    gallery_images JSON,
    min_investment DECIMAL(12, 2),
    max_investment DECIMAL(12, 2),
    expected_roi DECIMAL(5, 2),
    duration_months INT,
    features JSON,
    benefits JSON,
    terms_conditions LONGTEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(200),
    meta_description TEXT,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Service Inquiries / Join Requests
CREATE TABLE IF NOT EXISTS service_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    investment_amount DECIMAL(12, 2),
    message TEXT,
    status ENUM('pending', 'contacted', 'approved', 'rejected') DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Information
CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    about_short TEXT,
    about_full LONGTEXT,
    mission TEXT,
    vision TEXT,
    logo VARCHAR(255),
    logo_dark VARCHAR(255),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    pincode VARCHAR(10),
    phone VARCHAR(20),
    alternate_phone VARCHAR(20),
    email VARCHAR(100),
    support_email VARCHAR(100),
    website VARCHAR(200),
    facebook VARCHAR(200),
    twitter VARCHAR(200),
    instagram VARCHAR(200),
    linkedin VARCHAR(200),
    youtube VARCHAR(200),
    whatsapp VARCHAR(20),
    map_embed TEXT,
    working_hours VARCHAR(100),
    founded_year INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    bio TEXT,
    photo VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(20),
    linkedin VARCHAR(200),
    twitter VARCHAR(200),
    is_founder BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    company VARCHAR(100),
    photo VARCHAR(255),
    rating INT DEFAULT 5,
    testimonial TEXT NOT NULL,
    service_id INT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Hero Slides for Landing Page
CREATE TABLE IF NOT EXISTS hero_slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle TEXT,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    button_text VARCHAR(50),
    button_link VARCHAR(200),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Statistics/Counters
CREATE TABLE IF NOT EXISTS statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    icon VARCHAR(50),
    suffix VARCHAR(20),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Insert Default Admin User (password: admin123)
INSERT INTO admin_users (username, email, password, full_name, role) VALUES
('admin', 'admin@agrotech.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Admin', 'super_admin');

-- Insert Default Company Info
INSERT INTO company_info (company_name, tagline, about_short, mission, vision, email, phone) VALUES
('AgroTech Solutions', 'Growing Together, Harvesting Success', 
'We are a leading agro-tech company providing innovative farming solutions and investment opportunities in agriculture.',
'To revolutionize agriculture through technology and provide sustainable farming solutions.',
'To become the most trusted partner in agricultural investments and farming services.',
'info@agrotech.com', '+91 9876543210');

-- Insert Sample Statistics
INSERT INTO statistics (label, value, icon, suffix, sort_order) VALUES
('Happy Farmers', '5000', 'users', '+', 1),
('Acres Cultivated', '10000', 'landscape', '+', 2),
('Years Experience', '15', 'calendar', '+', 3),
('ROI Generated', '25', 'trending_up', '%', 4);

-- Insert Sample Categories
INSERT INTO categories (name, slug, description, icon, is_active) VALUES
('Organic Farming', 'organic-farming', 'Investment in certified organic farming with premium returns', 'eco', TRUE),
('Hydroponic Systems', 'hydroponic-systems', 'Modern hydroponic farming solutions for urban agriculture', 'water_drop', TRUE),
('Dairy Farming', 'dairy-farming', 'Integrated dairy farming with consistent monthly returns', 'pets', TRUE),
('Fruit Orchards', 'fruit-orchards', 'Long-term investment in fruit orchards with high yield', 'park', TRUE);
