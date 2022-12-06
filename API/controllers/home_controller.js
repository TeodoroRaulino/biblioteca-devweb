const Book = require('../model/book')
const Authentication = require('../services/authentication')

class HomeController{

  async index(req, res){
    const book = Book.all()

    res.render('pages/index', {
      title: "Home",
      baseUrl: req.baseUrl,
      books: book
    })
  }

  async login(req, res){
    res.render('pages/login', {
      title: "Login",
      baseUrl: req.baseUrl
    })
  }

  async authenticate(req, res){
    const email = req.body["email"]
    const password = req.body["password"]
    const token = Authentication.login(email, password)

    if(token){
      res.cookie("session_token", token)
      return res.redirect('/administrative');
    }
    return res.redirect('/login')
  }

  async logout(req, res){
    const session_token = req.cookies["session_token"]
    Authentication.logout(session_token)
    return res.redirect('/login')
  }

  async forgotPassword(req, res){
    res.render('pages/forgotPassword', {
      title: "Recuperar senha",
      baseUrl: req.baseUrl
    })
  }
}

module.exports = new HomeController