const ApplicationController = require('./application_controller');

const axios = require('axios').default;

class AdministrativeController extends ApplicationController{
  
  async administrative(req, res){
    const error = req.query.error
    const current_user = res.locals.user

    res.render('pages/administrative', {
      title: "Painel Administrativo",
      current_user: current_user,
      error: error
    })
  }
}

module.exports = new AdministrativeController