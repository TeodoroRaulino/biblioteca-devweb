const express = require('express')
const HomeController = require('../controllers/home_controller.js')
const AdministrativeController = require('../controllers/administrative_controller.js')
const EmployeeController = require('../controllers/employee_controller')
const ProfessorController = require('../controllers/professor_controller')
const StudentController = require('../controllers/student_controller')
const Authentication = require('../services/authentication')

const router = express.Router()

//Home
router.get('/', HomeController.index)
router.get('/books', HomeController.books)
router.post('/books', AdministrativeController.booksJson)
router.get('/login', verify_user_logged, HomeController.login)
router.post('/login', HomeController.authenticate)
router.post('/logout', HomeController.logout)
router.get('/forgotpassword', HomeController.forgotPassword)

//Administrative
router.get('/administrative', authenticate, AdministrativeController.administrative) //  SÓ PRECISA DE UM .administrative, ITALO DO FUTURO - ARROMBADO

router.get('/administrative/users', authenticate, AdministrativeController.users)
router.get('/administrative/user/new', authenticate, AdministrativeController.userNew)
router.post('/administrative/user/edit', authenticate, AdministrativeController.userUpdate)
router.get('/administrative/user/edit/:id', authenticate, AdministrativeController.userEdit)
router.get('/administrative/user/:id', authenticate, AdministrativeController.user)
router.post('/administrative/user', authenticate, AdministrativeController.userCreate)

router.get('/administrative/books', authenticate, AdministrativeController.books)
router.get('/administrative/book/new', authenticate, AdministrativeController.bookNew)
router.post('/administrative/book/edit', authenticate, AdministrativeController.bookUpdate)
router.get('/administrative/book/edit/:id', authenticate, AdministrativeController.bookEdit)
router.get('/administrative/book/:id', authenticate, AdministrativeController.book)
router.post('/administrative/book', authenticate, AdministrativeController.bookCreate)

//Employee
router.get('/employee', authenticate, EmployeeController.administrative)
router.get('/employee/reservation', authenticate, EmployeeController.reservations)
router.get('/employee/reservation/new', authenticate, EmployeeController.reservartionNew)
router.post('/employee/reservation/edit', authenticate, EmployeeController.reservartionUpdate)
router.get('/employee/reservation/edit/:id', authenticate, EmployeeController.reservartionEdit)
router.post('/employee/reservation', authenticate, EmployeeController.reservationCreate)

//Professor
router.get('/professor', authenticate, ProfessorController.administrative)
router.get('/professor/book', authenticate, ProfessorController.book) // MY BOOKS ITALO DO FUTURO, VAI VIRAR RESERVATION - line 39

//Student
router.get('/student', authenticate, StudentController.administrative)
router.get('/stundent/book', authenticate, StudentController.book)

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