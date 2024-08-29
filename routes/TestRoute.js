const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'test route modified in my pc file right now' })
})

module.exports = router