const Book = require('../model/book')
class ProfessorController {

  async administrative(req, res){
    const current_user = res.locals.user

    res.render('pages/administrative', {
      title: "Painel do professor",
      current_user: current_user
    })
  }

  async book(req, res){
    const current_user = res.locals.user
    const book = Book.all()
    
    res.render('pages/book/dashboard', {
      title: "Professor - Livros",
      books: book,
      current_user: current_user
    })
  }

}

module.exports = new ProfessorController