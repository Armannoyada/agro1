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
    // Fetch all contacts
    $stmt = $conn->prepare("SELECT * FROM contacts ORDER BY created_at DESC");
    $stmt->execute();
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($contacts)) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'No contacts found to export']);
        exit();
    }

    // Set headers for CSV download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="contacts_' . date('Y-m-d_H-i-s') . '.csv"');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');

    // Create output stream
    $output = fopen('php://output', 'w');

    // Add UTF-8 BOM for Excel compatibility
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    // Write CSV header row
    $headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Created At'];
    fputcsv($output, $headers);

    // Write data rows
    foreach ($contacts as $contact) {
        $row = [
            $contact['id'] ?? '',
            $contact['name'] ?? '',
            $contact['email'] ?? '',
            $contact['phone'] ?? '',
            $contact['subject'] ?? '',
            $contact['message'] ?? '',
            $contact['status'] ?? 'unread',
            $contact['created_at'] ?? ''
        ];
        fputcsv($output, $row);
    }

    fclose($output);

} catch (PDOException $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Failed to export contacts', 'debug' => $e->getMessage()]);
}
