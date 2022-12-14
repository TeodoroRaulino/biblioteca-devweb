const { response } = require('express');
const ApplicationController = require('./application_controller');
const axios = require('axios').default

const urlApi = 'http://localhost:5000/'

class BookController extends ApplicationController{
  async booksJson(req,res){
    let params = req.body

    const response = await axios.post(urlApi+'books', {
      params
    }, {
      headers: {
        'content-Type': 'application/json'
      }
    }).catch((error) => {
      console.log(error.message)
    })
    
    res.end(JSON.stringify(response.data.books_jsons));
  }

  async books(req, res){
    try {
      const response = await axios.get(urlApi+'/books')
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

    const response = await axios.put(urlApi+'administrative/book/edit',{
        params
      },{
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      }).catch((error) => {
      console.log(error.message)
    })

    const data = params.id

    res.redirect('/administrative/book/'+data)
    return res.end()
  }

  async delete(req, res){
    const id = req.params.id
    const session_token = res.locals.session_token
    const response = await axios.delete(urlApi+ 'administrative/book/'+id,
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })
    
    res.status(204)
    res.redirect('/administrative/books')
    return res.end()
  }
}

module.exports = new BookController