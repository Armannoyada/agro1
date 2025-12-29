<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';

$conn = getDBConnection();

try {
    // Fetch all inquiries
    $stmt = $conn->prepare("SELECT * FROM service_inquiries ORDER BY created_at DESC");
    $stmt->execute();
    $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($inquiries)) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'No inquiries found to export']);
        exit();
    }

    // Set headers for CSV download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="service_inquiries_' . date('Y-m-d_H-i-s') . '.csv"');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');

    // Create output stream
    $output = fopen('php://output', 'w');

    // Add UTF-8 BOM for Excel compatibility
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    // Write CSV header row
    $headers = ['ID', 'Service', 'Name', 'Email', 'Phone', 'Investment Amount', 'Status', 'Admin Notes', 'Created At'];
    fputcsv($output, $headers);

    // Write data rows
    foreach ($inquiries as $inquiry) {
        $row = [
            $inquiry['id'] ?? '',
            $inquiry['service_title'] ?? '',
            $inquiry['name'] ?? '',
            $inquiry['email'] ?? '',
            $inquiry['phone'] ?? '',
            $inquiry['investment_amount'] ?? '',
            $inquiry['status'] ?? 'pending',
            $inquiry['admin_notes'] ?? '',
            $inquiry['created_at'] ?? ''
        ];
        fputcsv($output, $row);
    }

    fclose($output);

} catch (PDOException $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Failed to export inquiries', 'debug' => $e->getMessage()]);
}
