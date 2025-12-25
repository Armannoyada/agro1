<?php
require_once 'config/database.php';

$conn = getDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get team members
        $stmt = $conn->query("SELECT * FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC");
        $team = $stmt->fetchAll();
        sendResponse(['success' => true, 'data' => $team]);
        break;

    case 'POST':
        // Add team member (Admin only)
        $data = getRequestBody();
        
        if (!validateRequired($data, ['name', 'designation'])) {
            sendError('Name and designation required');
        }
        
        $stmt = $conn->prepare("
            INSERT INTO team_members (name, designation, bio, photo, email, phone, linkedin, twitter, is_founder, sort_order, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['name'],
            $data['designation'],
            $data['bio'] ?? null,
            $data['photo'] ?? null,
            $data['email'] ?? null,
            $data['phone'] ?? null,
            $data['linkedin'] ?? null,
            $data['twitter'] ?? null,
            $data['is_founder'] ?? 0,
            $data['sort_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Team member added successfully',
            'id' => $conn->lastInsertId()
        ], 201);
        break;

    case 'PUT':
        // Update team member (Admin only)
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Team member ID required');
        }
        
        $allowedFields = ['name', 'designation', 'bio', 'photo', 'email', 'phone', 'linkedin', 'twitter', 'is_founder', 'sort_order', 'is_active'];
        
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
        
        $stmt = $conn->prepare("UPDATE team_members SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Team member updated successfully']);
        break;

    case 'DELETE':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Team member ID required');
        }
        
        $stmt = $conn->prepare("DELETE FROM team_members WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Team member deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
