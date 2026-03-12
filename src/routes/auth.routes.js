const express = require("express");
const router = express.Router();
const { userRegisterController } = require("../controllers/auth.controller");

/* POST /api/auth/register */
router.post('/register', userRegisterController);

module.exports = router;