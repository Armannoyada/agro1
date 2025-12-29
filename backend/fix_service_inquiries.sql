-- Safe fix for service_inquiries table - PRESERVES EXISTING DATA
-- Run these commands ONE BY ONE in phpMyAdmin

-- 1. Add service_title column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS service_title VARCHAR(255) NULL;

-- 2. Add name column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS name VARCHAR(255) NULL;

-- 3. Add email column if missing  
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS email VARCHAR(255) NULL;

-- 4. Add phone column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS phone VARCHAR(20) NULL;

-- 5. Add investment_amount column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS investment_amount VARCHAR(50) NULL;

-- 6. Add status column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';

-- 7. Add admin_notes column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS admin_notes TEXT NULL;

-- 8. Add created_at column if missing
ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS created_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Verify structure
DESCRIBE service_inquiries;
