const ApplicationController = require('./application_controller')
const axios = require('axios').default
const urlApi = 'http://localhost:5000/'

class UserController extends ApplicationController{
  async index(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token
    console.log(res.locals)
    
    try {
      const response = await axios.get('http://localhost:5000/administrative/users',
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })

      const data = response.data

      
      res.render('pages/user/index', {
        title: "Usuário",
        users: data.users,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      console.log(error)
      res.status(401)
      return super.return_error(res)
    }
  }

  async show(req, res){
    const error = req.query.error
    const id = req.query.id
    const current_user = super.define_user(res)
    
    try {
      const response = await axios.get(urlApi+'administrative/user/'+id)
      const data = JSON.parse(response)
      res.render('pages/user/show', {
        title: "Usuário",
        user: data.user,
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
      const response = await axios.get(urlApi+'administrative/user/new')
      if(response.status === 200){
        res.render('pages/user/form', {
          title: "User formulário",
          baseUrl: req.baseUrl,
          user: null,
          current_user: current_user,
          error: error
        })
      }
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }
  }

  async create(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)

    let params = req.body

    let user = User.create({
      name: params.name,
      cpf: params.cpf,
      identifier: params.identifier,
      email: params.email,
      password: params.password,
      type: params.type
    })

    res.render('pages/user/show', {
      title: "Novo usuário",
      baseUrl: req.baseUrl,
      user: user,
      current_user: current_user,
      error: error
    });
  }

  async edit(req, res) {
    const error = req.query.error
    const id = req.query.id
    const current_user = super.define_user(res)

    try {
      const response = axios.get(urlApi+'administrative/book/'+id)
      const data = response.data
      if(response.status === 200){
        res.render('pages/user/form', {
          title: "Edit",
          user: data.user,
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

    if(!policy.user().update()){
      res.status(401)
      super.return_error(res)
    }

    let user = User.find(req.body.id)
    let params = req.body
    
    user.update({
      name: params.name,
      cpf: params.cpf,
      identifier: params.identifier,
      email: params.email,
      password: params.password,
      type: params.type
    })

    res.render('pages/user/show',{
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl,
      current_user: current_user,
      error: error
    })
  }
}

module.exports = new UserController