class ProfessorController {

  async administrative(req, res){
    res.render('pages/professor/administrative', {title: "Painel do professor"})
  }

  async book(req, res){
    res.render('pages/professor/book/dashboard', {title: "Professor - Livros"})
  }

}

module.exports = ProfessorController