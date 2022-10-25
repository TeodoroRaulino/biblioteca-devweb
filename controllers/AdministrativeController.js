class AdministrativeController{

  async administrative(req, res){
    res.render('pages/administrative/administrative', {title: "Painel Administrativo"})
  }
  
  async users(req, res){

    const user = [
      {
        nome: 'Teodoro Raulino Lima Neto',
        cpf: 'xxx.xxx.xxx-xx',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br',
        senha: '******',
        typeUser: 'Aluno',
      },
      {
        nome: 'Italo Viana Severo',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br'
      },
      {
        nome: 'John Vasconcelos dos Santos',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br'
      },
      {
        nome: 'Victor Ehrich Carneiro de Medeiros',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br'
      },
      {
        nome: 'Jose Marques Soares',
        identificador: 'Departamento: DETI',
        email: 'alu@alu.ufc.br'
      },
      {
        nome: 'João XYZ',
        identificador: 'CPF: 123-456-789-00',
        email: 'joaoxyz@gmail.com'
      },
      {
        nome: 'Maurício de Moura dos Santos',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br'
      },
      {
        nome: 'Vinicius Moraes Marques',
        identificador: 'Matrícula: XXXXXX',
        email: 'alu@alu.ufc.br'
      }
    ]

    res.render('pages/administrative/user/user_dashboard', {
      title: "Usuários",
      users: user
    })

  }

  async books(req, res){
    res.render('pages/administrative/book/dashboard', {title: "Livros"})
  }

}

module.exports = AdministrativeController