const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../../models/User");

//Load Register and Login validation Input
const validateRegisterInput = require("../../validation/register");

//@route GET api/users/test
//@desc    Tests users route
//@access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users works"
  })
);

//@route GET api/users/login
//@desc    User login route
//@access  Public
router.get("/login", (req, res) => {
  res.render("users/login");
});

//@route GET api/ideas/register
//@desc    Register users rout
//@access  Public
router.get("/register", (req, res) => {
  res.render("users/register");
});

//@route POST api/users/register
//@desc    Register a new user
//@access  Public
router.post("/register", (req, res) => {
  //destructure errors and isValid
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.render("users/register", {
      errors: errors,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      req.flash("error_msg", "Email already exists");
      res.redirect("/api/users/register");
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            req.flash("success_msg", "You are now registered and can log in");
            res.redirect("/api/users/login");
          })
          .catch(err => {
            console.log(err);
            return;
          });
      });
    });
  });
});

//@route POST api/users/login
//@desc    User login route
//@access  Public
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/api/ideas",
    failureRedirect: "/api/users/login",
    failureFlash: true
  })(req, res, next);
});

//@route GET api/users/logout
//@desc    User logout route
//@access  Private
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/api/users/login");
});
module.exports = router;
