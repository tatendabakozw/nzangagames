import passport from 'passport'

// Passport GitHub strategy
import { Strategy as GitHubStrategy } from 'passport-github';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3333/auth/github/callback',
    scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {
    // Store user information in session or database
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export default passport