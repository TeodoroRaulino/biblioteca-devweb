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
router.get('/login', HomeController.login)

//Administrative
router.get('/administrative', AdministrativeController.administrative)
router.get('/administrative/users', AdministrativeController.users)
router.get('/administrative/user', AdministrativeController.user)
router.get('/administrative/books', AdministrativeController.books)

//Employee
router.get('/employee', EmployeeController.administrative)

//Professor
router.get('/professor', ProfessorController.administrative)
router.get('/professor/book', ProfessorController.book)

//Student
router.get('/student', StudentController.administrative)
router.get('/stundent/book', StudentController.book)

module.exports = router