<?php
// db_connect.php - Database connection
require_once 'config.php';

function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8";
        $conn = new PDO($dsn, DB_USER, DB_PASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        $error_message = "[" . date('Y-m-d H:i:s') . "] Database connection failed: " . $e->getMessage() . "\n";
        file_put_contents('database_errors.log', $error_message, FILE_APPEND);
        die("Database connection failed. Please try again later.");
    }
}
?>
