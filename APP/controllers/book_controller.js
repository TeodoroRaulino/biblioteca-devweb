const { response } = require('express');
const ApplicationController = require('./application_controller');
const axios = require('axios').default

const urlApi = 'http://localhost:5000/'

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
    res.end(JSON.stringify(books_jsons));
  }

  async books(req, res){
    try {
      const response = await axios.post(urlApi+'/books')
      const data = response.books_jsons
      res.render('pages/books', {
        title: "Livros",
        books: data.books
      })
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }

  }

  async index(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)

    try {
      const response = axios.get(urlApi+'administrative/books')
      const data = response.data
  
      res.render('pages/book/dashboard', {
        title: "Livros",
        books: data.books,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }

  }

  async show(req, res){
    const error = req.query.error
    const id = req.query.id
    const current_user = super.define_user(res)

    try {
      const response = axios.get(urlApi+'administrative/book/'+id)
      const data = response.data
        
      res.render('pages/book/show',{
        book: data.books,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }
  }

  async new(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)

    try {
      const response = await axios.get(urlApi+'administrative/book/new')
      if(response.status === 200){     
        res.render('pages/book/form',{
          book: null,
          current_user: current_user,
          error: error
        })
      }
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }

  }

  async create(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)


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
      current_user: current_user,
      error: error
    })
  }

  async edit(req, res){
    const error = req.query.error
    const id = req.query.id
    const current_user = super.define_user(res)

    try {
      const response = axios.get(urlApi+'administrative/book/'+id)
      const data = response.data
      if(response.status === 200){
      res.render('pages/book/form',{
        book: data.book,
        current_user: current_user,
        error: error
        })
      }
    } catch (error) {
      res.status(response.status)
      return super.return_error(res)
    }
  }

  async update(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)

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
      current_user: current_user,
      error: error
    })
  }
}

module.exports = new BookController