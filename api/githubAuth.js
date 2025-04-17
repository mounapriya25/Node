const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const sch = require("../budget_tracker/database.js");

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "https://your-backend.vercel.app/auth/github/callback"
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
