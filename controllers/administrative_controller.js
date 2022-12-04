const ApplicationController = require('./application_controller')

class AdministrativeController extends ApplicationController{
  
  async administrative(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    res.render('pages/administrative', {
      title: "Painel Administrativo",
      baseUrl: req.baseUrl,
      current_user: current_user,
      error: error
    })
  }
}

module.exports = new AdministrativeController