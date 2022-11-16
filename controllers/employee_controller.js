const User = require('../model/user')
const Book = require('../model/book')
const Reservation = require('../model/reservation')

class EmployeeController {
  async administrative(req, res) {
    res.render('pages/employee/administrative', {
      title: "Painel do Funcionário"
    })
  }

  async reservations(req, res) {
    let reservations = Reservation.all()

    res.render('pages/employee/reservation/index', {
      title: "Reservas",
      reservations: reservations
    })
  }

  async reservartionNew(req, res) {
    let users = User.all()
    let books = Book.all()

    res.render('pages/employee/reservation/form', {
      title: "Painel do Funcionário",
      users: users,
      books: books,
      reservation: null
    })
  }

  async reservationCreate(req, res) {
    let reservations = Reservation.all()
    let params = req.body

    Reservation.create({
      user_id: params.user_id,
      book_id: params.book_id,
      rental_date: params.rental_date,
      return_date: params.return_date
    })

    res.render('pages/employee/reservation/index', {
      title: "Reservas",
      reservations: reservations
    })
  }

  async reservartionEdit(req, res) {
    let users = User.all()
    let books = Book.all()
    let reservation = Reservation.find(req.params.id)

    res.render('pages/employee/reservation/form', {
      title: "Painel do Funcionário",
      users: users,
      books: books,
      reservation: reservation
    })
  }

  async reservartionUpdate(req, res) {
    let reservations = Reservation.all()
    let params = req.body
    let reservation = Reservation.find(params.id)

    reservation.update({
      user_id: params.user_id,
      book_id: params.book_id,
      rental_date: params.rental_date,
      return_date: params.return_date
    })

    res.render('pages/employee/reservation/index', {
      title: "Reservas",
      reservations: reservations
    })
  }
}

module.exports = new EmployeeController