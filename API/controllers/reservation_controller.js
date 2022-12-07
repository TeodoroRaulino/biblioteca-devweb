const ApplicationController = require('./application_controller')
const User = require('../model/user')
const Book = require('../model/book')
const Reservation = require('../model/reservation')

class ReservationController extends ApplicationController{
  async index(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().index()){
      res.status(401)
      super.return_error(res)
    }

    let reservations = []

    if(current_user.type === 'employee' || current_user.type === 'admin'){
      reservations = Reservation.all()
    }else{
      reservations = Reservation.where({user_id: current_user.id})
    }

    let data = {
      reservations: reservations
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async new(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().new()){
      res.status(401)
      super.return_error(res)
    }

    let users = User.all()
    let books = Book.all()
    const data = {
      books: books,
      users: users
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async create(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().create()){
      res.status(401)
      super.return_error(res)
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
      current_user: current_user,
      error: error
    })
  }
  
  async edit(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)
    
    if(!policy.reservation().edit()){
      res.status(401)
      super.return_error(res)
    }

    let users = User.all()
    let books = Book.all()
    let reservation = Reservation.find(req.params.id)

    const data = {
      books: books,
      users: users,
      reservation: reservation
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async update(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().update()){
      res.status(401)
      super.return_error(res)
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
    
    const data = {
      reservations: reservations,
      params: params,
      reservation: reservation
    }
    res.status(200)
    return res.send(JSON.stringify(data))

  }

}

module.exports = new ReservationController