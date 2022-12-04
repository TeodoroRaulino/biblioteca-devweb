class AdministrativeController{
  
  async administrative(req, res){
    const current_user = res.locals.user

    res.render('pages/administrative', {
      title: "Painel Administrativo",
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }
}

module.exports = new AdministrativeController