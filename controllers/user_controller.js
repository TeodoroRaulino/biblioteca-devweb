const User = require('./../model/user');

class UserController{
  async users(req, res){
    const current_user = res.locals.user
    let users = User.all()

    res.render('pages/user/index', {
      title: "Usuários",
      users: users,
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }

  async user(req, res){
    const current_user = res.locals.user
    let user = User.find(req.params.id)

    res.render('pages/user/show', {
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }

  async userNew(req, res) {
    const current_user = res.locals.user

    res.render('pages/user/form', {
      title: "User formulário",
      baseUrl: req.baseUrl,
      user: null,
      current_user: current_user
    })
  }

  async userCreate(req, res){
    const current_user = res.locals.user
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
      current_user: current_user
    });
  }

  async userEdit(req, res) {
    const current_user = res.locals.user
    let user = User.find(req.params.id)

    res.render('pages/user/form', {
      title: "Edit",
      user: user,
      current_user: current_user
    })
  }

  async userUpdate(req, res) {
    const current_user = res.locals.user
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
      current_user: current_user
    })
  }
}

module.exports = new UserController