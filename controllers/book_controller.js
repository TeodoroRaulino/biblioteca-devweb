const Book = require('./../model/book');

class BookController{
  async booksJson(req,res){
    let type = req.body.type
    let books = []
    switch (type) {
      case "categoria":
        books = Book.where({category: req.body.search})
        break;
      case "titulo":
        books = Book.where({title: req.body.search})
        break;
      case "autor":
        books = Book.where({author: req.body.search})
        break;
      default:
        books = Book.all()
        break;
    }
  
    let books_jsons = books.map(book => {
      return book.json()
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(books_jsons));
  }

  async books(req, res){
    const book = Book.all()

    res.render('pages/books', {
      title: "Livros",
      books: book,
      baseUrl: req.baseUrl
    })
  }

  async administrative_books(req, res){
    const current_user = res.locals.user
    let books = Book.all()

    res.render('pages/book/dashboard', {
      title: "Livros",
      books: books,
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }

  async book(req, res){
    const current_user = res.locals.user
    let book = Book.find(req.params.id)
    
    res.render('pages/book/show',{
      book: book,
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }

  async bookNew(req, res){
    const current_user = res.locals.user

    res.render('pages/book/form',{
      baseUrl: req.baseUrl,
      book: null,
      current_user: current_user
    })
  }

  async bookCreate(req, res){
    const current_user = res.locals.user
    let params = req.body

    let book = Book.create({
      title: params.title,
      author: params.author,
      category: params.category,
      isbn: params.isbn,
      edition: params.edition,
      launch_year: params.launch_year,
      quantity: params.quantity,
      sinopse: params.sinopse
    })

    res.render('pages/book/show',{
      book: book,
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }

  async bookEdit(req, res){
    const current_user = res.locals.user
    let book = Book.find(req.params.id)

    res.render('pages/book/form',{
      baseUrl: req.baseUrl,
      book: book,
      current_user: current_user
    })
  }

  async bookUpdate(req, res){
    const current_user = res.locals.user
    let book = Book.find(req.body.id)
    let params = req.body
    
    book.update({
      title: params.title,
      author: params.author,
      category: params.category,
      isbn: params.isbn,
      edition: params.edition,
      launch_year: params.launch_year,
      quantity: params.quantity,
      sinopse: params.sinopse
    })

    res.render('pages/book/show',{
      book: book,
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }
}

module.exports = new BookController