const userModel = require("../models/user.model"); // Import the User model for database operations

/**
 * Controller to handle user registration.
 * Extracts user details from request body, creates a new user, 
 * generates a JWT token, stores it in a cookie, and handles potential errors.
 */
async function userRegisterController(req, res) { // Define an asynchronous function for registration
    try { // Start a try block to handle any runtime errors
        const { name, email, password } = req.body; // Destructure name, email, and password from the request body

        // Basic validation for required fields
        if (!name || !email || !password) { // Check if any required field is missing
            return res.status(400).json({ // Return a 400 Bad Request status if validation fails
                success: false, // Indicate that the operation was not successful
                message: "All fields (name, email, password) are required" // Provide a descriptive error message
            }); // End of the JSON response object
        } // End of the if block for basic validation

        // Check if user already exists
        const existingUser = await userModel.findOne({ email }); // Search for an existing user with the same email
        if (existingUser) { // If a user with that email is found
            return res.status(409).json({ // Return a 409 Conflict status
                success: false, // Indicate failure
                message: "User with this email already exists" // Inform the user about the duplicate email
            }); // End of the JSON response for existing user
        } // End of the if block for checking existing user

        // Create new user (password will be hashed by pre-save hook in user model)
        const user = await userModel.create({ // Use the model to create a new user document in the database
            name, // Set the name field
            email, // Set the email field
            password // Set the password field (will be hashed automatically)
        }); // End of the user creation operation

        // Generate a JWT token for the newly registered user
        const token = user.generateJWT(); // Call the custom instance method to generate an authentication token

        // Configure cookie options for security and expiration
        const cookieOptions = { // Create an object for cookie configuration
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie (XSS protection)
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // Set cookie expiration to 24 hours (in milliseconds)
            sameSite: "strict" // Prevent CSRF attacks by restricting cross-site cookie sending
        }; // End of the cookie options object

        // Set the JWT token in a cookie named "token"
        res.cookie("token", token, cookieOptions); // Send the cookie to the client's browser with the specified options

        // Send success response with user details (token is now in cookie, but can still be returned for convenience)
        res.status(201).json({ // Return a 201 Created status for successful registration
            success: true, // Indicate that the registration succeeded
            message: "User registered successfully", // Inform the user about the success
            token, // Include the JWT token in the response JSON as well
            user: { // Provide a public user object (excluding the password)
                id: user._id, // Include the unique database ID
                name: user.name, // Include the user's name
                email: user.email // Include the user's email
            } // End of the public user object
        }); // End of the successful JSON response
    } catch (error) { // Catch any errors that occurred during the process
        // Handle Mongoose validation errors
        if (error.name === "ValidationError") { // Check if it's a validation error from Mongoose
            const messages = Object.values(error.errors).map(err => err.message); // Extract individual error messages
            return res.status(400).json({ // Return a 400 Bad Request status
                success: false, // Indicate failure
                message: "Validation failed", // Broad message for validation failure
                errors: messages // Include the specific validation error messages
            }); // End of the validation error response
        } // End of the if block for validation error handling

        // Handle other unexpected errors
        console.error("Registration Error:", error); // Log the full error to the console for debugging
        res.status(500).json({ // Return a 500 Internal Server Error status
            success: false, // Indicate a server-side failure
            message: "An internal server error occurred" // Provide a generic error message to the user
        }); // End of the internal server error response
    } // End of the catch block
} // End of the userRegisterController function

module.exports = { // Export the controller as an object
    userRegisterController // Include the userRegisterController in the exports
}; // End of module.exports