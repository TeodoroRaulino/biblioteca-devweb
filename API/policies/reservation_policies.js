class ReservationPolicies{
    /** 
  * @param logged_user
  * @param reservation
  */

  constructor(logged_user, reservation){
    this.logged_user = logged_user
    this.reservation = reservation
  }

  index(){
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
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return false
      case 'employee':
        return true
      case 'professor':
        return false
      default:
        return false
    }
  }

  create(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return false
      case 'employee':
        return true
      case 'professor':
        return false
      default:
        return false
    }
  }

  edit(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return false
      case 'employee':
        return true
      case 'professor':
        return false
      default:
        return false
    }
  }

  update(){
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return false
      case 'employee':
        return true
      case 'professor':
        return false
      default:
        return false
    }
  }

  renovation(){
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
    switch (this.logged_user.type) {
      case 'admin':
        return true
      case 'student':
        return false
      case 'employee':
        return true
      case 'professor':
        return false
      default:
        return false
    }
  }

  increase_return_date(){
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

module.exports = ReservationPolicies