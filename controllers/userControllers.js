const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async (req, res) => {
  const body = req.body

  if (!body.name || !body.email || !body.password) {
    res.status(400)
    throw new Error('Please provide name, email and password')
  }

  const userExists = await User.findOne({ email: body.email })
  if (userExists) {
    res.status(400)
    throw new Error('The user for this email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(body.password, salt)

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: hashedPassword,
    role: body.role
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    })
  } else {
    res.status(400)
    throw new Error('Incorrect data')
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email or password is missing')
  }

  const user = await User.findOne({ email: email })
  if (!user) {
    res.status(400)
    throw new Error('Incorrect email or password')
  }

  const emailMatches = await bcrypt.compare(password, user.password)
  if (emailMatches) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Incorrect email or password')
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

const data = (req, res) => {
  res.status(200).json(req.user)
}

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')
  if (users.length === 0) {
    res.status(404)
    throw new Error('users not found')
  }
  res.status(200).json(users)
})

module.exports = {
  register,
  login,
  data,
  getAllUsers
}

// Comment to test a change in the docker images