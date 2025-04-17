const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google authentication route
router.get("/auth/google", (req, res, next) => {
    console.log("google authentication");
    next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    const user = req.user;
    if (user && user.profile && user.newuser) {
        req.session.usrdetails = {
            name: user.profile.displayName,
            email: user.profile.emails[0].value
        };
        console.log("Session User Details Set:", req.session.usrdetails);
        return res.redirect("http://localhost:3000/setpasswrd");
    }
    res.redirect("http://localhost:3000/home");
});

// GitHub authentication route
router.get("/auth/github", (req, res, next) => {
    console.log("github authentication");
    next();
}, passport.authenticate("github", { scope: ["profile", "email"] }));

// GitHub callback route
router.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
    if (req.user && req.user.profile && req.user.newuser) {
        req.session.usrdetails = {
            name: req.user.profile.displayName,
            email: req.user.profile.emails[0].value
        };
        return res.redirect("http://localhost:3000/setpasswrd");
    }
    console.log("GitHub Authentication Successful. User:", req.user);
    res.redirect("http://localhost:3000/home");
});

module.exports = router;
