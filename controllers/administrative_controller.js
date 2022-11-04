class AdministrativeController{
  
  async administrative(req, res){
    res.render('pages/administrative/administrative', {
      title: "Painel Administrativo",
      baseUrl: req.baseUrl
    })
  }
  
  async users(req, res){
    
    const user = [
      {
        nome: 'Teodoro Raulino Lima Neto',
        cpf: 'xxx.xxx.xxx-xx',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Administrador'
      },
      {
        nome: 'Italo Viana Severo',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Aluno'
      },
      {
        nome: 'John Vasconcelos dos Santos',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Aluno'
      },
      {
        nome: 'Victor Ehrich Carneiro de Medeiros',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Aluno'
      },
      {
        nome: 'Jose Marques Soares',
        identificador: 'Departamento: DETI',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Aluno'
      },
      {
        nome: 'João XYZ',
        identificador: 'alow: 123-456-789-00',
        email: 'joaoxyz@gmail.com',
        senha: '******',
        typeUser: 'Funcionário'
      },
      {
        nome: 'Maurício de Moura dos Santos',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Aluno'
      }
    ]

    res.render('pages/administrative/user/index', {
      title: "Usuários",
      users: user,
      baseUrl: req.baseUrl
    })

  }

  async user(req, res){
    res.render('pages/administrative/user/show', {
      title: "Usuário",
      baseUrl: req.baseUrl
    })
  }

  async books(req, res){

    const book = [
      {
        title: "A volta ao mundo em 80 dias",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Da Terra à Lua",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Viagem ao centro da terra",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "A ilha misteriosa",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Vinte mil léguas submarinas",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "A jangada",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Dois anos de férias",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Cinco semanas em um balão",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Vinte mil léguas submarinas",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Vinte mil léguas submarinas",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      },
      {
        title: "Vinte mil léguas submarinas",
        author: 'Júlio Verne',
        category: 'SCI-FI'
      }
    ]

    res.render('pages/administrative/book/dashboard', {
      title: "Livros",
      books: book,
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new AdministrativeController