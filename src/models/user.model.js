const mongoose = require("mongoose"); // Importing mongoose for MongoDB interaction
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for generating authentication tokens

// Defining the schema for the User model
const userSchema = mongoose.Schema({
    // Email field configuration
    email: {
        type: String, // Data type is String
        required: [true, "Email is required for creating a user"], // Mandatory field with custom error message
        trim: true, // Remove leading/trailing whitespace
        lowercase: true, // Store email in lowercase
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"], // Regex validation for email format
        unique: [true, "Email already exists"] // Ensure email uniqueness in the database
    },
    // Name field configuration
    name: {
        type: String, // Data type is String
        required: [true, "Name is required for creating a user"], // Mandatory field with custom error message
        trim: true, // Remove leading/trailing whitespace
        lowercase: true, // Store name in lowercase
        minlength: [3, "Name must be at least 3 characters long"], // Minimum length requirement
        maxlength: [100, "Name must be at most 100 characters long"] // Maximum length requirement
    },
    // Password field configuration
    password: {
        type: String, // Data type is String
        required: [true, "Password is required for creating a user"], // Mandatory field with custom error message
        trim: true, // Remove leading/trailing whitespace
        minlength: [6, "Password must be at least 6 characters long"], // Minimum length requirement
        maxlength: [100, "Password must be at most 100 characters long"], // Maximum length requirement
        select: false // Exclude password from query results by default for security
    }
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields to the documents
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function() {
    // If password is not modified, skip hashing and proceed
    if (!this.isModified("password")) {
        return;
    }
    // Hash the password using bcrypt with a salt factor of 10
    this.password = await bcrypt.hash(this.password, 10);
});

// Instance method to compare providing password with the hashed password in database
userSchema.methods.comparePassword = async function(password) {
    // Return true if passwords match, otherwise false
    return await bcrypt.compare(password, this.password);
};

// Instance method to generate a JWT token for the user
userSchema.methods.generateJWT = function() {
    // Sign the token with user ID and secret, specifying the expiration time
    return jwt.sign(
        { id: this._id }, // Payload containing user ID
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: process.env.JWT_EXPIRE } // Options like expiration duration
    );
};

// Exporting the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);