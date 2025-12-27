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
        if (isset($_GET['slug'])) {
            // Get single category by slug
            $slug = $_GET['slug'];
            $stmt = $conn->prepare("SELECT * FROM categories WHERE slug = ? AND is_active = 1");
            $stmt->execute([$slug]);
            $category = $stmt->fetch();

            if ($category) {
                // Get services in this category
                $stmt = $conn->prepare("SELECT * FROM services WHERE category_id = ? AND is_active = 1 ORDER BY sort_order ASC");
                $stmt->execute([$category['id']]);
                $category['services'] = $stmt->fetchAll();

                sendResponse(['success' => true, 'data' => $category]);
            } else {
                sendError('Category not found', 404);
            }
        } else {
            // Get all categories
            $stmt = $conn->query("SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order ASC");
            $categories = $stmt->fetchAll();

            // Get service count for each category
            foreach ($categories as &$category) {
                $stmt = $conn->prepare("SELECT COUNT(*) FROM services WHERE category_id = ? AND is_active = 1");
                $stmt->execute([$category['id']]);
                $category['service_count'] = $stmt->fetchColumn();
            }

            sendResponse(['success' => true, 'data' => $categories]);
        }
        break;

    case 'POST':
        // Create category (Admin only)
        $data = getRequestBody();

        if (!validateRequired($data, ['name'])) {
            sendError('Category name required');
        }

        $slug = generateSlug($data['name']);

        // Check if slug exists
        $stmt = $conn->prepare("SELECT id FROM categories WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug .= '-' . time();
        }

        $stmt = $conn->prepare("
            INSERT INTO categories (name, slug, description, icon, image, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $data['name'],
            $slug,
            $data['description'] ?? null,
            $data['icon'] ?? null,
            $data['image'] ?? null,
            $data['is_active'] ?? 1,
            $data['sort_order'] ?? 0
        ]);

        sendResponse([
            'success' => true,
            'message' => 'Category created successfully',
            'id' => $conn->lastInsertId(),
            'slug' => $slug
        ], 201);
        break;

    case 'PUT':
        // Update category (Admin only)
        $data = getRequestBody();

        if (!isset($data['id'])) {
            sendError('Category ID required');
        }

        $updates = [];
        $params = [];

        $allowedFields = ['name', 'description', 'icon', 'image', 'is_active', 'sort_order'];

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

        $stmt = $conn->prepare("UPDATE categories SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);

        sendResponse(['success' => true, 'message' => 'Category updated successfully']);
        break;

    case 'DELETE':
        $data = getRequestBody();

        if (!isset($data['id'])) {
            sendError('Category ID required');
        }

        // Get category slug first
        $stmt = $conn->prepare("SELECT slug FROM categories WHERE id = ?");
        $stmt->execute([$data['id']]);
        $category = $stmt->fetch();

        if (!$category) {
            sendError('Category not found', 404);
        }

        // Check if any services are using this category
        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM services WHERE category = ?");
        $stmt->execute([$category['slug']]);
        $result = $stmt->fetch();
        $serviceCount = (int) $result['count'];

        if ($serviceCount > 0) {
            sendError("Cannot delete category: {$serviceCount} service(s) are assigned to this category. Please reassign or delete these services first.", 400);
        }

        $stmt = $conn->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$data['id']]);

        sendResponse(['success' => true, 'message' => 'Category deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
