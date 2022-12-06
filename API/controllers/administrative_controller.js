const ApplicationController = require('./application_controller')

class AdministrativeController extends ApplicationController{
  
  async administrative(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    let data = {
      current_user: current_user,
      error: error
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }
}

module.exports = new AdministrativeController