const DataAccessor = require('../services/data_accessor.js')
const User = require('./user')
const Book = require('./book')

class Reservation{
  /** 
  * @param id
  * @param user_id
  * @param book_id
  * @param rental_date
  * @param return_date
  */

  constructor(
    user_id,
    book_id,
    rental_date,
    return_date,
  ){
    this.user_id = user_id;
    this.book_id = book_id;
    this.rental_date = rental_date;
    this.return_date = return_date;
  }

  save(){
    if(this.id == null){
      const data = Reservation.create({
        user_id: this.user_id,
        book_id: this.book_id,
        rental_date: this.rental_date,
        return_date: this.return_date,
      })
      this.id = data.id
    }
    else{
      return this.update({})
    }
  }

  static create = ({
    user_id = null,
    book_id = null,
    rental_date = null,
    return_date = null
  }) => {
    const db = new DataAccessor('reservation');
    const json = generate_json(
      user_id,
      book_id,
      rental_date,
      return_date
    );
    
    json['deleted'] = 'false'
    let data = db.create(json)
    let reservation = new Reservation(
      data["user_id"],
      data["book_id"],
      data["rental_date"],
      data["return_date"],
    )
    reservation.id = data["id"];

    return reservation;
  }

  update = ({
    user_id = null,
    book_id = null,
    rental_date = null,
    return_date = null
  }) => {
    const db = new DataAccessor('reservation');

    if(user_id == null){
      user_id = this.user_id;
    }
    if(book_id == null){
      book_id = this.book_id;
    }
    if(rental_date == null){
      rental_date = this.rental_date
    }
    if(return_date == null){
      return_date = this.return_date
    }

    const json = generate_json(
      user_id,
      book_id,
      rental_date,
      return_date,
      this.id
    )
    json['deleted'] = 'false'
    let data = db.update(json);

    this.user_id = data["user_id"]
    this.book_id = data["book_id"]
    this.rental_date = data["rental_date"]
    this.return_date = data["return_date"]

    return this
  }

  user(){
    let user = User.find(this.user_id)

    return user;
  }

  book(){
    let book = Book.find(this.book_id)

    return book;
  }

  delete(){
    const db = new DataAccessor('reservation')
    db.delete(this.id)
    this.user_id = null;
    this.book_id = null;
    this.rental_date = null;
    this.return_date = null;
    this.id = null;
  }

  static find(id){
    const db = new DataAccessor('reservation')
    let data = db.find(id);
    let reservation  = new Reservation(
      data["user_id"],
      data["book_id"],
      data["rental_date"],
      data["return_date"]
    );
    reservation.id = data["id"]

    return reservation;
  }

  static delete(id){
    const db = new DataAccessor('reservation')
    db.delete(id)
  }

  static where = ({
    user_id = null,
    book_id = null,
    rental_date = null,
    return_date = null,
    deleted = null
  }) => {
    const db = new DataAccessor('reservation')
    let user_ids_data = []
    let book_ids_data = []
    let rental_dates_data = []
    let return_dates_data = []
    let reservations_data = []
    let deleted_data = []
    let reservations = []

    if(user_id){
      user_ids_data = db.where('user_id', user_id.toString())
    }
    if(book_id){
      book_ids_data = db.where('book_id', book_id.toString())
    }
    if(rental_date){
      rental_dates_data = db.where('rental_date', rental_date)
    }
    if(return_date){
      return_dates_data = db.where('return_date', return_date)
    }
    if(deleted){
      deleted_data = db.where('deleted', deleted)
    }

    reservations_data = user_ids_data.concat(
      book_ids_data,
      rental_dates_data,
      return_dates_data,
      deleted_data
    )

    if(user_id){
      reservations_data = reservations_data.filter(element => element["user_id"].includes(user_id));
    }
    if(book_id) {
      reservations_data = reservations_data.filter(element => element["book_id"].includes(book_id));
    }
    if(rental_date){
      reservations_data = reservations_data.filter(element => element["rental_date"].includes(rental_date));
    }
    if(return_date){
      reservations_data = reservations_data.filter(element => element["return_date"].includes(return_date));
    }
    if(deleted){
      reservations_data = reservations_data.filter(element => element['deleted'].includes(deleted))
    }

    reservations_data = reservations_data.filter((arr, index, self) => 
       index === self.findIndex((t) => (t.id === arr.id)))

    reservations = reservations_data.map((data)=>{
      let instanced_reservation =  new Reservation(
        data["user_id"],
        data["book_id"],
        data["rental_date"],
        data["return_date"]
      );
      instanced_reservation.id = data["id"];

      return instanced_reservation;
    })

    return reservations; 
  }

  static all(){
    const db = new DataAccessor('reservation')
    let reservations_data = db.all()

    let reservations = reservations_data.map((data)=>{
      let instanced_reservation =  new Reservation(
        data["user_id"],
        data["book_id"],
        data["rental_date"],
        data["return_date"]
      );
      instanced_reservation.id = data["id"];

      return instanced_reservation;
    })

    return reservations; 
  }
}

function generate_json(user_id, book_id, rental_date, return_date, id = null){
  return {
    "id": id,
    "user_id": user_id,
    "book_id": book_id,
    "rental_date": rental_date,
    "return_date": return_date
  }
}

module.exports = Reservation