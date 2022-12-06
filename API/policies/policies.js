const UserPolicies = require('./user_policies')
const BookPolicies = require('./book_policies')
const ReservationPolicies = require('./reservation_policies')

class Policies{
  /** 
  * @param logged_user
  */
  constructor(logged_user){
    this.logged_user = logged_user
  }

  user(resource = null){
    return new UserPolicies(this.logged_user, resource)
  }

  book(resource = null){
    return new BookPolicies(this.logged_user, resource)
  }

  reservation(resource = null){
   return new ReservationPolicies(this.logged_user, resource)
  }
}

module.exports = Policies