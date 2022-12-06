const ApplicationController = require('./application_controller')
const User = require('../model/user') 

class UserController extends ApplicationController{
  async index(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)
    let users = User.all()
    
    if(!policy.user().index()){
      res.status(401)
      super.return_error(res)
    }
    
    res.render('pages/user/index', {
      title: "Usuários",
      users: users,
      baseUrl: req.baseUrl,
      current_user: current_user,
      error: error
    })
  }

  async show(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)
    let user = User.find(req.params.id)
    
    if(!policy.user(user).show()){
      res.status(401)
      super.return_error(res)
    }

    res.render('pages/user/show', {
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl,
      current_user: current_user,
      error: error
    })
  }

  async new(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.user().new()){
      res.status(401)
      super.return_error(res)
    }

    res.render('pages/user/form', {
      title: "User formulário",
      baseUrl: req.baseUrl,
      user: null,
      current_user: current_user,
      error: error
    })
  }

  async create(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.user().create()){
      res.status(401)
      return super.return_error(res)
    }

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
    const [current_user, policy] = super.define_user_and_policy(res)
    
    if(!policy.user().edit()){
      res.status(401)
      super.return_error(res)
    }

    let user = User.find(req.params.id)

    res.render('pages/user/form', {
      title: "Edit",
      user: user,
      current_user: current_user,
      error: error
    })
  }

  async update(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

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