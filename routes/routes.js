const express = require('express')
const HomeController = require('../controllers/home_controller.js')
const AdministrativeController = require('../controllers/administrative_controller.js')
const EmployeeController = require('../controllers/employee_controller')
const ProfessorController = require('../controllers/professor_controller')
const StudentController = require('../controllers/student_controller')

const router = express.Router()

//Home
router.get('/', HomeController.index)
router.get('/books', HomeController.books)
router.post('/books', AdministrativeController.booksJson)
router.get('/login', HomeController.login)
router.get('/forgotpassword', HomeController.forgotPassword)

//Administrative
router.get('/administrative', AdministrativeController.administrative)

router.get('/administrative/users', AdministrativeController.users)
router.get('/administrative/user/new', AdministrativeController.userNew)
router.post('/administrative/user/edit', AdministrativeController.userUpdate)
router.get('/administrative/user/edit/:id', AdministrativeController.userEdit)
router.get('/administrative/user/:id', AdministrativeController.user)
router.post('/administrative/user', AdministrativeController.userCreate)

router.get('/administrative/books', AdministrativeController.books)
router.get('/administrative/book/new', AdministrativeController.bookNew)
router.post('/administrative/book/edit', AdministrativeController.bookUpdate)
router.get('/administrative/book/edit/:id', AdministrativeController.bookEdit)
router.get('/administrative/book/:id', AdministrativeController.book)
router.post('/administrative/book', AdministrativeController.bookCreate)

//Employee
router.get('/employee', EmployeeController.administrative)
router.get('/employee/reservation', EmployeeController.reservations)
router.get('/employee/reservation/new', EmployeeController.reservartionNew)
router.post('/employee/reservation/edit', EmployeeController.reservartionUpdate)
router.get('/employee/reservation/edit/:id', EmployeeController.reservartionEdit)
router.post('/employee/reservation', EmployeeController.reservationCreate)

//Professor
router.get('/professor', ProfessorController.administrative)
router.get('/professor/book', ProfessorController.book)

//Student
router.get('/student', StudentController.administrative)
router.get('/stundent/book', StudentController.book)

module.exports = router