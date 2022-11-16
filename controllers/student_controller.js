const Book = require('../model/book')

class StudentController {

  async administrative(req, res){
    res.render('pages/student/administrative', {
      title: "Painel do estudante", 
      baseUrl: req.baseUrl
    })
  }

  async book(req, res){
    const book = Book.all()

    res.render('pages/student/book/index', {
      title: "Estudante - Livros", 
      baseUrl: req.baseUrl,
      books: book
    })
  }

}

module.exports = new StudentController