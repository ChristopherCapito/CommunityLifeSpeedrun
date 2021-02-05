const mongoose = require('mongoose')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' },
    function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        if (!user.verifyPassword(password)) { return done(null, false) }
        return done(null, user)
      })
    }
  ))
}
