<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Where To - Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body style="background-image: url('bus.jpeg');">
    <div class="container">
        <h2>Where To?</h2>
        <?php
        // Check if there is an error parameter in the URL
        if (isset($_GET['error']) && $_GET['error'] === 'invalid_credentials') {
            echo '<p style="color: red;">Invalid credentials. Please try again.</p>';
        }
        ?>
        <form method="POST" action="loginn.php">
            <div class="Num">
                <label for="mobile-number">Mobile Number</label>
                <input type="text" id="mobile-number" name="mobile_number" placeholder="Enter mobile number">
            </div>
            <div class="Pass">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password">
            </div>
            <div class="submit">
                <button type="submit" name="login">Login</button>
            </div>
            <div class="signupbutton">
                <p>New? <a href="signup.php">Sign Up!</a></p>
            </div>
        </form>
    </div>
    <script src="login.js"></script>
</body>
</html>
