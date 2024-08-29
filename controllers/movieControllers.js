const Movie = require('../models/movieModel')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const createOneMovie = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please provide the title of the movie')
  }

  const movie = await Movie.create(req.body)

  res.status(201).json(movie)
})

const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({
    $or: [
      { active: true },
      { active: { $exists: false } }
    ]
  })
  res.status(200).json(movies)
})

const updateOneMovie = asyncHandler(async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid movie id');
  }

  const movie = await Movie.findById(id)
  if (!movie) {
    res.status(404)
    throw new Error('Movie not found')
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400)
    throw new Error('Please provide the data to update')
  }

  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(updatedMovie)
})

const addNewLike = asyncHandler(async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid movie id');
  }

  const movie = await Movie.findById(id)
  if (!movie) {
    res.status(404)
    throw new Error('Movie not found')
  }

  const currentLikes = movie.likes

  const updatedMovie = await Movie.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
  res.status(200).json(updatedMovie)
})

const deleteOneMovie = asyncHandler(async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid movie id');
  }

  const movie = await Movie.findById(id)
  if (!movie) {
    res.status(404)
    throw new Error('Movie not found')
  }

  if (req.query.destroy !== 'true') {
    if (movie.active === false) {
      res.status(404)
      throw new Error("Couldn't delete, movie not found")
    }
    const softDeletedMovie = await Movie.findByIdAndUpdate(id, { active: false })
    return res.status(200).json({ _id: id })
  }

  const deletedMovie = await movie.deleteOne()
  return res.status(200).json({ _id: id })
})

module.exports = {
  createOneMovie,
  getAllMovies,
  updateOneMovie,
  deleteOneMovie,
  addNewLike
}