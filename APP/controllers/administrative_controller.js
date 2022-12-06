const axios = require('axios').default;

class AdministrativeController{
  
  async administrative(req, res){
    // const error = req.query.error
    // const [current_user, policy] = super.define_user_and_policy(res)

    try {
      let response = await axios.get('localhost:5000/administrative')
      let jsonRes = JSON.parse(response)
      res.render('pages/administrative', {
        title: "Painel Administrativo",
        current_user: jsonRes.current_user,
        error: jsonRes.error
      })
    } catch (error) {
      
    }

  }
}

module.exports = new AdministrativeController