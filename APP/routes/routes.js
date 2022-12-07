const express = require('express')
const HomeController = require('../controllers/home_controller.js')
const AdministrativeController = require('../controllers/administrative_controller.js')
const BookController = require("../controllers/book_controller")
const UserController = require('../controllers/user_controller')
const ReservationController = require('../controllers/reservation_controller')
const axios = require('axios').default

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

router.post('/users', UserController.usersJson)
router.get('/administrative/users', UserController.index)
router.get('/administrative/user/new', UserController.new)
router.post('/administrative/user/edit', UserController.update)
router.get('/administrative/user/edit/:id', UserController.edit)
router.get('/administrative/user/:id', UserController.show)
router.post('/administrative/user', UserController.create)
router.post('/administrative/delete/user/:id', UserController.delete)

router.get('/books', BookController.books)
router.post('/books', BookController.booksJson)
router.get('/administrative/books', BookController.index)
router.get('/administrative/book/new', BookController.new)
router.post('/administrative/book/edit', BookController.update)
router.get('/administrative/book/edit/:id', BookController.edit)
router.get('/administrative/book/:id', BookController.show)
router.post('/administrative/book', BookController.create)
router.post('/administrative/delete/book/:id', BookController.delete)

router.get('/administrative/reservation', ReservationController.index)
router.get('/administrative/reservation/new', ReservationController.new)
router.post('/administrative/reservation/edit', ReservationController.update)
router.get('/administrative/reservation/edit/:id', ReservationController.edit)
router.post('/administrative/reservation', ReservationController.create)
router.post('/administrative/renovation/:id', ReservationController.renovation)
router.post('/administrative/delete/reservation/:id', ReservationController.delete)



async function authenticate (req, res, next) {
  const session_token = req.cookies["session_token"]
  
  if(!session_token){
    res.redirect('/login')
  }

  let request_error = null
  const response = await axios.post('http://localhost:5000/auth',{},{
    headers:{
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    request_error = error
  }) 
  if(request_error){
    res.redirect('/login')
    return res.end()
  }
  
  const user = response.data.user

  res.locals.user = user
  res.locals.session_token = session_token
  next()
}

async function verify_user_logged(req, res, next){
  const session_token = req.cookies["session_token"]
  let request_error = null

  if(!session_token){
    return next()
  }

  const response = await axios.post('http://localhost:5000/auth',{},{
    headers:{
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    request_error = error
  }) 
  if(request_error){
    return next()
  }
  
  res.redirect('/administrative')  
  return res.end() 
}

module.exports = router