const ApplicationController = require('./application_controller')

class AdministrativeController extends ApplicationController{
  
  async administrative(req, res){
    const [current_user, policy] = super.define_user_and_policy(res)

    res.render('pages/administrative', {
      title: "Painel Administrativo",
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }
}

module.exports = new AdministrativeController