const express = require("express");
const router = express.Router();
const passport = require("passport");
const Auth = require("../controller/middleware/auth");

// @route   GET /api/auth/google
// @desc    Login with google
// @access  Private
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// @route   GET /api/auth/google/callback
// @desc    Redirect from google oath
// @access  Private
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/api/current_user");
  }
);

// @route   GET /api/auth/facebook
// @desc    Sign In with facebook
// @access  Private
router.get("/auth/facebook", passport.authenticate("facebook"));

// @route   GET /api/auth/facebook/callback
// @desc    Redirect from facebook oauth
// @access  Private
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/api/current_user");
  }
);

// @route   GET /api/auth/logout
// @desc    Log out all user
// @access  Private
router.get("/auth/logout", Auth.isUserLogin, async (req, res) => {
  await req.logout();
  console.log("Loging out good");
  res.status(200).json({ message: "Loging out successful", success: true });
});

// @route   GET /api/auth/logout
// @desc    Show current user
// @access  Private
router.get("/current_user", Auth.isUserLogin, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
