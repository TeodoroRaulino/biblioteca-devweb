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
    let user = User.find(req.params.id);

    res.render('pages/administrative/user/show', {
      title: "Usuário",
      user: user,
      baseUrl: req.baseUrl
    })
  }

  async userCreate(req, res){
    res.render('pages/administrative/user/new', {
      title: "Novo usuário",
      baseUrl: req.baseUrl
    });
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
    res.render('pages/administrative/book/view',{
      book: book,
      baseUrl: req.baseUrl
    })
  }

  async bookNew(req, res){
    res.render('pages/administrative/book/new',{
      baseUrl: req.baseUrl
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

    res.render('pages/administrative/book/view',{
      book: book,
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new AdministrativeController