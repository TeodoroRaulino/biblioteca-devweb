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

  index(){
    if(this.logged_user.type === 'admin'){
      return true;
    }
    return false;
  }

  show(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return true
      case 'employee':
        return true
      case 'professor':
        return true
      default:
        return false
    }
  }

  new(){
    if(this.logged_user.type === 'admin'){
      return true;
    }
    return false;
  }

  create(){
    if(this.logged_user.type === 'admin'){
      return true;
    }
    return false;
  }

  edit(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return true
      case 'employee':
        return true
      case 'professor':
        return true
      default:
        return false
    }
  }

  update(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return true
      case 'employee':
        return true
      case 'professor':
        return true
      default:
        return false
    }
  }

  delete(){
    if(this.logged_user.type === 'admin'){
      return true;
    }
    return false;
  }

  self_delete(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return true
      case 'employee':
        return true
      case 'professor':
        return true
      default:
        return false
    }
  }
}

module.exports = UserPolicies