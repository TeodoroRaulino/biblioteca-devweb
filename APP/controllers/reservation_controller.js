const axios = require('axios').default
const urlApi = 'http://localhost:5000/'

class ReservationController {
  async index(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)

    try {
      const response = await axios.get(urlApi+'administrative/reservations')
      const data = JSON.parse(response.data)

      res.render('pages/reservation/index', {
        title: "Reservas",
        reservations: data.reservations,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }
    
    }

  async new(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)

    try {
      const response = await axios.get(urlApi+'administrative/reservations/new')
      const data = response.data
  
      res.render('pages/reservation/form', {
        title: "Painel do Funcionário",
        users: data.users,
        books: data.books,
        reservation: null,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }
  }

  async create(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)

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
    const current_user = super.define_user(res)
    
    if(!policy.reservation().edit()){
      res.status(401)
      super.return_error(res)
    }

    try {
      const response = await axios.get(urlApi+'administrative/reservations/edit')
      const data = response.data
      
      if(response.status === 200){
        res.render('pages/reservation/form', {
          title: "Painel do Funcionário",
          users: data.users,
          books: data.books,
          reservation: data.reservation,
          current_user: current_user,
          error: error
        })
      }
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }
  }

  async update(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)

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