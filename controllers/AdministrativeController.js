class AdministrativeController{

  async administrative(req, res){
    res.render('pages/administrative/administrative', {title: "Painel Administrativo"})
  }

  async users(req, res){
    res.render('pages/administrative/user/user_dashboard', {title: "Usuários"})
  }

  async books(req, res){
    res.render('pages/administrative/book/dashboard', {title: "Livros"})
  }

}

module.exports = AdministrativeController