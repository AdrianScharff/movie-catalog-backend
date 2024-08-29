const express = require('express')
const { register, login, getAllUsers, data } = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/data', protect, data)
router.get('/users', protect, isAdmin, getAllUsers)

module.exports = router