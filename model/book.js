const DataAccessor = require('../services/data_accessor.js')

class Book{
  /** 
  * @param id
  * @param title
  * @param author
  * @param category
  * @param isbn
  * @param edition
  * @param launch_year
  * @param quantity
  * @param sinopse
  */

  constructor(
    title = null,
    author = null,
    category = null,
    isbn = null,
    edition = null,
    launch_year = null,
    quantity = null,
    sinopse = null
    ){
    this.title = title;
    this.author = author;
    this.category = category;
    this.isbn = isbn;
    this.edition = edition;
    this.launch_year = launch_year;
    this.quantity = quantity;
    this.sinopse = sinopse;
  }

  save(){
    if(this.id == null){
      const data = Book.create({
        title: this.title,
        author: this.author,
        category: this.category,
        isbn: this.isbn,
        edition: this.edition,
        launch_year: this.launch_year,
        quantity: this.quantity,
        sinopse: this.sinopse,
      })
      this.id = data.id
    }
    else{
      return this.update({})
    }
  }

  static create = ({
    title = null,
    author = null,
    category = null,
    isbn = null,
    edition = null,
    launch_year = null,
    quantity = null,
    sinopse = null
  }) => {
    const db = new DataAccessor('book');
    const json = generate_json(
      title,
      author,
      category,
      isbn,
      edition,
      launch_year,
      quantity,
      sinopse
    )

    let data = db.create(json)
    let book = new Book(
      data["title"],
      data["author"],
      data["category"],
      data["isbn"],
      data["edition"],
      data["launch_year"],
      data["quantity"],
      data["sinopse"]
    )
    book.id = data["id"];

    return book;
  }

  update = ({
    title = null,
    author = null,
    category = null,
    isbn = null,
    edition = null,
    launch_year = null,
    quantity = null,
    sinopse = null
  }) => {
    const db = new DataAccessor('book');

    if(title == null){
      title = this.title;
    }
    if(author == null){
      author = this.author;
    }
    if(category == null){
      category = this.category;
    }
    if(isbn == null){
      isbn = this.isbn;
    }
    if(edition == null){
      edition = this.edition;
    }
    if(launch_year == null){
      launch_year = this.launch_year;
    }
    if(quantity == null){
      quantity = this.quantity;
    }
    if(sinopse == null){
      sinopse = this.sinopse;
    }

    const json = generate_json(
      title,
      author,
      category,
      isbn,
      edition,
      launch_year,
      quantity,
      sinopse,
      this.id
    )

    let data = db.update(json);

    this.title = data["title"]
    this.author = data["author"]
    this.category = data["category"]
    this.isbn = data["isbn"]
    this.edition = data["edition"]
    this.launch_year = data["launch_year"]
    this.quantity = data["quantity"]
    this.sinopse = data["sinopse"]

    return this
  }

  delete(){
    const db = new DataAccessor('book')
    db.delete(this.id)
    this.title = null;
    this.author = null;
    this.category = null;
    this.isbn = null;
    this.edition = null;
    this.launch_year = null;
    this.quantity = null;
    this.sinopse = null;
    this.id = null;
  }

  static find(id){
    const db = new DataAccessor('book')
    let data = db.find(id);
    let book  = new Book(
      data["title"],
      data["author"],
      data["category"],
      data["isbn"],
      data["edition"],
      data["launch_year"],
      data["quantity"],
      data["sinopse"]
    );
    book.id = data["id"]

    return book;
  }

  static delete(id){
    const db = DataAccessor('book')
    db.delete(id)
  }

  static where = ({
    title = null,
    author = null,
    category = null,
    isbn = null,
    edition = null,
    launch_year = null,
    quantity = null,
    sinopse = null
  }) => {
    const db = new DataAccessor('book')
    let titles_data = []
    let authors_data = []
    let categories_data = []
    let isbn_data = []
    let edition_data = []
    let launch_year_data = []
    let quantity_data = []
    let sinopse_data = []
    let books_data = []
    let books = []

    if(title){
      titles_data = db.where('title', title)
    }
    if(author){
      authors_data = db.where('author', author)
    }
    if(category){
      categories_data = db.where('category', author)
    }
    if(isbn){
      isbn_data = db.where('isbn', isbn)
    }
    if(edition){
      edition_data = db.where('edition', edition)
    }
    if(launch_year){
      launch_year_data = db.where('launch_year', launch_year)
    }
    if(quantity){
      quantity_data = db.where('quantity', quantity)
    }
    if(sinopse){
      sinopse_data = db.where('sinopse', sinopse)
    }

    books_data = authors_data.concat(
      titles_data,
      categories_data,
      isbn_data,
      edition_data,
      launch_year_data,
      quantity_data,
      sinopse_data,
    )

    if(title){
      books_data = books_data.filter(element => element["title"].includes(title));
    }
    if(author) {
      books_data = books_data.filter(element => element["author"].includes(author));
    }
    if(category){
      books_data = books_data.filter(element => element["category"].includes(category));
    }
    if(isbn){
      books_data = books_data.filter(element => element["isbn"].includes(isbn));
    }
    if(edition){
      books_data = books_data.filter(element => element["edition"].includes(edition));
    }
    if(launch_year){
      books_data = books_data.filter(element => element["launch_year"].includes(launch_year));
    }
    if(quantity){
      books_data = books_data.filter(element => element["quantity"].includes(quantity));
    }
    if(sinopse){
      books_data = books_data.filter(element => element["sinopse"].includes(sinopse));
    }

    books_data = books_data.filter((arr, index, self) => 
       index === self.findIndex((t) => (t.id === arr.id)))

    books = books_data.map((data)=>{
      let instanced_book =  new Book(
        data["title"],
        data["author"],
        data["category"],
        data["isbn"],
        data["edition"],
        data["launch_year"],
        data["quantity"],
        data["sinopse"]
      );
      instanced_book.id = data["id"];

      return instanced_book;
    })

    return books; 
  }
}

function generate_json(
  title,
  author,
  category,
  isbn,
  edition,
  launch_year,
  quantity,
  sinopse,
  id = null
  ){
  return {
    "id": id,
    "title": title,
    "author": author,
    "category": category,
    "isbn": isbn,
    "edition": edition,
    "launch_year": launch_year,
    "quantity": quantity,
    "sinopse": sinopse
  }
}

module.exports = Book