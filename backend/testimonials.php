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
        $stmt = $conn->query("SELECT * FROM testimonials WHERE is_active = 1 ORDER BY is_featured DESC, created_at DESC");
        $testimonials = $stmt->fetchAll();
        sendResponse(['success' => true, 'data' => $testimonials]);
        break;

    case 'POST':
        $data = getRequestBody();
        
        if (!validateRequired($data, ['name', 'testimonial'])) {
            sendError('Name and testimonial required');
        }
        
        $stmt = $conn->prepare("
            INSERT INTO testimonials (name, designation, company, photo, rating, testimonial, service_id, is_featured, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['name'],
            $data['designation'] ?? null,
            $data['company'] ?? null,
            $data['photo'] ?? null,
            $data['rating'] ?? 5,
            $data['testimonial'],
            $data['service_id'] ?? null,
            $data['is_featured'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Testimonial added successfully',
            'id' => $conn->lastInsertId()
        ], 201);
        break;

    case 'PUT':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Testimonial ID required');
        }
        
        $allowedFields = ['name', 'designation', 'company', 'photo', 'rating', 'testimonial', 'service_id', 'is_featured', 'is_active'];
        $updates = [];
        $params = [];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updates[] = "$field = ?";
                $params[] = $data[$field];
            }
        }
        
        if (empty($updates)) {
            sendError('No fields to update');
        }
        
        $params[] = $data['id'];
        
        $stmt = $conn->prepare("UPDATE testimonials SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Testimonial updated successfully']);
        break;

    case 'DELETE':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Testimonial ID required');
        }
        
        $stmt = $conn->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Testimonial deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
