<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Establish connection to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wheretodata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['signup_submit'])) {
    // Retrieve and sanitize form data
    $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
    $mobile_number = mysqli_real_escape_string($conn, $_POST['mobile_number']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $sign_in_as = $_POST['sign_in_as'];

    // Determine which table to use based on sign_in_as option
    $table_name = '';
    switch ($sign_in_as) {
        case 'customer':
            $table_name = 'customers';
            break;
        case 'employee':
            $table_name = 'employees';
            break;
        case 'driver':
            $table_name = 'drivers';
            break;
        case 'admin':
            $table_name = 'admins';
            break;
        default:
            echo "Invalid sign-in option";
            exit();
    }

    // Prepare and execute SQL statement to insert data into the appropriate table
    $stmt = $conn->prepare("INSERT INTO $table_name (full_name, mobile_number, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $full_name, $mobile_number, $password);

    if ($stmt->execute() === TRUE) {
        // Close statement
        $stmt->close();

        // Start session and store user information
        session_start();
        $_SESSION['user_role'] = $sign_in_as; // Store user role in session

        // Redirect to the dashboard based on the user's role
        switch ($sign_in_as) {
            case 'customer':
                header("Location: customer_dashboard.php"); // Redirect to customer dashboard
                break;
            case 'employee':
                header("Location: employee_dashboard.php"); // Redirect to employee dashboard
                break;
            case 'driver':
                header("Location: driver_dashboard.php"); // Redirect to driver dashboard
                break;
            case 'admin':
                header("Location: admindashboard.html"); // Redirect to admin dashboard
                break;
        }
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }
}

// Close connection
$conn->close();
?>
