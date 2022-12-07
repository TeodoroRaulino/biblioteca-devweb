const ApplicationController = require('./application_controller')

const axios = require('axios').default
const urlApi = 'http://localhost:5000/'

class ReservationController extends ApplicationController{
  async index(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    try {
      const response = await axios.get(urlApi+'administrative/reservation', {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
      const data = response.data

      res.render('pages/reservation/index', {
        title: "Reservas",
        reservations: data.reservations,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      console.log(error.message)
      res.status(401)
      return super.return_error(res)
    }
    
    }

  async new(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    try {
      const response = await axios.get(urlApi+'administrative/reservation/new', {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
      const data = response.data
      if(response.status === 200){
        res.render('pages/reservation/form', {
          title: "Painel do Funcionário",
          users: data.users,
          books: data.books,
          reservation: null,
          current_user: current_user,
          error: error
        })
      }
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }
  }

  async create(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    let params = req.body

    const response = await axios.post(urlApi+'administrative/reservation',{
      params
    },{
      headers:{
        'Cookie': `session_token=${session_token}`
      }
    }).catch((error) => {
      res.status(401)
      return super.return_error(res)
    })

    res.redirect('/administrative/reservation')
    return res.end()
  }
  
  async edit(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token
    const id = req.params.id

    try {
      const response = await axios.get(urlApi+'administrative/reservation/edit/'+id, {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
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
      res.status(401)
      return super.return_error(res)
    }
  }

  async update(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token
    let params = req.body


    const response = await axios.put(urlApi+'administrative/reservation/edit',{
      params
    },{
      headers:{
        'Cookie': `session_token=${session_token}`
      }
    }).catch((error) => {
      res.status(401)
      return super.return_error(res)
    })

    res.redirect('/administrative/reservation')
    return res.end()
  }

  async renovation(req, res) {
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token
    const id = req.params.id
    let params = req.body

    const response = await axios.patch(urlApi+'administrative/renovation/'+id,{
    },{
      headers:{
        'Cookie': `session_token=${session_token}`
      }
    }).catch((error) => {
      console.log(error.message)
      res.status(401)
      return super.return_error(res)
    })

    res.redirect('/administrative/reservation')
    return res.end()
  }

  async delete(req, res){
    const id = req.params.id
    const session_token = res.locals.session_token
    const response = await axios.delete(urlApi+ 'administrative/reservation/'+id,
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
    
    res.status(204)
    res.redirect('/administrative/reservation')
    return res.end()
  }

}

module.exports = new ReservationController