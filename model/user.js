const DataAccessor = require('../services/data_accessor.js')

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
    const json = generate_json(
      cpf,
      type,
      name,
      email,
      password,
      identifier
    );

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
    const db = DataAccessor('user')
    db.delete(id)
  }

  static where = ({
    cpf = null,
    type = null,
    name = null,
    email = null,
    identifier = null
  }) => {
    const db = new DataAccessor('user')
    let users_cpfs_data = []
    let users_types_data = []
    let users_names_data = []
    let users_emails_data = []
    let users_identifiers_data = []
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

    users_data = users_cpfs_data.concat(
      users_types_data,
      users_names_data,
      users_emails_data,
      users_identifiers_data
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

module.exports = User

let user = User.where({
  cpf: '111111',
  type: 'professor',
  name: 'teste',
  email: '@',
  password: '*****',
  identifier: 'akshfasidfh'
})
console.log(user)