const book = [
    {
      "typeUser": "Book",
      "infos": [
        {
          "title": 'A volta ao mundo em 80 dias',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Da Terra à Lua',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Viagem ao centro da terra',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'A ilha misteriosa',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Vinte mil léguas submarinas',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'A jangada',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Dois anos de férias',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Cinco semanas em um balão',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Vinte mil léguas submarinas',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Vinte mil léguas submarinas',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        },
        {
          "title": 'Vinte mil léguas submarinas',
          "author": 'Júlio Verne',
          "category": 'SCI-FI'
        }
      ]
    }
  ]
  
  for(let i = 0; i < book[0].infos.length; i++){
    let el = document.createElement('book-card')
    rowUser.appendChild(el)
  }
  
  const listBookCard = document.querySelectorAll("book-card");

  for (let [index, uc]  of listBookCard.entries()) {
    let titleCard = document.querySelectorAll(".card-title")
    titleCard[index].innerHTML = `${book[0]['infos'][index]['title']}`

    let authorCard = document.querySelectorAll(".authorCard")
    authorCard[index].innerHTML = `${book[0]['infos'][index]['author']}`

    let categoryCard = document.querySelectorAll(".categoryCard")
    categoryCard[index].innerHTML = `${book[0]['infos'][index]['category']}`
  }