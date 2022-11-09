class ProfessorController {

  async administrative(req, res){
    res.render('pages/professor/administrative', {
      title: "Painel do professor",
      baseUrl: req.baseUrl
    })
  }

  async book(req, res){
    res.render('pages/professor/book/dashboard', {
      title: "Professor - Livros",
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new ProfessorController