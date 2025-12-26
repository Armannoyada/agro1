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
        $stmt = $conn->query("SELECT * FROM statistics WHERE is_active = 1 ORDER BY sort_order ASC");
        $stats = $stmt->fetchAll();
        sendResponse(['success' => true, 'data' => $stats]);
        break;

    case 'POST':
        $data = getRequestBody();
        
        if (!validateRequired($data, ['label', 'value'])) {
            sendError('Label and value required');
        }
        
        $stmt = $conn->prepare("
            INSERT INTO statistics (label, value, icon, suffix, sort_order, is_active)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['label'],
            $data['value'],
            $data['icon'] ?? null,
            $data['suffix'] ?? null,
            $data['sort_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Statistic added successfully',
            'id' => $conn->lastInsertId()
        ], 201);
        break;

    case 'PUT':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Statistic ID required');
        }
        
        $allowedFields = ['label', 'value', 'icon', 'suffix', 'sort_order', 'is_active'];
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
        
        $stmt = $conn->prepare("UPDATE statistics SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Statistic updated successfully']);
        break;

    case 'DELETE':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Statistic ID required');
        }
        
        $stmt = $conn->prepare("DELETE FROM statistics WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Statistic deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
