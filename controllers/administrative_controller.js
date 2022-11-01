let user = require('../services/user_service')
let book = require('../services/book_service')

class AdministrativeController{
  
  async administrative(req, res){
    res.render('pages/administrative/administrative', {title: "Painel Administrativo"})
  }
  
  async users(req, res){
    res.render('pages/administrative/user/user_dashboard', {
      title: "Usuários",
      users: user
    })
  }

  async user(req, res){
    res.render('pages/administrative/user/user_view', {title: "Usuário"})
  }

  async userCreate(req, res){
    res.render('pages/administrative/user/user_new', {title: "Novo usuário", baseUrl: req.baseUrl})
  }

  async books(req, res){
    res.render('pages/administrative/book/dashboard', {
      title: "Livros",
      books: book
    })
  }

}

module.exports = new AdministrativeController