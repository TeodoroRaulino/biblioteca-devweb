const DataAccessor = require('../services/data_accessor.js')

class Book{
  /** 
  * @param id
  * @param title
  * @param author
  * @param category
  */

  constructor(title, author, category){
    this.title = title;
    this.author = author;
    this.category = category;
  }

  save(){
    if(this.id == null){
      const data = Book.create(
        this.title,
        this.author,
        this.category
      )
      this.id = data.id
    }
    else{
      return this.update({})
    }
  }

  static create(title, author, category){
    const db = new DataAccessor('book');
    const json = generate_json(title, author, category)
    let data = db.create(json)
    let book = new Book(
      data["title"],
      data["author"],
      data["category"],
    )
    book.id = data["id"];

    return book;
  }

  update = ({title = null, author = null, category= null}) => {
    const db = new DataAccessor('book');

    if(title == null){
      title = this.title;
    }
    if(author == null){
      author = this.author;
    }
    if(category == null){
      category = this.category
    }

    const json = generate_json(title, author, category, this.id)

    let data = db.update(json);

    this.title = data["title"]
    this.author = data["author"]
    this.category = data["category"]

    return this
  }

  delete(){
    const db = new DataAccessor('book')
    db.delete(this.id)
    this.title = null;
    this.author = null;
    this.category = null;
    this.id = null;
  }

  static find(id){
    const db = new DataAccessor('book')
    let data = db.find(id);
    let book  = new Book(
      data["title"],
      data["author"],
      data["category"],
    );
    book.id = data["id"]

    return book;
  }

  static delete(id){
    const db = DataAccessor('book')
    db.delete(id)
  }

  static where = ({title = null, author = null, category = null }) => {
    const db = new DataAccessor('book')
    let books_titles_data = []
    let books_authors_data = []
    let books_categories_data = []
    let books_data = []
    let books = []

    if(title){
      books_titles_data = db.where('title', title)
    }
    if(author){
      books_authors_data = db.where('author', author)
    }
    if(category){
      books_categories_data = db.where('category', author)
    }

    books_data = books_authors_data.concat(
      books_titles_data,
      books_categories_data
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

    books = books_data.map((data)=>{
      let instanced_book =  new Book(
        data["title"],
        data["author"],
        data["category"]
      );
      instanced_book.id = data["id"];

      return instanced_book;
    })

    return books; 
  }
}

function generate_json(title, author, category, id = null) {
  return {
    "id": id,
    "title": title,
    "author": author,
    "category": category
  }
}