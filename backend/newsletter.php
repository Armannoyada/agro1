<?php
// Set CORS headers before any output
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';

$conn = getDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $data = getRequestBody();
        
        if (!isset($data['email']) || empty($data['email'])) {
            sendError('Email is required');
        }
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            sendError('Invalid email address');
        }
        
        // Check if already subscribed
        $stmt = $conn->prepare("SELECT id, is_active FROM newsletter_subscribers WHERE email = ?");
        $stmt->execute([$data['email']]);
        $existing = $stmt->fetch();
        
        if ($existing) {
            if ($existing['is_active']) {
                sendResponse(['success' => true, 'message' => 'You are already subscribed!']);
            } else {
                // Reactivate subscription
                $stmt = $conn->prepare("UPDATE newsletter_subscribers SET is_active = 1, unsubscribed_at = NULL WHERE id = ?");
                $stmt->execute([$existing['id']]);
                sendResponse(['success' => true, 'message' => 'Welcome back! Your subscription has been reactivated.']);
            }
        } else {
            $stmt = $conn->prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)");
            $stmt->execute([$data['email']]);
            sendResponse(['success' => true, 'message' => 'Thank you for subscribing!'], 201);
        }
        break;

    case 'DELETE':
        // Unsubscribe
        $data = getRequestBody();
        
        if (!isset($data['email'])) {
            sendError('Email is required');
        }
        
        $stmt = $conn->prepare("UPDATE newsletter_subscribers SET is_active = 0, unsubscribed_at = NOW() WHERE email = ?");
        $stmt->execute([$data['email']]);
        
        sendResponse(['success' => true, 'message' => 'You have been unsubscribed successfully']);
        break;

    case 'GET':
        // Get subscribers (Admin only)
        $stmt = $conn->query("SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC");
        $subscribers = $stmt->fetchAll();
        sendResponse(['success' => true, 'data' => $subscribers]);
        break;

    default:
        sendError('Method not allowed', 405);
}
