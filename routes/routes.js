const express = require('express')
const HomeController = require('../controllers/HomeController.js')
const AdministrativeController = require('../controllers/AdministrativeController.js')
const EmployeeController = require('../controllers/EmployeeController')
const ProfessorController = require('../controllers/ProfessorController')
const StudentController = require('../controllers/StudentController')

const router = express.Router()
const homeController = new HomeController
const administrativeController = new AdministrativeController
const employeeController = new EmployeeController
const professorController = new ProfessorController
const studentController = new StudentController

//Home
router.get('/', homeController.index)
router.get('/books', homeController.books)
router.get('/login', homeController.login)

//Administrative
router.get('/administrative', administrativeController.administrative)
router.get('/administrative/users', administrativeController.users)
router.get('/administrative/books', administrativeController.books)

//Employee
router.get('/employee', employeeController.administrative)

//Professor
router.get('/professor', professorController.administrative)
router.get('/professor/book', professorController.book)

//Student
router.get('/student', studentController.administrative)
router.get('/stundent/book', studentController.book)

module.exports = router