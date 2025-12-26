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
        // Get all inquiries (Admin only)
        getInquiries($conn);
        break;

    case 'POST':
        // Submit new inquiry
        createInquiry($conn);
        break;

    case 'PUT':
        // Update inquiry status (Admin only)
        updateInquiry($conn);
        break;

    case 'DELETE':
        // Delete inquiry (Admin only)
        deleteInquiry($conn);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

/**
 * Get all inquiries (Admin)
 */
function getInquiries($conn)
{
    $status = $_GET['status'] ?? 'all';
    $serviceId = $_GET['service_id'] ?? null;

    $sql = "SELECT * FROM service_inquiries";
    $params = [];
    $conditions = [];

    if ($status !== 'all') {
        $conditions[] = "status = ?";
        $params[] = $status;
    }

    if ($serviceId) {
        $conditions[] = "service_id = ?";
        $params[] = $serviceId;
    }

    if (!empty($conditions)) {
        $sql .= " WHERE " . implode(' AND ', $conditions);
    }

    $sql .= " ORDER BY created_at DESC";

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $inquiries = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $inquiries]);
}

/**
 * Create new inquiry
 */
function createInquiry($conn)
{
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit();
    }

    // Validate required fields
    $required = ['name', 'email', 'phone'];
    $missing = [];

    foreach ($required as $field) {
        if (empty($data[$field])) {
            $missing[] = $field;
        }
    }

    if (!empty($missing)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: ' . implode(', ', $missing)]);
        exit();
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit();
    }

    // Validate phone (basic check)
    $phone = preg_replace('/[^0-9+]/', '', $data['phone']);
    if (strlen($phone) < 10) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid phone number']);
        exit();
    }

    // Sanitize input
    $serviceId = isset($data['service_id']) ? intval($data['service_id']) : null;
    $serviceTitle = isset($data['service_title']) ? htmlspecialchars(strip_tags($data['service_title']), ENT_QUOTES, 'UTF-8') : null;
    $name = htmlspecialchars(strip_tags($data['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $investmentAmount = isset($data['investment_amount']) && is_numeric($data['investment_amount'])
        ? intval($data['investment_amount'])
        : null;

    // Insert into database
    try {
        $stmt = $conn->prepare("
            INSERT INTO service_inquiries (
                service_id, service_title, name, email, phone, investment_amount, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");

        $stmt->execute([
            $serviceId,
            $serviceTitle,
            $name,
            $email,
            $phone,
            $investmentAmount
        ]);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Inquiry submitted successfully. Our team will contact you within 24 hours.'
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to submit inquiry. Please try again.']);
    }
}

/**
 * Update inquiry (Admin)
 */
function updateInquiry($conn)
{
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Inquiry ID required']);
        exit();
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
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        exit();
    }

    $params[] = $data['id'];

    $stmt = $conn->prepare("UPDATE service_inquiries SET " . implode(', ', $updates) . " WHERE id = ?");
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Inquiry updated successfully']);
}

/**
 * Delete inquiry (Admin)
 */
function deleteInquiry($conn)
{
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Inquiry ID required']);
        exit();
    }

    $stmt = $conn->prepare("DELETE FROM service_inquiries WHERE id = ?");
    $stmt->execute([$data['id']]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Inquiry deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Inquiry not found']);
    }
}
