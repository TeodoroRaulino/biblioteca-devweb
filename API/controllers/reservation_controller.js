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
      reservations = Reservation.where({deleted: "false"})
    }else{
      reservations = Reservation.where({user_id: current_user.id, deleted: "false"})
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

    let users = User.where({deleted: "false"})
    let books = Book.where({deleted: "false"})
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

    let reservations = Reservation.where({deleted: "false"})
    let params = req.body.params

    const bookReserv = Reservation.where({book_id: params.book_id, deleted: "false"})
    let book = Book.find(params.book_id)

    if(book.quantity > bookReserv.length){
      Reservation.create({
        user_id: params.user_id,
        book_id: params.book_id,
        rental_date: params.rental_date,
        return_date: params.return_date
      })
    }else{
      res.status(400)
      return res.end() 
    }

    let data = {
      reservations: reservations
    }
    res.status(201)
    return res.send(JSON.stringify(data))
  }
  
  async edit(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    
    if(!policy.reservation().edit()){
      res.status(401)
      return res.end()
    }

    let users = User.where({deleted: "false"})
    let books = Book.all({deleted: "false"})
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

    let reservations = Reservation.where({deleted: "false"})
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

  async renovation(req, res) {
    const [current_user, policy] = super.define_user_and_policy(res)
    
    if(!policy.reservation().renovation()){
      res.status(401)
      return res.end()
    }
    
    let params = req.params.id
    let reservation = Reservation.find(params)
    var dateRenovation = new Date()
    
    dateRenovation.setMonth(dateRenovation.getMonth() + 1)
    dateRenovation = dateRenovation.toISOString().split('T')[0]

    reservation.update({
      return_date: dateRenovation
    })
    res.status(200)
    return res.end() 
  }

  async delete(req, res){
    const id = req.params.id
    Reservation.delete(id)

    res.status(204)
    return res.end();
  }
}

module.exports = new ReservationController