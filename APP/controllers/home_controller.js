const axios = require('axios').default

class HomeController{

  async index(req, res){
    try {
      let response = await axios.get('http://localhost:5000/')
      let jsonRes = response.data
      res.render('pages/index', {
        title: "Home",
        books: jsonRes.books
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async login(req, res){
    res.render('pages/login', {
      title: "Login"
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