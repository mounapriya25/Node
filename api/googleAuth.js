const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const sch = require("../budget_tracker/database.js");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRETE,
    callbackURL: "https://your-backend.vercel.app/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const usr = await sch.auth.findOne({ email: profile.emails[0].value });
        if (!usr) {
            return done(null, { profile, newuser: true });
        }
        return done(null, profile);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
