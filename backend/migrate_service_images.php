<?php
require_once 'config/database.php';

$conn = getDBConnection();

// Add header_image column if it doesn't exist
try {
    $stmt = $conn->query("SHOW COLUMNS FROM services LIKE 'header_image'");
    if ($stmt->rowCount() == 0) {
        $conn->exec("ALTER TABLE services ADD COLUMN header_image VARCHAR(255) DEFAULT NULL AFTER thumbnail_image");
        echo "Added header_image column.\n";
    } else {
        echo "header_image column already exists.\n";
    }
} catch (PDOException $e) {
    echo "Error checking/adding header_image: " . $e->getMessage() . "\n";
}

// Add gallery_images column if it doesn't exist
try {
    $stmt = $conn->query("SHOW COLUMNS FROM services LIKE 'gallery_images'");
    if ($stmt->rowCount() == 0) {
        $conn->exec("ALTER TABLE services ADD COLUMN gallery_images TEXT DEFAULT NULL AFTER header_image");
        echo "Added gallery_images column.\n";
    } else {
        echo "gallery_images column already exists.\n";
    }
} catch (PDOException $e) {
    echo "Error checking/adding gallery_images: " . $e->getMessage() . "\n";
}

echo "Migration completed.\n";
?>