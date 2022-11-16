const Book = require('../model/book')
class ProfessorController {

  async administrative(req, res){
    res.render('pages/professor/administrative', {
      title: "Painel do professor"
    })
  }

  async book(req, res){
    const book = Book.all()
    
    res.render('pages/professor/book/index', {
      title: "Professor - Livros",
      books: book
    })
  }

}

module.exports = new ProfessorController