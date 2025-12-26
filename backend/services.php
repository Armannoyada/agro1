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
        // Get services
        if (isset($_GET['slug'])) {
            // Get single service by slug
            getServiceBySlug($conn, $_GET['slug']);
        } elseif (isset($_GET['featured'])) {
            // Get featured services
            getFeaturedServices($conn);
        } elseif (isset($_GET['category'])) {
            // Get services by category
            getServicesByCategory($conn, $_GET['category']);
        } elseif (isset($_GET['id'])) {
            // Get single service by ID (for admin editing)
            getServiceById($conn, $_GET['id']);
        } else {
            // Get all active services
            getAllServices($conn);
        }
        break;

    case 'POST':
        // Create new service (Admin only)
        createService($conn);
        break;

    case 'PUT':
        // Update service (Admin only)
        updateService($conn);
        break;

    case 'DELETE':
        // Delete service (Admin only)
        deleteService($conn);
        break;

    default:
        sendError('Method not allowed', 405);
}

// ========================================
// GET FUNCTIONS
// ========================================

/**
 * Get all active services (status = 1)
 */
function getAllServices($conn)
{
    $stmt = $conn->query("
        SELECT id, title, slug, description, category, roi_min, roi_max, 
               min_investment, max_investment, duration_months, 
               image, featured, status, created_at
        FROM services 
        WHERE status = 1 
        ORDER BY featured DESC, created_at DESC
    ");
    $services = $stmt->fetchAll();

    sendResponse(['success' => true, 'data' => $services]);
}

/**
 * Get single service by slug
 */
function getServiceBySlug($conn, $slug)
{
    $stmt = $conn->prepare("
        SELECT id, title, slug, description, category, roi_min, roi_max, 
               min_investment, max_investment, duration_months, 
               image, featured, status, created_at
        FROM services 
        WHERE slug = ? AND status = 1
    ");
    $stmt->execute([$slug]);
    $service = $stmt->fetch();

    if ($service) {
        sendResponse(['success' => true, 'data' => $service]);
    } else {
        sendError('Service not found', 404);
    }
}

/**
 * Get single service by ID (for admin)
 */
function getServiceById($conn, $id)
{
    $stmt = $conn->prepare("
        SELECT id, title, slug, description, category, roi_min, roi_max, 
               min_investment, max_investment, duration_months, 
               image, featured, status, created_at
        FROM services 
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $service = $stmt->fetch();

    if ($service) {
        sendResponse(['success' => true, 'data' => $service]);
    } else {
        sendError('Service not found', 404);
    }
}

/**
 * Get featured services (featured = 1, status = 1)
 */
function getFeaturedServices($conn)
{
    $stmt = $conn->query("
        SELECT id, title, slug, description, category, roi_min, roi_max, 
               min_investment, max_investment, duration_months, 
               image, featured, status, created_at
        FROM services 
        WHERE featured = 1 AND status = 1 
        ORDER BY created_at DESC
    ");
    $services = $stmt->fetchAll();

    sendResponse(['success' => true, 'data' => $services]);
}

/**
 * Get services by category
 */
function getServicesByCategory($conn, $category)
{
    $stmt = $conn->prepare("
        SELECT id, title, slug, description, category, roi_min, roi_max, 
               min_investment, max_investment, duration_months, 
               image, featured, status, created_at
        FROM services 
        WHERE category = ? AND status = 1 
        ORDER BY created_at DESC
    ");
    $stmt->execute([$category]);
    $services = $stmt->fetchAll();

    sendResponse(['success' => true, 'data' => $services]);
}

// ========================================
// CREATE FUNCTION
// ========================================

/**
 * Create new service (Admin only)
 */
function createService($conn)
{
    $data = getRequestBody();

    // Validate required fields
    $required = ['title', 'category', 'min_investment'];
    if (!validateRequired($data, $required)) {
        sendError('Missing required fields: title, category, min_investment');
    }

    // Validate min_investment is numeric
    if (!is_numeric($data['min_investment']) || $data['min_investment'] < 0) {
        sendError('min_investment must be a positive number');
    }

    // Generate slug from title if not provided
    $slug = isset($data['slug']) && !empty($data['slug'])
        ? generateSlug($data['slug'])
        : generateSlug($data['title']);

    // Check if slug already exists and make it unique
    $stmt = $conn->prepare("SELECT id FROM services WHERE slug = ?");
    $stmt->execute([$slug]);
    if ($stmt->fetch()) {
        $slug .= '-' . time();
    }

    // Prepare INSERT statement with all columns
    $stmt = $conn->prepare("
        INSERT INTO services (
            title, slug, description, category, roi_min, roi_max,
            min_investment, max_investment, duration_months, 
            image, featured, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    $stmt->execute([
        $data['title'],
        $slug,
        $data['description'] ?? null,
        $data['category'],
        $data['roi_min'] ?? null,
        $data['roi_max'] ?? null,
        $data['min_investment'],
        $data['max_investment'] ?? null,
        $data['duration_months'] ?? null,
        $data['image'] ?? null,
        $data['featured'] ?? 0,
        $data['status'] ?? 1
    ]);

    sendResponse([
        'success' => true,
        'message' => 'Service created successfully',
        'id' => $conn->lastInsertId(),
        'slug' => $slug
    ], 201);
}

// ========================================
// UPDATE FUNCTION
// ========================================

/**
 * Update service by ID (Admin only)
 */
function updateService($conn)
{
    $data = getRequestBody();

    // Validate ID is provided
    if (!isset($data['id'])) {
        sendError('Service ID required');
    }

    // Validate min_investment if provided
    if (isset($data['min_investment'])) {
        if (!is_numeric($data['min_investment']) || $data['min_investment'] < 0) {
            sendError('min_investment must be a positive number');
        }
    }

    // Define allowed fields for update
    $allowedFields = [
        'title',
        'description',
        'category',
        'roi_min',
        'roi_max',
        'min_investment',
        'max_investment',
        'duration_months',
        'image',
        'featured',
        'status'
    ];

    $updates = [];
    $params = [];

    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $updates[] = "$field = ?";
            $params[] = $data[$field];
        }
    }

    // Handle slug update (regenerate if title changed)
    if (isset($data['title']) && !isset($data['slug'])) {
        $newSlug = generateSlug($data['title']);
        // Check uniqueness (exclude current record)
        $stmt = $conn->prepare("SELECT id FROM services WHERE slug = ? AND id != ?");
        $stmt->execute([$newSlug, $data['id']]);
        if ($stmt->fetch()) {
            $newSlug .= '-' . time();
        }
        $updates[] = "slug = ?";
        $params[] = $newSlug;
    } elseif (isset($data['slug'])) {
        $updates[] = "slug = ?";
        $params[] = generateSlug($data['slug']);
    }

    if (empty($updates)) {
        sendError('No fields to update');
    }

    $params[] = $data['id'];

    $sql = "UPDATE services SET " . implode(', ', $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);

    if ($stmt->rowCount() > 0) {
        sendResponse(['success' => true, 'message' => 'Service updated successfully']);
    } else {
        sendError('Service not found or no changes made', 404);
    }
}

// ========================================
// DELETE FUNCTION
// ========================================

/**
 * Delete service by ID (Admin only)
 */
function deleteService($conn)
{
    $data = getRequestBody();

    if (!isset($data['id'])) {
        sendError('Service ID required');
    }

    $stmt = $conn->prepare("DELETE FROM services WHERE id = ?");
    $stmt->execute([$data['id']]);

    if ($stmt->rowCount() > 0) {
        sendResponse(['success' => true, 'message' => 'Service deleted successfully']);
    } else {
        sendError('Service not found', 404);
    }
}
