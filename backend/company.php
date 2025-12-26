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
        // Get company info
        $stmt = $conn->query("SELECT * FROM company_info LIMIT 1");
        $company = $stmt->fetch();
        
        if ($company) {
            sendResponse(['success' => true, 'data' => $company]);
        } else {
            sendError('Company info not found', 404);
        }
        break;

    case 'PUT':
        // Update company info (Admin only)
        $data = getRequestBody();
        
        $allowedFields = [
            'company_name', 'tagline', 'about_short', 'about_full',
            'mission', 'vision', 'logo', 'logo_dark', 'address',
            'city', 'state', 'country', 'pincode', 'phone',
            'alternate_phone', 'email', 'support_email', 'website',
            'facebook', 'twitter', 'instagram', 'linkedin', 'youtube',
            'whatsapp', 'map_embed', 'working_hours', 'founded_year'
        ];
        
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
        
        $stmt = $conn->prepare("UPDATE company_info SET " . implode(', ', $updates) . " WHERE id = 1");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Company info updated successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
