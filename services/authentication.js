const User = require('../model/user');
const DataAccessor = require('./data_accessor');
const jwt = require('jsonwebtoken');

class Authenticate{
  static login(email, password){
    const user = User.where({email: email})[0]
    console.log(user)

    if(user && user.password === password){
      const token = generate_jwt(user)
      return token
    }

    return false
  }
  
  static validate_token(user_session_token){
    const db = new DataAccessor("session_tokens")
    const register = db.where("session_token", user_session_token)[0]

    try{
      var decoded = jwt.verify(register.session_token, 'shhhhh');
      const user = User.find(decoded.sub)
      
      return user
    }catch(error){
      return false
    }
  }
  
  static logout(user_session_token){
    const db = new DataAccessor("session_tokens")
    const register = db.where("session_token", user_session_token)[0]
    db.delete(register.id)

    const valid = Authenticate.validate_token(user_session_token)
    
    return !valid
  }
}

function generate_jwt(user){
  const db = new DataAccessor("session_tokens")
  const payload = {
    sub: user.id,
    email: user.email
  }
  
  const jwtToken = jwt.sign(payload, 'shhhhh', { expiresIn: '1h' });

  db.create({session_token: jwtToken})
  return jwtToken
}


module.exports = Authenticate


Authenticate.logout("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImVtYWlsIjoibWF1cmljaW9AYWx1IiwiaWF0IjoxNjcwMTAzMDgwLCJleHAiOjE2NzAxMDY2ODB9.SpR5ilpqLPY3tDp-M8EXn6jPxRRcjtyyUJWSoCHpr80")

const valid = Authenticate.validate_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImVtYWlsIjoibWF1cmljaW9AYWx1IiwiaWF0IjoxNjcwMTAzMDgwLCJleHAiOjE2NzAxMDY2ODB9.SpR5ilpqLPY3tDp-M8EXn6jPxRRcjtyyUJWSoCHpr80")
console.log(valid)