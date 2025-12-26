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
    case 'GET':
        // Get contact submissions (Admin only)
        $status = $_GET['status'] ?? 'all';
        
        if ($status === 'unread') {
            $stmt = $conn->query("SELECT * FROM contact_submissions WHERE is_read = 0 ORDER BY created_at DESC");
        } else {
            $stmt = $conn->query("SELECT * FROM contact_submissions ORDER BY created_at DESC");
        }
        
        $submissions = $stmt->fetchAll();
        sendResponse(['success' => true, 'data' => $submissions]);
        break;

    case 'POST':
        // Submit contact form
        $data = getRequestBody();
        
        if (!validateRequired($data, ['name', 'email', 'message'])) {
            sendError('Name, email and message are required');
        }
        
        // Validate email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            sendError('Invalid email address');
        }
        
        $stmt = $conn->prepare("
            INSERT INTO contact_submissions (name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['subject'] ?? null,
            $data['message']
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Thank you for contacting us! We will get back to you soon.'
        ], 201);
        break;

    case 'PUT':
        // Mark as read (Admin only)
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Submission ID required');
        }
        
        $stmt = $conn->prepare("UPDATE contact_submissions SET is_read = 1 WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Marked as read']);
        break;

    case 'DELETE':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Submission ID required');
        }
        
        $stmt = $conn->prepare("DELETE FROM contact_submissions WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Submission deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
