const asyncHandler = require('express-async-handler')

const isAdmin = asyncHandler((req, res, next) => {
  if (req.user.role === 'ADMIN') {
    next()
  } else {
    res.status(400)
    throw new Error('Unauthorized role access')
  }
})

module.exports = { isAdmin }