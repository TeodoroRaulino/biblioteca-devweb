// const ApplicationController = require('./application_controller')
// const User = require('../model/user')
// const Book = require('../model/book')
// const Reservation = require('../model/reservation')
const axios = require('axios').default

class ReservationController {
  async index(req, res) {
    // const error = req.query.error
    // const [current_user, policy] = super.define_user_and_policy(res)

    // if(!policy.reservation().index()){
    //   res.status(401)
    //   super.return_error(res)
    // }

    // let reservations = []

    // if(current_user.type === 'employee' || current_user.type === 'admin'){
    //   reservations = Reservation.all()
    // }else{
    //   reservations = Reservation.where({user_id: current_user.id})
    // }
    try {
      let response = await axios.get('localhost:5000/administrative/reservation')
      let jsonRes = JSON.parse(response)
      res.render('pages/reservation/index', {
        title: "Reservas",
        reservations: jsonRes.reservations,
        current_user: jsonRes.current_user,
        error: jsonRes.error
      })
    } catch (error) {
      
    }
    
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

    res.render('pages/reservation/form', {
      title: "Painel do Funcionário",
      users: users,
      books: books,
      reservation: null,
      current_user: current_user,
      error: error
    })
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

    res.render('pages/reservation/form', {
      title: "Painel do Funcionário",
      users: users,
      books: books,
      reservation: reservation,
      current_user: current_user,
      error: error
    })
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

    res.render('pages/reservation/index', {
      title: "Reservas",
      reservations: reservations,
      current_user: current_user,
      error: error
    })
  }

}

module.exports = new ReservationController