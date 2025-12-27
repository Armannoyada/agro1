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
        if (isset($_GET['trackView'])) {
            trackBlogView($conn, $_GET['trackView']);
        } elseif (isset($_GET['slug'])) {
            getBlogBySlug($conn, $_GET['slug']);
        } elseif (isset($_GET['id'])) {
            getBlogById($conn, $_GET['id']);
        } elseif (isset($_GET['featured'])) {
            getFeaturedBlogs($conn);
        } else {
            getAllBlogs($conn);
        }
        break;

    case 'POST':
        createBlog($conn);
        break;

    case 'PUT':
        updateBlog($conn);
        break;

    case 'DELETE':
        deleteBlog($conn);
        break;

    default:
        sendError('Method not allowed', 405);
}

// ========================================
// GET FUNCTIONS
// ========================================

function getAllBlogs($conn)
{
    // Check if admin wants all blogs (including inactive)
    $showAll = isset($_GET['all']) && $_GET['all'] === 'true';

    $sql = "SELECT id, title, slug, excerpt, content, featured_image, video_url, video_file, 
                   author, category, tags, status, featured, view_count, created_at, updated_at
            FROM blogs";

    if (!$showAll) {
        $sql .= " WHERE status = 1";
    }

    $sql .= " ORDER BY featured DESC, created_at DESC";

    $stmt = $conn->query($sql);
    $blogs = $stmt->fetchAll();

    sendResponse(['success' => true, 'data' => $blogs]);
}

function getBlogBySlug($conn, $slug)
{
    $stmt = $conn->prepare("
        SELECT id, title, slug, excerpt, content, featured_image, video_url, video_file,
               author, category, tags, status, featured, view_count, created_at, updated_at
        FROM blogs 
        WHERE slug = ? AND status = 1
    ");
    $stmt->execute([$slug]);
    $blog = $stmt->fetch();

    if ($blog) {
        // NOTE: View count is now tracked separately via trackView endpoint (session-based)
        sendResponse(['success' => true, 'data' => $blog]);
    } else {
        sendError('Blog not found', 404);
    }
}

// Track blog view (called separately from frontend, session-based)
function trackBlogView($conn, $blogId)
{
    $stmt = $conn->prepare("UPDATE blogs SET view_count = view_count + 1 WHERE id = ?");
    $stmt->execute([$blogId]);

    sendResponse(['success' => true, 'message' => 'View tracked']);
}

function getBlogById($conn, $id)
{
    $stmt = $conn->prepare("
        SELECT id, title, slug, excerpt, content, featured_image, video_url, video_file,
               author, category, tags, status, featured, view_count, created_at, updated_at
        FROM blogs 
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $blog = $stmt->fetch();

    if ($blog) {
        sendResponse(['success' => true, 'data' => $blog]);
    } else {
        sendError('Blog not found', 404);
    }
}

function getFeaturedBlogs($conn)
{
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 3;

    $stmt = $conn->prepare("
        SELECT id, title, slug, excerpt, featured_image, video_url, author, category, 
               created_at
        FROM blogs 
        WHERE featured = 1 AND status = 1 
        ORDER BY created_at DESC
        LIMIT ?
    ");
    $stmt->execute([$limit]);
    $blogs = $stmt->fetchAll();

    sendResponse(['success' => true, 'data' => $blogs]);
}

// ========================================
// CREATE FUNCTION
// ========================================

function createBlog($conn)
{
    try {
        $data = getRequestBody();

        // Validate required fields
        if (!isset($data['title']) || empty($data['title'])) {
            sendError('Title is required');
        }

        // Generate slug from title
        $slug = isset($data['slug']) && !empty($data['slug'])
            ? generateSlug($data['slug'])
            : generateSlug($data['title']);

        // Check if slug already exists
        $stmt = $conn->prepare("SELECT id FROM blogs WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            $slug .= '-' . time();
        }

        // Generate excerpt from content if not provided
        $excerpt = $data['excerpt'] ?? null;
        if (!$excerpt && isset($data['content'])) {
            $excerpt = strip_tags($data['content']);
            $excerpt = substr($excerpt, 0, 200) . '...';
        }

        $stmt = $conn->prepare("
            INSERT INTO blogs (
                title, slug, excerpt, content, featured_image, video_url, video_file,
                author, category, tags, status, featured
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $result = $stmt->execute([
            $data['title'],
            $slug,
            $excerpt,
            $data['content'] ?? null,
            $data['featured_image'] ?? null,
            $data['video_url'] ?? null,
            $data['video_file'] ?? null,
            $data['author'] ?? 'Admin',
            $data['category'] ?? null,
            $data['tags'] ?? null,
            $data['status'] ?? 1,
            $data['featured'] ?? 0
        ]);

        if (!$result) {
            sendError('Failed to create blog post');
        }

        $insertedId = $conn->lastInsertId();

        sendResponse([
            'success' => true,
            'message' => 'Blog post created successfully',
            'id' => $insertedId,
            'slug' => $slug
        ], 201);
    } catch (PDOException $e) {
        sendError('Database error: ' . $e->getMessage(), 500);
    }
}

// ========================================
// UPDATE FUNCTION
// ========================================

function updateBlog($conn)
{
    try {
        $data = getRequestBody();

        if (!isset($data['id'])) {
            sendError('Blog ID required');
        }

        $allowedFields = [
            'title',
            'excerpt',
            'content',
            'featured_image',
            'video_url',
            'video_file',
            'author',
            'category',
            'tags',
            'status',
            'featured'
        ];

        $updates = [];
        $params = [];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updates[] = "$field = ?";
                $params[] = $data[$field];
            }
        }

        // Handle slug update
        if (isset($data['title']) && !isset($data['slug'])) {
            $newSlug = generateSlug($data['title']);
            $stmt = $conn->prepare("SELECT id FROM blogs WHERE slug = ? AND id != ?");
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

        // Update excerpt if content changed
        if (isset($data['content']) && !isset($data['excerpt'])) {
            $excerpt = strip_tags($data['content']);
            $excerpt = substr($excerpt, 0, 200) . '...';
            $updates[] = "excerpt = ?";
            $params[] = $excerpt;
        }

        if (empty($updates)) {
            sendError('No fields to update');
        }

        $params[] = $data['id'];

        $sql = "UPDATE blogs SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            sendResponse(['success' => true, 'message' => 'Blog post updated successfully']);
        } else {
            sendError('Blog not found or no changes made', 404);
        }
    } catch (PDOException $e) {
        sendError('Database error: ' . $e->getMessage(), 500);
    }
}

// ========================================
// DELETE FUNCTION
// ========================================

function deleteBlog($conn)
{
    $data = getRequestBody();

    if (!isset($data['id'])) {
        sendError('Blog ID required');
    }

    $stmt = $conn->prepare("DELETE FROM blogs WHERE id = ?");
    $stmt->execute([$data['id']]);

    if ($stmt->rowCount() > 0) {
        sendResponse(['success' => true, 'message' => 'Blog post deleted successfully']);
    } else {
        sendError('Blog not found', 404);
    }
}
