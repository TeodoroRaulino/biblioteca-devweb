class StudentController {

  async administrative(req, res){
    res.render('pages/student/administrative', {title: "Painel do estudante"})
  }

  async book(req, res){
    res.render('pages/student/book/dashboard', {title: "Estudante - Livros"})
  }

}

module.exports = new StudentController