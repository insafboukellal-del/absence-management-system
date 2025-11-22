<?php
// test_connection.php - Test database connection
require_once 'db_connect.php';

echo "<h2>Testing Database Connection</h2>";

try {
    $conn = getDBConnection();
    echo "<p style='color: green;'>✓ Connection successful!</p>";
    echo "<p>Connected to database: " . DB_NAME . "</p>";
    $conn = null;
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Connection failed: " . $e->getMessage() . "</p>";
}
?>
