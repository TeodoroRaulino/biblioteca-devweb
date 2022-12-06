const express = require('express')
const HomeController = require('../controllers/home_controller.js')
const AdministrativeController = require('../controllers/administrative_controller.js')
const BookController = require("../controllers/book_controller")
const UserController = require('../controllers/user_controller')
const ReservationController = require('../controllers/reservation_controller')
const Authentication = require('../services/authentication')
const axios = require('axios').default

const router = express.Router()

//Home
router.get('/', HomeController.index)
router.get('/login', verify_user_logged,HomeController.login)
router.post('/login', HomeController.authenticate)
router.post('/logout', HomeController.logout)
router.get('/forgotpassword', HomeController.forgotPassword)

//Administrative

// router.use('/administrative', authenticate)
router.get('/administrative', AdministrativeController.administrative)

router.get('/administrative/users', UserController.index)
router.get('/administrative/user/new', UserController.new)
router.post('/administrative/user/edit', UserController.update)
router.get('/administrative/user/edit/:id', UserController.edit)
router.get('/administrative/user/:id', UserController.show)
router.post('/administrative/user', UserController.create)

router.get('/books', BookController.books)
router.post('/books', BookController.booksJson)
router.get('/administrative/books', BookController.index)
router.get('/administrative/book/new', BookController.new)
router.post('/administrative/book/edit', BookController.update)
router.get('/administrative/book/edit/:id', BookController.edit)
router.get('/administrative/book/:id', BookController.show)
router.post('/administrative/book', BookController.create)

router.get('/administrative/reservation', ReservationController.index)
router.get('/administrative/reservation/new', ReservationController.new)
router.post('/administrative/reservation/edit', ReservationController.update)
router.get('/administrative/reservation/edit/:id', ReservationController.edit)
router.post('/administrative/reservation', ReservationController.create)


async function authenticate (req, res, next) {
  const session_token = req.cookies["session_token"]

  if(!session_token){
    res.redirect('/login')
  }

  const response = await axios.post('http://localhost:5000/auth', {
    session_token: "outra coisa, qualquer coisa ai"
  }).catch((error) => {
    res.redirect('/login')
  })  
  console.log('hehe boy 3')
  const user = response.data

  res.locals.user = user
  next()
}

async function verify_user_logged(req, res, next){
  const session_token = req.cookies["session_token"]

  if(!session_token){
    next()
  }

  const response = await axios.post('http://localhost:5000/auth', {
    session_token: "outra coisa, qualquer coisa ai"
  }).catch((error) => {
    next()
  }) 

  res.redirect('/administrative')  
}

module.exports = router