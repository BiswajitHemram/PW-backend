const express = require("express");
const router = express.Router();
const {signup, login} = require("../controllers/authControl");
const {signupDataValidate} = require("../middleware/signupDataValidate")
const loginDataValidate = require("../middleware/loginDataValidate")

router.post("/signup", signupDataValidate, signup);
router.post("/login", loginDataValidate, login);


module.exports = router;