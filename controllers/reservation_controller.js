const ApplicationController = require('./application_controller')
const User = require('../model/user')
const Book = require('../model/book')
const Reservation = require('../model/reservation')

class ReservationController extends ApplicationController{
  async index(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().index()){
      res.status(401)
      return res.end()
    }

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

  async new(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().new()){
      res.status(401)
      return res.end()
    }

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

  async create(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().create()){
      res.status(401)
      return res.end()
    }

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
  
  async edit(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().edit()){
      res.status(401)
      return res.end()
    }

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

  async update(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().update()){
      res.status(401)
      return res.end()
    }

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