const ApplicationController = require('./application_controller')
const User = require('../model/user')
const Book = require('../model/book')
const Reservation = require('../model/reservation')

class ReservationController extends ApplicationController{
  async reservations(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    let reservations = []

    if(current_user.type === 'employee' || current_user.type === 'admin'){
      reservations = Reservation.all()
    }else{
      reservations = Reservation.where({user_id: current_user.id})
    }

    res.render('pages/reservation/index', {
      title: "Reservas",
      reservations: reservations,
      current_user: current_user
    })
  }

  async reservartionNew(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    let users = User.all()
    let books = Book.all()

    res.render('pages/reservation/form', {
      title: "Painel do Funcionário",
      users: users,
      books: books,
      reservation: null,
      current_user: current_user
    })
  }

  async reservationCreate(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    let reservations = Reservation.all()
    let params = req.body

    Reservation.create({
      user_id: params.user_id,
      book_id: params.book_id,
      rental_date: params.rental_date,
      return_date: params.return_date
    })

    res.render('pages/reservation/index', {
      title: "Reservas",
      reservations: reservations,
      current_user: current_user
    })
  }
  
  async reservartionEdit(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    let users = User.all()
    let books = Book.all()
    let reservation = Reservation.find(req.params.id)

    res.render('pages/reservation/form', {
      title: "Painel do Funcionário",
      users: users,
      books: books,
      reservation: reservation,
      current_user: current_user
    })
  }

  async reservartionUpdate(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    let reservations = Reservation.all()
    let params = req.body
    let reservation = Reservation.find(params.id)

    reservation.update({
      user_id: params.user_id,
      book_id: params.book_id,
      rental_date: params.rental_date,
      return_date: params.return_date
    })

    res.render('pages/reservation/index', {
      title: "Reservas",
      reservations: reservations,
      current_user: current_user
    })
  }

}

module.exports = new ReservationController