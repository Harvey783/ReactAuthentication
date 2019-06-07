const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload is the decoded jwt token
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object

  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
      // err populated only if search fails
    }
    if (user) {
      // found user return user
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
