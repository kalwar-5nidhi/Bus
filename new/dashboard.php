<?php
// backend.php

// Connect to MySQL database
$conn = new mysqli("localhost", "username", "password", "dbname");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch routes from database
function getRoutes($conn) {
    $sql = "SELECT id, name, distance FROM routes";
    $result = $conn->query($sql);

    $routes = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $routes[] = $row;
        }
    }
    return $routes;
}

// Fetch customers from database
function getCustomers($conn) {
    $sql = "SELECT id, name, email, phone FROM customers";
    $result = $conn->query($sql);

    $customers = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $customers[] = $row;
        }
    }
    return $customers;
}

// Fetch bookings from database
function getBookings($conn) {
    $sql = "SELECT id, customer_name, bus_name, seat_number FROM bookings";
    $result = $conn->query($sql);

    $bookings = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
    }
    return $bookings;
}

// Handle AJAX requests
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'getRoutes':
            $routes = getRoutes($conn);
            echo json_encode($routes);
            break;
        case 'getCustomers':
            $customers = getCustomers($conn);
            echo json_encode($customers);
            break;
        case 'getBookings':
            $bookings = getBookings($conn);
            echo json_encode($bookings);
            break;
        // Add cases for other CRUD operations related to routes, customers, and bookings
        default:
            echo "Invalid action";
            break;
    }
}

$conn->close();
?>
