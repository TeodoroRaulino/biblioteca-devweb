const User = require('./../model/user');
const Book = require('./../model/book');

class AdministrativeController{
  
  async administrative(req, res){
    res.render('pages/administrative/administrative', {
      title: "Painel Administrativo",
      baseUrl: req.baseUrl
    })
  }
  
  async users(req, res){
    let users = User.all()
    res.render('pages/administrative/user/index', {
      title: "Usuários",
      users: users,
      baseUrl: req.baseUrl
    })
  }

  async user(req, res){
    console.log(req.params.id)
    let user = User.find(req.params.id)
    res.render('pages/administrative/user/show', {
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl
    })
  }

  async userNew(req, res) {
    res.render('pages/administrative/user/form', {
      title: "VAI TOMA NO CU PerformanceResourceTiming",
      baseUrl: req.baseUrl,
      user: null
    })
  }
  
  async userCreate(req, res){
    let params = req.body

    let user = User.create({
      name: params.name,
      cpf: params.cpf,
      identifier: params.identifier,
      email: params.email,
      password: params.password,
      type: params.type
    })

    res.render('pages/administrative/user/show', {
      title: "Novo usuário",
      baseUrl: req.baseUrl,
      user: user
    });
  }

  async userEdit(req, res) {
    let user = User.find(req.params.id)

    res.render('pages/administrative/user/form', {
      title: "Edit",
      user: user
    })
  }

  async userUpdate(req, res) {
    let user = User.find(req.body.id)
    let params = req.body
    
    user.update({
      name: params.name,
      cpf: params.cpf,
      identifier: params.identifier,
      email: params.email,
      password: params.password,
      type: params.type
    })

    res.render('pages/administrative/user/show',{
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl
    })
  }

  async books(req, res){
    let books = Book.all()
    res.render('pages/administrative/book/dashboard', {
      title: "Livros",
      books: books,
      baseUrl: req.baseUrl
    })
  }

  async book(req, res){
    let book = Book.find(req.params.id)
    res.render('pages/administrative/book/show',{
      book: book,
      baseUrl: req.baseUrl
    })
  }

  async bookNew(req, res){
    res.render('pages/administrative/book/form',{
      baseUrl: req.baseUrl,
      book: null
    })
  }

  async bookCreate(req, res){
    let params = req.body

    let book = Book.create({
      title: params.title,
      author: params.author,
      category: params.category,
      isbn: params.isbn,
      edition: params.edition,
      launch_year: params.launch_year,
      quantity: params.quantity,
      sinopse: params.sinopse
    })

    res.render('pages/administrative/book/show',{
      book: book,
      baseUrl: req.baseUrl
    })
  }

  async bookEdit(req, res){
    let book = Book.find(req.params.id)
    console.log(book)
    res.render('pages/administrative/book/form',{
      baseUrl: req.baseUrl,
      book: book
    })
  }

  async bookUpdate(req, res){
    let book = Book.find(req.body.id)
    let params = req.body
    
    book.update({
      title: params.title,
      author: params.author,
      category: params.category,
      isbn: params.isbn,
      edition: params.edition,
      launch_year: params.launch_year,
      quantity: params.quantity,
      sinopse: params.sinopse
    })

    res.render('pages/administrative/book/show',{
      book: book,
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new AdministrativeController