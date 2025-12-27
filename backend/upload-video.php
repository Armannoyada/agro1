<?php
// Video Upload Handler for Blog Posts
// Maximum video size: 50MB

// Set CORS headers before any output
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$uploadDir = __DIR__ . '/uploads/videos/';
$allowedTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime', // .mov
    'video/x-msvideo', // .avi
];
$maxFileSize = 50 * 1024 * 1024; // 50MB max for videos

// Create upload directory if not exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Check if file was uploaded
if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    header('Content-Type: application/json');
    $errorMessage = 'No video uploaded';
    if (isset($_FILES['video']['error'])) {
        switch ($_FILES['video']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errorMessage = 'Video file too large. Maximum allowed size is 50MB';
                break;
            case UPLOAD_ERR_NO_FILE:
                $errorMessage = 'No video file selected';
                break;
            case UPLOAD_ERR_PARTIAL:
                $errorMessage = 'Video upload was interrupted';
                break;
            default:
                $errorMessage = 'Video upload failed. Error code: ' . $_FILES['video']['error'];
        }
    }
    echo json_encode(['error' => $errorMessage]);
    exit();
}

$file = $_FILES['video'];

// Validate file type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Invalid video format. Allowed formats: MP4, WebM, OGG, MOV, AVI',
        'detected_type' => $mimeType
    ]);
    exit();
}

// Validate file size
if ($file['size'] > $maxFileSize) {
    http_response_code(400);
    header('Content-Type: application/json');
    $sizeMB = round($file['size'] / (1024 * 1024), 2);
    echo json_encode([
        'error' => "Video too large ({$sizeMB}MB). Maximum allowed size is 50MB"
    ]);
    exit();
}

// Generate unique filename
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!$extension || !in_array($extension, ['mp4', 'webm', 'ogg', 'mov', 'avi'])) {
    $extension = 'mp4'; // Default extension
}
$filename = 'video_' . time() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
$targetPath = $uploadDir . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Return relative path for database storage
    $relativePath = 'uploads/videos/' . $filename;

    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'message' => 'Video uploaded successfully',
        'path' => $relativePath,
        'url' => 'http://localhost/Agro/agro1/backend/' . $relativePath,
        'size' => round($file['size'] / (1024 * 1024), 2) . ' MB',
        'type' => $mimeType
    ]);
} else {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Failed to save video file']);
}
