-- Add missing service_title column to service_inquiries table
-- Run this in phpMyAdmin SQL tab

ALTER TABLE service_inquiries 
ADD COLUMN service_title VARCHAR(255) NULL AFTER service_id;
