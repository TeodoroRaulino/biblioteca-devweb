const DataAccessor = require('../services/data_accessor.js')
const bcrypt = require('bcrypt');
class User{
  /** 
  * @param id
  * @param cpf
  * @param type
  * @param name
  * @param email
  * @param password
  * @param identifier
  */

  constructor(
    cpf,
    type,
    name,
    email,
    password,
    identifier
  ){
    this.cpf = cpf;
    this.type = type;
    this.name = name;
    this.email = email;
    this.password = password;
    this.identifier = identifier;
  }

  save(){
    if(this.id == null){
      const data = User.create({
        cpf: this.cpf,
        type: this.type,
        name: this.name,
        email: this.email,
        password: this.password,
        identifier: this.identifier
      })
      this.id = data.id  
    }
    else{
      return this.update({})
    }
  }

  static create = ({
    cpf = null,
    type = null,
    name = null,
    email = null,
    password = null,
    identifier = null
  }) => {

    const db = new DataAccessor('user');
    password = cryptography(password)
    const json = generate_json(
      cpf,
      type,
      name,
      email,
      password,
      identifier
    );
    json['deleted'] = 'false'

    let data = db.create(json)
    let user = new User(
      data["cpf"],
      data["type"],
      data["name"],
      data["email"],
      data["password"],
      data["identifier"]
    )
    user.id = data["id"];

    return user;
  }

  update = ({
    cpf = null,
    type = null,
    name = null,
    email = null,
    password = null,
    identifier = null
  }) => {
    const db = new DataAccessor('user');

    if(cpf == null){
      cpf = this.cpf;
    }
    if(type == null){
      type = this.type;
    }
    if(name == null){
      name = this.name
    }
    if(email == null){
      email = this.email
    }
    if(password == null){
      password = this.password
    }else{
      password = cryptography(password)
    }
    if(identifier == null){
      identifier = this.identifier
    }

    const json = generate_json(
      cpf,
      type,
      name,
      email,
      password,
      identifier,
      this.id
    )
    
    json['deleted'] = 'false'
    let data = db.update(json);

    this.cpf = data["cpf"]
    this.type = data["type"]
    this.name = data["name"]
    this.email = data["email"]
    this.password = data["password"]
    this.identifier = data["identifier"]

    return this
  }

  delete(){
    const db = new DataAccessor('user')
    db.delete(this.id)
    this.cpf = null;
    this.type = null;
    this.name = null;
    this.email = null;
    this.password = null;
    this.identifier = null;
    this.id = null;
  }

  json(){
    let json = {
      "cpf": this.cpf,
      "type": this.type,
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "identifier": this.identifier,
      "id": this.id,
    }
    return json
  }

  static find(id){
    const db = new DataAccessor('user')
    let data = db.find(id);
    let user  = new User(
      data["cpf"],
      data["type"],
      data["name"],
      data["email"],
      data["password"],
      data["identifier"]
    );
    user.id = data["id"]

    return user;
  }

  static delete(id){
    const db = new DataAccessor('user')
    db.delete(id)
  }

  static where = ({
    cpf = null,
    type = null,
    name = null,
    email = null,
    identifier = null,
    deleted = null
  }) => {
    const db = new DataAccessor('user')
    let users_cpfs_data = []
    let users_types_data = []
    let users_names_data = []
    let users_emails_data = []
    let users_identifiers_data = []
    let users_deleted_data = []
    let users_data = []
    let users = []

    if(cpf){
      users_cpfs_data = db.where('cpf', cpf)
    }
    if(type){
      users_types_data = db.where('type', type)
    }
    if(name){
      users_names_data = db.where('name', name)
    }
    if(email){
      users_emails_data = db.where('email', email)
    }
    if(identifier){
      users_identifiers_data = db.where('identifier', identifier)
    }
    if(deleted){
      users_deleted_data = db.where('deleted', deleted)
    }

    users_data = users_cpfs_data.concat(
      users_types_data,
      users_names_data,
      users_emails_data,
      users_identifiers_data,
      users_deleted_data
    )

    if(cpf){
      users_data = users_data.filter(element => element["cpf"].includes(cpf));
    }
    if(type) {
      users_data = users_data.filter(element => element["type"].includes(type));
    }
    if(name){
      users_data = users_data.filter(element => element["name"].includes(name));
    }
    if(email){
      users_data = users_data.filter(element => element["email"].includes(email));
    }
    if(identifier){
      users_data = users_data.filter(element => element["identifier"].includes(identifier));
    }
    if(deleted){
      users_data = users_data.filter(element => element["deleted"].includes(deleted));
    }

    users_data = users_data.filter((arr, index, self) => 
       index === self.findIndex((t) => (t.id === arr.id)))

    users = users_data.map((data)=>{
      let instanced_user =  new User(
        data["cpf"],
        data["type"],
        data["name"],
        data["email"],
        data["password"],
        data["identifier"]
      );
      instanced_user.id = data["id"];

      return instanced_user;
    })

    return users; 
  }

  static all(){
    const db = new DataAccessor('user')
    let users_data = db.all()

    let users = users_data.map((data)=>{
      let instanced_user =  new User(
        data["cpf"],
        data["type"],
        data["name"],
        data["email"],
        data["password"],
        data["identifier"]
      );
      instanced_user.id = data["id"];

      return instanced_user;
    })

    return users; 
  }

  valid(email = this.email){
    const users_same_email = User.where({email: email})

    if(users_same_email.length > 0){
      if(users_same_email[0].id == this.id){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
  }
}

function generate_json(cpf, type, name, email, password, identifier, id = null){
  return {
    "id": id,
    "cpf": cpf,
    "type": type,
    "name": name,
    "email": email,
    "password": password,
    "identifier": identifier
  }
}

function cryptography(password){
  const hash = bcrypt.hashSync(password, 10)
  return hash
}

module.exports = User