const User = require('./../model/user');
const Book = require('./../model/book');

let user = require('../services/user_service')
let book = require('../services/book_service')

class AdministrativeController{
  
  async administrative(req, res){
    res.render('pages/administrative/administrative', {
      title: "Painel Administrativo",
      baseUrl: req.baseUrl
    })
  }
  
  async users(req, res){
    res.render('pages/administrative/user/index', {
      title: "Usuários",
      users: user,
      baseUrl: req.baseUrl
    })
  }

  async user(req, res){
    let user = User.find(req.params.id);

    res.render('pages/administrative/user/show', {
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl
    })
  }

  async userCreate(req, res){
    res.render('pages/administrative/user/new', {title: "Novo usuário", baseUrl: req.baseUrl})
  }

  async books(req, res){
    res.render('pages/administrative/book/dashboard', {
      title: "Livros",
      books: book,
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new AdministrativeController