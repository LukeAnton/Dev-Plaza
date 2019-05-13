const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//this allows us to validate sign in
const { check, validationResult } = require("express-validator/check");
//Grabbing the User Table
const User = require("../../models/Users");

// @route      POST api/users
// @desc       Register user
// @access     Public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      //CREATE USER
      //Creating an instance of a user 3
      user = new User({
        name,
        email,
        avatar,
        password
      });
      //HASH PASSWORD
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //SAVE USER TO DB
      await user.save();
      //Return Jsonwebtoken
      //GET PAYLOAD WHICH INCLUDES THE USER ID
      const payload = {
        user: {
          id: user.id
        }
      };
      //THEN WE SIGN THE TOKEN
      //PASS PAYLOAD
      //PASS SECRET
      //EXPIRATION (OPTIONAL
      //THEN INSIDE A CALLBACK WE WILL EITHER GET AN ERROR OR TOKEN
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (e, token) => {
          if (e) throw e;
          res.json({ token });
        }
      );

      // res.send("User registered");
      // res.send("User route");
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
