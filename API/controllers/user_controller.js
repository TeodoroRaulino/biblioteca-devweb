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
    
    const data = {
      users: users
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async show(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)
    let user = User.find(req.params.id)
    
    if(!policy.user(user).show()){
      res.status(401)
      super.return_error(res)
    }

    const data = {
      user: user
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async new(req, res) {
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.user().new()){
      res.status(401)
      super.return_error(res)
    }
    res.status(200)
    return res.end()
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

    const data = {
      user: user
    }
    res.status(200)
    res.send(JSON.stringify(data))
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