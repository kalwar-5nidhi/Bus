<?php
// Start the session to manage user login status
session_start();

// Database connection details
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

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    // Get the input from the login form
    $input_mobile_number = $_POST["mobile_number"];
    $input_password = $_POST["password"];

    // Prepare a SQL statement to check for matching credentials
    $stmt = $conn->prepare("SELECT admin_id, full_name, mobile_number, password FROM admins WHERE mobile_number = ?");
    $stmt->bind_param("s", $input_mobile_number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // User exists, retrieve the password from the database
        $row = $result->fetch_assoc();
        $stored_password = $row["password"];

        // Compare the input password directly with the stored password
        if ($input_password == $stored_password) {
            // Password matches, set session variables
            $_SESSION["loggedin"] = true;
            $_SESSION["admin_id"] = $row["admin_id"];
            $_SESSION["full_name"] = $row["full_name"];
            $_SESSION["mobile_number"] = $row["mobile_number"];

            // Redirect to the dashboard
            header("Location: admindashboard.html");
            exit;
        } else {
            // Password doesn't match, redirect with error
            header("Location: login.php?error=invalid_credentials");
            exit;
        }
    } else {
        // User doesn't exist, redirect with error
        header("Location: login.php?error=invalid_credentials");
        exit;
    }
} else {
    // If the form was not submitted or login button not clicked, redirect to the login page
    header("Location: login.php");
    exit;
}
?>

