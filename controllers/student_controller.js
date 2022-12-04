const Book = require('../model/book')

class StudentController {

  async administrative(req, res){
    const current_user = res.locals.user

    res.render('pages/administrative', {
      title: "Painel do estudante", 
      baseUrl: req.baseUrl,
      current_user: current_user
    })
  }

  async book(req, res){
    const current_user = res.locals.user
    const book = Book.all()

    res.render('pages/book/index', {
      title: "Estudante - Livros", 
      baseUrl: req.baseUrl,
      books: book,
      current_user: current_user
    })
  }

}

module.exports = new StudentController