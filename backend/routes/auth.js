const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Jatinisagoodbo$y";

// ROUTE:1 -Registering a user using POST:/api/auth/createuser
router.post(
  "/createuser",
  [
    body("password").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    //Validation Check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    //Making a secure password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Check user already exist or not

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success,  error: "Sorry a user already exist" });
      } else {
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });

        //Creating a JWT Token
        const data = {
          user: user.id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send( "Error occured");
    }
  }
);

// ROUTE:2 - Authenticating a user using POST:/api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Cannot be blank").exists(),
  ],
  async (req, res) => {
    //Validation Check
    let flag = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({flag, errors: errors.array() });
    }

    //Destructuring Email and Password from req.body
    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({flag, error: "Try Again" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({flag, error: "Try Again" });
      }
      const data = {
        user: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      flag=true;
      res.json({flag, authToken });
    } catch (error) {
      console.error(error.message);
      
    }
  }
);

// ROUTE:3 - Get details of logged in user using POST:/api/auth/getuser
router.post(
    "/getuser",
    fetchuser,
    async (req, res) => {
try {
    console.log(req.user)
    const userId = req.user
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
}})


module.exports = router;
