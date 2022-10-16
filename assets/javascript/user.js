const user = [
  {
    "typeUser": "Aluno",
    "infos": [
      {
        "nome": 'Teodoro Raulino Lima Neto',
        "identificador": 'Matrícula: 429884',
        "email": 'teodororau@alu.ufc.br'
      },
      {
        "nome": 'Italo Viana Severo',
        "identificador": 'Matrícula: 434043',
        "email": 'italo_1002@live.com'
      },
      {
        "nome": 'John Vasconcelos dos Santos',
        "identificador": 'Matrícula: 414953',
        "email": 'john1998_@live.com'
      },
      {
        "nome": 'Victor Ehrich Carneiro de Medeiros',
        "identificador": 'Matrícula: 418332',
        "email": 'victormedeiro@yahoo.com.br'
      },
      {
        "nome": 'Jose Marques Soares',
        "identificador": 'Departamento: DETI',
        "email": 'marques.deti@gmail.com'
      },
      {
        "nome": 'João XYZ',
        "identificador": 'CPF: 123-456-789-00',
        "email": 'joaoxyz@gmail.com'
      },
      {
        "nome": 'Maurício de Moura dos Santos',
        "identificador": 'Matrícula: 494752',
        "email": 'mauriciomoura837@gmail.com'
      },
      {
        "nome": 'Vinicius Moraes Marques',
        "identificador": 'Matrícula: 434045',
        "email": 'viniciusmarques@alu.ufc.br'
      },
      {
        "nome": 'Aiko Hilly Ribeiro de Paula',
        "identificador": 'Matrícula: 515015',
        "email": 'aikohilly@alu.ufc.br'
      },
      {
        "nome": 'Fábio Gabriel Esteves Ivo Gomes',
        "identificador": 'Matrícula: 510514',
        "email": 'fabiogabrieleig@gmail.com'
      },
      {
        "nome": 'Victor Emanuel Alves do Santos',
        "identificador": 'Matrícula: 417395',
        "email": 'victor.eas19@gmail.com'
      }
    ]
  }
]

for(let i = 0; i < user[0].infos.length; i++){
  let el = document.createElement('user-card')
  rowUser.appendChild(el)
}

const listUseCard = document.querySelectorAll("user-card")
for (let [index, uc]  of listUseCard.entries()) {
  let nameCard = document.querySelectorAll(".card-title")
  nameCard[index].innerHTML = `${user[0]['infos'][index]['nome']}`
  let registrationCard = document.querySelectorAll(".registrationCard")
  registrationCard[index].innerHTML = `${user[0]['infos'][index]['identificador']}`
  let emailCard = document.querySelectorAll(".emailCard")
  emailCard[index].innerHTML = `E-mail: ${user[0]['infos'][index]['email']}`
}