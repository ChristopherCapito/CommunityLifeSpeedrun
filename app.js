const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')

// Get passport ocnfig
require('./config/passport')(passport)

// Set routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

// Connect db
mongoose.connect('mongodb+srv://cdev:community@trial1.s1bea.mongodb.net/community?retryWrites=true&w=majority', {
  useUnifiedTopology: true, useNewUrlParser: true
}, (err, res) => {
  if (err) throw (err)
  console.log('MongoDB connected')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))

// Layout Middleware
app.use(expressLayouts)

// Bodyparser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
