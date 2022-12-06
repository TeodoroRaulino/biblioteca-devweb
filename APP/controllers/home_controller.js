const Book = require('../model/book')
const Authentication = require('../services/authentication')
const axios = require('axios').default

class HomeController{

  async index(req, res){
    try {
      let response = await axios.get('localhost:5000/administrative')
      let jsonRes = JSON.parse(response)
      res.render('pages/index', {
        title: "Home",
        books: jsonRes.book
      })
    } catch (error) {
      
    }
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