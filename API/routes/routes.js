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
router.post('/authenticate', HomeController.authenticate)
router.post('/auth', authenticate,HomeController.validateTokenAuth)
router.post('/logout', HomeController.logout)
router.get('/forgotpassword', HomeController.forgotPassword)

//Administrative

router.use('/administrative', authenticate)
router.get('/administrative', AdministrativeController.administrative)

router.get('/administrative/users', UserController.index)
router.get('/administrative/user/new', UserController.new)
router.put('/administrative/user/edit', UserController.update)
router.get('/administrative/user/edit/:id', UserController.edit)
router.get('/administrative/user/:id', UserController.show)
router.post('/administrative/user', UserController.create)

router.post('/books', BookController.booksJson)
router.get('/administrative/books', BookController.index)
router.get('/administrative/book/new', BookController.new)
router.put('/administrative/book/edit', BookController.update)
router.get('/administrative/book/edit/:id', BookController.edit)
router.get('/administrative/book/:id', BookController.show)
router.post('/administrative/book', BookController.create)

router.get('/administrative/reservation', ReservationController.index)
router.get('/administrative/reservation/new', ReservationController.new)
router.put('/administrative/reservation/edit', ReservationController.update)
router.get('/administrative/reservation/edit/:id', ReservationController.edit)
router.post('/administrative/reservation', ReservationController.create)
router.patch('/administrative/renovation/:id', ReservationController.renovation)


function authenticate (req, res, next) {
  const session_token = req.cookies["session_token"]

  if(!session_token){
    res.status(401)
    return res.end()
  }

  const user = Authentication.validate_token(session_token)
  
  if(!user){
    res.status(401)
    return res.end() 
  }

  res.locals.user = user
  next()
}

module.exports = router