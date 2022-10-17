const user = [
  {
    "typeUser": "Aluno",
    "infos": [
      {
        "nome": 'Teodoro Raulino Lima Neto',
        "identificador": 'Matrícula: XXXXXX',
        "email": 'alu@alu.ufc.br'
      },
      {
        "nome": 'Italo Viana Severo',
        "identificador": 'Matrícula: XXXXXX',
        "email": 'alu@alu.ufc.br'
      },
      {
        "nome": 'John Vasconcelos dos Santos',
        "identificador": 'Matrícula: XXXXXX',
        "email": 'alu@alu.ufc.br'
      },
      {
        "nome": 'Victor Ehrich Carneiro de Medeiros',
        "identificador": 'Matrícula: XXXXXX',
        "email": 'alu@alu.ufc.br'
      },
      {
        "nome": 'Jose Marques Soares',
        "identificador": 'Departamento: DETI',
        "email": 'alu@alu.ufc.br'
      },
      {
        "nome": 'João XYZ',
        "identificador": 'CPF: 123-456-789-00',
        "email": 'joaoxyz@gmail.com'
      },
      {
        "nome": 'Maurício de Moura dos Santos',
        "identificador": 'Matrícula: XXXXXX',
        "email": 'alu@alu.ufc.br'
      },
      {
        "nome": 'Vinicius Moraes Marques',
        "identificador": 'Matrícula: XXXXXX',
        "email": 'alu@alu.ufc.br'
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