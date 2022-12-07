const ApplicationController = require('./application_controller');
const Book = require('./../model/book');

class BookController extends ApplicationController{
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
    return res.end(JSON.stringify(books_jsons));
  }

  async index(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().index()){
      res.status(401)
      return res.end()
    }
    
    let books = Book.all()

    const data = {
     books: books
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async show(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().show()){
      res.status(401)
      return res.end()
    }

    let book = Book.find(req.params.id)
    
    const data = {
      books: book
     }
     res.status(200)
     return res.send(JSON.stringify(data))
  }

  async new(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().new()){
      res.status(401)
      return res.end()
    }
    res.status(200)
    return res.end()
  }

  async create(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().create()){
      res.status(401)
      return res.end()
    }

    let params = req.body.params

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

    let data = {
      book: book
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async edit(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().edit()){
      res.status(401)
      return res.end()
    }

    let book = Book.find(req.params.id)

    const data = {
      book: book
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }

  async update(req, res){
    const error = req.query.error
    const [current_user, policy] = super.define_user_and_policy(res)

    if(!policy.book().update()){
      res.status(401)
      return res.end()
    }

    let params = req.body.params
    let book = Book.find(params.id)
    
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

    let data = {
      book: book
    }
    res.status(200)
    return res.send(JSON.stringify(data))
  }
}

module.exports = new BookController