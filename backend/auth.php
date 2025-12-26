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
        
        // Check if this is a login or token verification request
        if (isset($data['action'])) {
            switch ($data['action']) {
                case 'login':
                    if (!validateRequired($data, ['username', 'password'])) {
                        sendError('Username and password required');
                    }
                    
                    $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ? OR email = ?");
                    $stmt->execute([$data['username'], $data['username']]);
                    $user = $stmt->fetch();
                    
                    if ($user && password_verify($data['password'], $user['password'])) {
                        // Generate token
                        $token = bin2hex(random_bytes(32));
                        $expiry = date('Y-m-d H:i:s', strtotime('+24 hours'));
                        
                        // Store token (in production, use a separate tokens table)
                        // For simplicity, we'll return the token directly
                        
                        unset($user['password']); // Don't send password
                        
                        sendResponse([
                            'success' => true,
                            'message' => 'Login successful',
                            'user' => $user,
                            'token' => $token
                        ]);
                    } else {
                        sendError('Invalid credentials', 401);
                    }
                    break;

                case 'register':
                    // Only super_admin can register new admins
                    if (!validateRequired($data, ['username', 'email', 'password', 'full_name'])) {
                        sendError('All fields are required');
                    }
                    
                    // Check if username or email exists
                    $stmt = $conn->prepare("SELECT id FROM admin_users WHERE username = ? OR email = ?");
                    $stmt->execute([$data['username'], $data['email']]);
                    if ($stmt->fetch()) {
                        sendError('Username or email already exists');
                    }
                    
                    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                    
                    $stmt = $conn->prepare("
                        INSERT INTO admin_users (username, email, password, full_name, role)
                        VALUES (?, ?, ?, ?, ?)
                    ");
                    
                    $stmt->execute([
                        $data['username'],
                        $data['email'],
                        $hashedPassword,
                        $data['full_name'],
                        $data['role'] ?? 'admin'
                    ]);
                    
                    sendResponse([
                        'success' => true,
                        'message' => 'Admin user created successfully',
                        'id' => $conn->lastInsertId()
                    ], 201);
                    break;

                case 'change_password':
                    if (!validateRequired($data, ['user_id', 'current_password', 'new_password'])) {
                        sendError('All fields are required');
                    }
                    
                    $stmt = $conn->prepare("SELECT password FROM admin_users WHERE id = ?");
                    $stmt->execute([$data['user_id']]);
                    $user = $stmt->fetch();
                    
                    if (!$user || !password_verify($data['current_password'], $user['password'])) {
                        sendError('Current password is incorrect');
                    }
                    
                    $hashedPassword = password_hash($data['new_password'], PASSWORD_DEFAULT);
                    
                    $stmt = $conn->prepare("UPDATE admin_users SET password = ? WHERE id = ?");
                    $stmt->execute([$hashedPassword, $data['user_id']]);
                    
                    sendResponse(['success' => true, 'message' => 'Password changed successfully']);
                    break;

                default:
                    sendError('Invalid action');
            }
        } else {
            sendError('Action required');
        }
        break;

    case 'GET':
        // Get admin users (Super admin only)
        $stmt = $conn->query("SELECT id, username, email, full_name, role, avatar, created_at FROM admin_users ORDER BY created_at DESC");
        $users = $stmt->fetchAll();
        sendResponse(['success' => true, 'data' => $users]);
        break;

    case 'PUT':
        // Update admin user
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('User ID required');
        }
        
        $allowedFields = ['username', 'email', 'full_name', 'role', 'avatar'];
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
        
        $stmt = $conn->prepare("UPDATE admin_users SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'User updated successfully']);
        break;

    case 'DELETE':
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('User ID required');
        }
        
        // Prevent deleting the last super admin
        $stmt = $conn->query("SELECT COUNT(*) FROM admin_users WHERE role = 'super_admin'");
        $superAdminCount = $stmt->fetchColumn();
        
        $stmt = $conn->prepare("SELECT role FROM admin_users WHERE id = ?");
        $stmt->execute([$data['id']]);
        $user = $stmt->fetch();
        
        if ($user['role'] === 'super_admin' && $superAdminCount <= 1) {
            sendError('Cannot delete the last super admin');
        }
        
        $stmt = $conn->prepare("DELETE FROM admin_users WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'User deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
