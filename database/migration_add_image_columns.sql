-- Database migration for enhanced service features
-- Run this in phpMyAdmin or MySQL CLI

-- IMPORTANT: The services table needs these columns for the admin panel to work properly

-- Check if thumbnail_image column exists, add if not
-- ALTER TABLE services ADD COLUMN IF NOT EXISTS thumbnail_image VARCHAR(255) AFTER image;

-- Check if header_image column exists, add if not  
-- ALTER TABLE services ADD COLUMN IF NOT EXISTS header_image VARCHAR(255) AFTER thumbnail_image;

-- For MySQL versions that don't support "IF NOT EXISTS" for columns, use these instead:
-- First check if columns exist, then run as needed:

-- Add thumbnail_image column (run only if it doesn't exist)
-- ALTER TABLE services ADD COLUMN thumbnail_image VARCHAR(255) AFTER image;

-- Add header_image column (run only if it doesn't exist)
-- ALTER TABLE services ADD COLUMN header_image VARCHAR(255) AFTER thumbnail_image;

-- Migrate existing image data to thumbnail_image (optional - only if you have legacy image data)
-- UPDATE services SET thumbnail_image = image WHERE image IS NOT NULL AND (thumbnail_image IS NULL OR thumbnail_image = '');

-- Note: The gallery_images column should already exist as LONGTEXT type
-- If not, add it with:
-- ALTER TABLE services ADD COLUMN gallery_images LONGTEXT;

-- =============================================
-- MIGRATION COMPLETED SUCCESSFULLY ON 2025-12-27
-- Added thumbnail_image and header_image columns
-- =============================================
