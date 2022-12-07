const ApplicationController = require('./application_controller')
const User = require('../model/user')
const Book = require('../model/book')
const Reservation = require('../model/reservation')

class ReservationController extends ApplicationController{
  async index(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    if(!policy.reservation().index()){
      res.status(401)
      return res.end()
    }

    let reservations = []

    if(current_user.type === 'employee' || current_user.type === 'admin'){
      reservations = Reservation.all()
    }else{
      reservations = Reservation.where({user_id: current_user.id})
    }

    let newReserv = []
    newReserv = reservations.map(element => {
      return {
        user_id: element.user_id,
        book_id: element.book_id,
        rental_date: element.rental_date,
        return_date: element.return_date,
        title: element.book().title,
        name: element.user().name,
        id: element.id
      }
    })

    let data = {
      reservations: newReserv
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async new(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().new()){
      res.status(401)
      return res.end()
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
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().create()){
      res.status(401)
      return res.end()
    }

    let reservations = Reservation.all()
    let params = req.body.params

    Reservation.create({
      user_id: params.user_id,
      book_id: params.book_id,
      rental_date: params.rental_date,
      return_date: params.return_date
    })
    let data = {
      reservations: reservations
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }
  
  async edit(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    
    if(!policy.reservation().edit()){
      res.status(401)
      return res.end()
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
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.reservation().update()){
      res.status(401)
      return res.end()
    }

    let reservations = Reservation.all()
    let params = req.body.params
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