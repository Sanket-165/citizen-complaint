// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginAdmin } = require('../controllers/authController'); // Import loginAdmin

router.post('/register', registerUser);

// RENAME/REPURPOSE for clarity
router.post('/login/citizen', loginUser);

// ✨ NEW ADMIN LOGIN ROUTE
router.post('/login/admin', loginAdmin);

module.exports = router;