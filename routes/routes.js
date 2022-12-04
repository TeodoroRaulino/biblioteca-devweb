const express = require('express')
const HomeController = require('../controllers/home_controller.js')
const AdministrativeController = require('../controllers/administrative_controller.js')
const BookController = require("../controllers/book_controller")
const UserController = require('../controllers/user_controller')
const ReservationController = require('../controllers/reservation_controller')
const Authentication = require('../services/authentication')

const router = express.Router()

//Home
router.get('/', HomeController.index)
router.get('/login', verify_user_logged, HomeController.login)
router.post('/login', HomeController.authenticate)
router.post('/logout', HomeController.logout)
router.get('/forgotpassword', HomeController.forgotPassword)

//Administrative

router.use('/administrative', authenticate)
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

router.get('/administrative/reservation', ReservationController.reservations)
router.get('/administrative/reservation/new', ReservationController.reservartionNew)
router.post('/administrative/reservation/edit', ReservationController.reservartionUpdate)
router.get('/administrative/reservation/edit/:id', ReservationController.reservartionEdit)
router.post('/administrative/reservation', ReservationController.reservationCreate)


function authenticate (req, res, next) {
  const session_token = req.cookies["session_token"]
  if(!session_token){
    res.redirect('/login')
  }
  const user = Authentication.validate_token(session_token)
  
  if(!user){
    return res.redirect('/login');
  }

  res.locals.user = user
  next()
}

function verify_user_logged(req, res, next){
  const session_token = req.cookies["session_token"]
  if(!session_token){
    next()
  }
  const user = Authentication.validate_token(session_token)

  if(user){
    res.redirect('/administrative')
  }else{
    next();  
  }
}

module.exports = router