class HomeController{

  async index(req, res){
    res.render('pages/index', {title: "Home"})
  }

  async login(req, res){
    res.render('pages/login', {title: "Login"})
  }

  async books(req, res){
    res.render('pages/books', {title: "Livros"})
  }

}

module.exports = HomeController