const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{

  User.findById(id)
    .then (user => {
      done(null, user);
    });
});
//אפשר להכניס פה גם במקום גוגל פייסבוק
passport.use(new GoogleStrategy(
  {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
  },
  (accessToken , refreshToken, profile , done ) =>{
    User.findOne({googleId: profile.id }).then (existingUser => {
        if (existingUser) {
          //כבר יש לנו משתמש כזה
          done(null, existingUser);
        }else {
          //אין לנו משתמש כזה
          new User ({googleId: profile.id}).save()
          .then(user => done(null, user));
        }
    });
  }
  )
);
