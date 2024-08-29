const express = require('express')
const createOneMovie = require('../controllers/movieControllers').createOneMovie
const getAllMovies = require('../controllers/movieControllers').getAllMovies
const updateOneMovie = require('../controllers/movieControllers').updateOneMovie
const deleteOneMovie = require('../controllers/movieControllers').deleteOneMovie
const addNewLike = require('../controllers/movieControllers').addNewLike
const { protect } = require('../middlewares/authMiddleware')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/movies', protect, isAdmin, createOneMovie)
router.get('/movies', getAllMovies)
router.put('/movies/:id', protect, isAdmin, updateOneMovie)
router.patch('/movies/likes/:id', protect, addNewLike)
router.delete('/movies/:id', protect, isAdmin, deleteOneMovie)

module.exports = router