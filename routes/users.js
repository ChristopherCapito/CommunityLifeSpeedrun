const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const isLoggedIn = require('../config/authCheck')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* GET users dashboard. */
router.get('/dashboard', isLoggedIn, function (req, res, next) {
  res.send('respond with a resource')
  // auth needed!
})

/* POST users register. */
router.post('/register', async function (req, res, next) {
  const { name, email, password, password2 } = req.body

  if (password !== password2) { res.send('passwords do not match!') }

  let user = await User.findOne({ email: email })

  // Check if exists
  user
    ? res.status(400).send('User already exists')
    : user = new User({
      name: name,
      email: email,
      password: password
    })
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw (err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw (err)
      user.password = bcrypt.has
      user.save()
      res.status(200).send('register successful')
    })
  })
})

/* POST users login. */
router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/dashboard' + req.user.username)
  })

/* POST users logout. */
router.post('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/login')
  // auth needed!
})

/* PUT users change credentials. */
router.put('/update', isLoggedIn, function (req, res, next) {
  const { email, name, password, password2 } = req.body

  if (password !== password2) res.status(400).send('passwords do not match')

  // update mail
  if (email && !password) {
    User.findOneAndUpdate(req.body._id, { email }, { useFindAndModify: true, new: true }).then(user => {
      res.status(200).send(user)
    })
  }
  // auth needed!
})

module.exports = router
