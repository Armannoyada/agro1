-- Blogs Table for AgroTech
-- Run this in phpMyAdmin or MySQL CLI

CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(255),
    video_url VARCHAR(500),
    video_file VARCHAR(255),
    author VARCHAR(100) DEFAULT 'Admin',
    category VARCHAR(100),
    tags VARCHAR(255),
    status TINYINT(1) DEFAULT 1 COMMENT '1=active, 0=inactive',
    featured TINYINT(1) DEFAULT 0 COMMENT '1=featured, 0=normal',
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_featured ON blogs(featured);
CREATE INDEX idx_blogs_created ON blogs(created_at);
