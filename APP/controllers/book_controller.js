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
      res.status(401)
      return super.return_error(res)
    }

  }

  async index(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    try {
      const response = await axios.get(urlApi+'administrative/books',{
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })

      const data = response.data
  
      res.render('pages/book/dashboard', {
        title: "Livros",
        books: data.books,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }

  }

  async show(req, res){
    const error = req.query.error
    const id = req.params.id
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    try {
      const response = await axios.get(urlApi+'administrative/book/'+id, {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
      const data = response.data
        
      res.render('pages/book/show',{
        book: data.books,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }
  }

  async new(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    try {
      const response = await axios.get(urlApi+'administrative/book/new', {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
      if(response.status === 200){     
        res.render('pages/book/form',{
          book: null,
          current_user: current_user,
          error: error
        })
      }
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }

  }

  async create(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    let params = req.body

    
    const response = await axios.post(urlApi+'administrative/book',{
      params
    },{
      headers:{
        'Cookie': `session_token=${session_token}`
      }
    }).catch((error) => {
      res.status(401)
      return super.return_error(res)
    })

    res.render('pages/book/show',{
      book: response.data.book,
      current_user: current_user,
      error: error
    })

  }

  async edit(req, res){
    const error = req.query.error
    const id = req.params.id
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    try {
      const response = await axios.get(urlApi+'administrative/book/edit/'+id, {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
      
      const data = response.data
      if(response.status === 200){
      res.render('pages/book/form',{
        book: data.book,
        current_user: current_user,
        error: error
        })
      }
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }
  }

  async update(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    let params = req.body

    const response = await axios.post(urlApi+'administrative/book/edit',{
        params
      },{
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      }).catch((error) => {
      console.log(error.message)
    })

    const data = response.data

    res.render('pages/book/show',{
      title: "Livro",
      book: data.book,
      current_user: current_user,
      error: error
    })
    
  }
}

module.exports = new BookController