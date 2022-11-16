class ProfessorController {

  async administrative(req, res){
    res.render('pages/professor/administrative', {
      title: "Painel do professor"
    })
  }

  async book(req, res){
    res.render('pages/professor/book/index', {
      title: "Professor - Livros"
    })
  }

}

module.exports = new ProfessorController