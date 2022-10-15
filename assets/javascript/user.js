const user = [
  {
    "typeUser": "Aluno",
    "infos": [
      {
        "nome": 'Teodoro Raulino Lima Neto',
        "matricula": '429884',
        "email": 'teodororau@alu.ufc.br'
      },
      {
        "nome": 'Italo Viana Severo',
        "matricula": '434043',
        "email": 'italo_1002@live.com'
      },
      {
        "nome": 'John Vasconcelos dos Santos',
        "matricula": '414953',
        "email": 'john1998_@live.com'
      },
      {
        "nome": 'Victor Ehrich Carneiro de Medeiros',
        "matricula": '418332',
        "email": 'victormedeiro@yahoo.com.br'
      },
      {
        "nome": 'Maurício de Moura dos Santos',
        "matricula": '494752',
        "email": 'mauriciomoura837@gmail.com'
      },
      {
        "nome": 'Vinicius Moraes Marques',
        "matricula": '434045',
        "email": 'viniciusmarques@alu.ufc.br'
      },
      {
        "nome": 'Aiko Hilly Ribeiro de Paula',
        "matricula": '515015',
        "email": 'aikohilly@alu.ufc.br'
      },
      {
        "nome": 'Fábio Gabriel Esteves Ivo Gomes',
        "matricula": '510514',
        "email": 'fabiogabrieleig@gmail.com'
      },
      {
        "nome": 'Victor Emanuel Alves do Santos',
        "matricula": '417395',
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
  registrationCard[index].innerHTML = `Matrícula: ${user[0]['infos'][index]['matricula']}`
  let emailCard = document.querySelectorAll(".emailCard")
  emailCard[index].innerHTML = `E-mail: ${user[0]['infos'][index]['email']}`
}