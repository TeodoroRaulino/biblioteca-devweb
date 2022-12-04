const { index } = require("../controllers/home_controller")

class UserPolicies{
  /**
  * @param logged_user 
  * @param user
  */

  constructor(logged_user, user){
    this.logged_user = logged_user
    this.user = user
  }

  new(){}
  create(){}
  edit(){}
  update(){}
  delete(){}
  index(){}
  show(){}
}

module.exports = UserPolicies