const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  adult: { type: Boolean, default: false },
  backdrop_path: String,
  genre_ids: [Number],
  original_language: String,
  original_title: String,
  overview: String,
  popularity: { type: Number, default: 0 },
  poster_path: String,
  release_date: String,
  title: { type: String, required: true },
  video: Boolean,
  vote_average: { type: Number, default: 0 },
  vote_count: Number,
  likes: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamp: true })

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie