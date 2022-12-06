const Book = require('../model/book')
const Authentication = require('../services/authentication')

class HomeController{

  async index(req, res){
    const book = Book.all()

    let data = {
      books: book
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }

  async login(req, res){
    
    res.status(200)
  }

  async validateTokenAuth(req, res) {
    const session_token = req.body.session_token
    const user = Authentication.validate_token(session_token.toString())

    if(user) {
      const data = {
        user: user
      }
      res.status(200)
      res.send(JSON.stringify(data))
      res.end()
    }
    
    res.status(401)
    res.end()

 
  }

  async authenticate(req, res) {
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