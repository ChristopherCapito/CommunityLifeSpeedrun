module.exports = function isLoggedIn (req, res, next) {
  req.isAuthenticated ? next() : res.redirect('/users/login')
}
