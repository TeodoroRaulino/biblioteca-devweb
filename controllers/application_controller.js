const Policies = require("../policies/policies")

class ApplicationController{
  define_user_and_policy(res){
    const logged_user = res.locals.user
    const policy = new Policies(logged_user)

    return [logged_user, policy]
  }
}

module.exports = ApplicationController