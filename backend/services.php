<?php
require_once 'config/database.php';

$conn = getDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get services
        if (isset($_GET['slug'])) {
            // Get single service by slug
            $slug = $_GET['slug'];
            $stmt = $conn->prepare("
                SELECT s.*, c.name as category_name, c.slug as category_slug 
                FROM services s 
                LEFT JOIN categories c ON s.category_id = c.id 
                WHERE s.slug = ? AND s.is_active = 1
            ");
            $stmt->execute([$slug]);
            $service = $stmt->fetch();
            
            if ($service) {
                // Parse JSON fields
                $service['gallery_images'] = json_decode($service['gallery_images'], true);
                $service['features'] = json_decode($service['features'], true);
                $service['benefits'] = json_decode($service['benefits'], true);
                
                // Increment view count
                $conn->prepare("UPDATE services SET view_count = view_count + 1 WHERE id = ?")->execute([$service['id']]);
                
                sendResponse(['success' => true, 'data' => $service]);
            } else {
                sendError('Service not found', 404);
            }
        } elseif (isset($_GET['featured'])) {
            // Get featured services
            $stmt = $conn->query("
                SELECT s.*, c.name as category_name 
                FROM services s 
                LEFT JOIN categories c ON s.category_id = c.id 
                WHERE s.is_featured = 1 AND s.is_active = 1 
                ORDER BY s.sort_order ASC, s.created_at DESC
            ");
            $services = $stmt->fetchAll();
            
            foreach ($services as &$service) {
                $service['gallery_images'] = json_decode($service['gallery_images'], true);
                $service['features'] = json_decode($service['features'], true);
            }
            
            sendResponse(['success' => true, 'data' => $services]);
        } elseif (isset($_GET['category'])) {
            // Get services by category
            $categorySlug = $_GET['category'];
            $stmt = $conn->prepare("
                SELECT s.*, c.name as category_name 
                FROM services s 
                LEFT JOIN categories c ON s.category_id = c.id 
                WHERE c.slug = ? AND s.is_active = 1 
                ORDER BY s.sort_order ASC
            ");
            $stmt->execute([$categorySlug]);
            $services = $stmt->fetchAll();
            
            sendResponse(['success' => true, 'data' => $services]);
        } else {
            // Get all services
            $stmt = $conn->query("
                SELECT s.*, c.name as category_name 
                FROM services s 
                LEFT JOIN categories c ON s.category_id = c.id 
                WHERE s.is_active = 1 
                ORDER BY s.is_featured DESC, s.sort_order ASC, s.created_at DESC
            ");
            $services = $stmt->fetchAll();
            
            foreach ($services as &$service) {
                $service['gallery_images'] = json_decode($service['gallery_images'], true);
                $service['features'] = json_decode($service['features'], true);
            }
            
            sendResponse(['success' => true, 'data' => $services]);
        }
        break;

    case 'POST':
        // Create new service (Admin only)
        $data = getRequestBody();
        
        $required = ['title', 'short_description', 'category_id'];
        if (!validateRequired($data, $required)) {
            sendError('Missing required fields');
        }
        
        $slug = generateSlug($data['title']);
        
        // Check if slug exists
        $stmt = $conn->prepare("SELECT id FROM services WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug .= '-' . time();
        }
        
        $stmt = $conn->prepare("
            INSERT INTO services (
                category_id, title, slug, short_description, full_description,
                cover_image, gallery_images, min_investment, max_investment,
                expected_roi, duration_months, features, benefits,
                terms_conditions, is_featured, is_active, meta_title, meta_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['category_id'],
            $data['title'],
            $slug,
            $data['short_description'],
            $data['full_description'] ?? null,
            $data['cover_image'] ?? null,
            json_encode($data['gallery_images'] ?? []),
            $data['min_investment'] ?? null,
            $data['max_investment'] ?? null,
            $data['expected_roi'] ?? null,
            $data['duration_months'] ?? null,
            json_encode($data['features'] ?? []),
            json_encode($data['benefits'] ?? []),
            $data['terms_conditions'] ?? null,
            $data['is_featured'] ?? 0,
            $data['is_active'] ?? 1,
            $data['meta_title'] ?? $data['title'],
            $data['meta_description'] ?? $data['short_description']
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Service created successfully',
            'id' => $conn->lastInsertId(),
            'slug' => $slug
        ], 201);
        break;

    case 'PUT':
        // Update service (Admin only)
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Service ID required');
        }
        
        $updates = [];
        $params = [];
        
        $allowedFields = [
            'category_id', 'title', 'short_description', 'full_description',
            'cover_image', 'min_investment', 'max_investment', 'expected_roi',
            'duration_months', 'terms_conditions', 'is_featured', 'is_active',
            'meta_title', 'meta_description'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updates[] = "$field = ?";
                $params[] = $data[$field];
            }
        }
        
        // Handle JSON fields
        if (isset($data['gallery_images'])) {
            $updates[] = "gallery_images = ?";
            $params[] = json_encode($data['gallery_images']);
        }
        if (isset($data['features'])) {
            $updates[] = "features = ?";
            $params[] = json_encode($data['features']);
        }
        if (isset($data['benefits'])) {
            $updates[] = "benefits = ?";
            $params[] = json_encode($data['benefits']);
        }
        
        if (empty($updates)) {
            sendError('No fields to update');
        }
        
        $params[] = $data['id'];
        
        $stmt = $conn->prepare("UPDATE services SET " . implode(', ', $updates) . " WHERE id = ?");
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Service updated successfully']);
        break;

    case 'DELETE':
        // Delete service (Admin only)
        $data = getRequestBody();
        
        if (!isset($data['id'])) {
            sendError('Service ID required');
        }
        
        $stmt = $conn->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        sendResponse(['success' => true, 'message' => 'Service deleted successfully']);
        break;

    default:
        sendError('Method not allowed', 405);
}
