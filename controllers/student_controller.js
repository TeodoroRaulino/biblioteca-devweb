class StudentController {

  async administrative(req, res){
    res.render('pages/student/administrative', {
      title: "Painel do estudante", 
      baseUrl: req.baseUrl
    })
  }

  async book(req, res){
    res.render('pages/student/book/dashboard', {
      title: "Estudante - Livros", 
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new StudentController