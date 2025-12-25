<?php
require_once 'config/database.php';

$conn = getDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get service inquiries (Admin only)
        $status = $_GET['status'] ?? 'all';
        $serviceId = $_GET['service_id'] ?? null;
        
        $sql = "SELECT si.*, s.title as service_title FROM service_inquiries si 
                LEFT JOIN services s ON si.service_id = s.id";
        $params = [];
        $conditions = [];
        
        if ($status !== 'all') {
            $conditions[] = "si.status = ?";
            $params[] = $status;
        }
        
        if ($serviceId) {
            $conditions[] = "si.service_id = ?";
            $params[] = $serviceId;
        }
        
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(' AND ', $conditions);
        }
        
        $sql .= " ORDER BY si.created_at DESC";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        $inquiries = $stmt->fetchAll();
        
        sendResponse(['success' => true, 'data' => $inquiries]);
        break;

    case 'POST':
        // Submit service inquiry
        $data = getRequestBody();
        
        if (!validateRequired($data, ['full_name', 'email', 'phone'])) {
            sendError('Name, email and phone are required');
        }
        
        // Validate email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            sendError('Invalid email address');
        }
        
        $stmt = $conn->prepare("
            INSERT INTO service_inquiries (
                service_id, full_name, email, phone, address, city, state,
                investment_amount, message, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        ");
        
        $stmt->execute([
            $data['service_id'] ?? null,
            $data['full_name'],
            $data['email'],
            $data['phone'],
            $data['address'] ?? null,
            $data['city'] ?? null,
            $data['state'] ?? null,
            $data['investment_amount'] ?? null,
            $data['message'] ?? null
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Your application has been submitted successfully! Our team will contact you within 24 hours.',
            'id' => $conn->lastInsertId()
        ], 201);
        break;

    case 'PUT':
        // Update inquiry status (Admin only)
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Inquiry ID required');
        }
        
        $allowedFields = ['status', 'admin_notes'];
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
        
        $stmt = $conn->prepare("UPDATE service_inquiries SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Inquiry updated successfully']);
        break;

    case 'DELETE':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Inquiry ID required');
        }
        
        $stmt = $conn->prepare("DELETE FROM service_inquiries WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Inquiry deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
