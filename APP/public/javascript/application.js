const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)
const initialColors = {
  green: getStyle(html, "--green"),
  blue: getStyle(html, "--blue"),
  yellow: getStyle(html, "--yellow"),
  textColor: getStyle(html, "--textColor"),
  placeHold: getStyle(html, "--placeHold"),
  white: getStyle(html, "--white"),
  navColor: getStyle(html, "--navColor"),
  shadow: getStyle(html, "--shadow"),
  bgCard: getStyle(html, "--bgCard"),
  bgLogin: getStyle(html, "--bgLogin"),
  backgroundBody: getStyle(html, "--backgroundBody")
}

const darkMode = {
  bgCard: getStyle(html, "--blue"),
  textColor: "#e5e5e5",
  white: "black",
  navColor: "#121212",
  shadow: "0px 2px 16px rgba(255, 255, 255, 0.25)",
  bgLogin: "#00304D",
  backgroundBody: "#21262d",
  bgAdminBook: "#484f58"
}

const transformKey = key => "--" + key

const changeColors = (colors) => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  )
}

let logoChange = document.querySelector("#logo")

checkbox.addEventListener("change", ({target}) => {
  target.checked ? localStorage.setItem("mode", "darkMode") : localStorage.setItem("mode", "lightMode")
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
  target.checked ? logoChange.src = '/images/logoDarkMode.png' : logoChange.src = '/images/logo.png'
})

//

let countFont

const fonts = {
  fs16: getStyle(html, '--fs16'),
  fs20 : getStyle(html, '--fs20'),
  fs32: getStyle(html, '--fs32'),
  fs48: getStyle(html, '--fs48')
}

let increaseFont = (font) => {
  Object.keys(font).map(key =>
    html.style.setProperty(transformKey(key), (parseInt(fonts[key]) + countFont) + 'px')
  )
}

const increase = document.querySelector("#increase")
const decrease = document.querySelector("#decrease")

increase.addEventListener("click", () => {
  if(countFont < 6){
    countFont++
    increaseFont(fonts)
    localStorage.setItem("fontSize", countFont)
  }  
})

decrease.addEventListener("click", () => {
  if(countFont > -6){
    countFont--
    increaseFont(fonts)
    localStorage.setItem("fontSize", countFont)
  } 
})

//

window.onload = function(){
  if(!localStorage.getItem("mode")){
    changeColors(initialColors)
    logoChange.src = '/images/logo.png'
  }
  else if(localStorage.getItem("mode") == "lightMode"){
    changeColors(initialColors)
    logoChange.src = '/images/logo.png'
  }
  else{
    changeColors(darkMode)
    logoChange.src = '/images/logoDarkMode.png'
    checkbox.checked = true
  }

  countFont = 0

  if(!!localStorage.getItem("fontSize")){
    countFont = parseInt(localStorage.getItem("fontSize"))
    increaseFont(fonts)
  }
}

let inputSearch = document.querySelector("#inputSearch")
const btnSearch = document.querySelector("#btnSearch")
const selectValue = document.querySelector("#selectType")

if(btnSearch){
  btnSearch.addEventListener("click", () => {
    searchbook(selectValue.value, inputSearch.value)
  })
}

async function searchbook(type, search){
  let body = {"type": type, "search": search}
  let resp = await fetch('/books', {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}})
  let datas = await resp.json()

  let divBook = document.querySelector(".grid-book")
  divBook.innerHTML = ''
      
  datas.forEach( data => {
    let newDiv = document.createElement("div")
    newDiv.innerHTML = creatBookCard(data) 
    divBook.appendChild(newDiv)
  })
}

function creatBookCard(data) {
  let htmlBook = `<a href="/administrative/book/${data.id}" class="textDecorationNone">
  <div class="bookAdministrative">
    <div class="container py-3 d-flex align-items-center">
      <img src="/images/bookXGH.jpg" class="bookAdminView">
      <div class="px-3">
        <h2>${data.title}</h2>
        <p> ${data.author} | ${data.category} </p>
      </div>
    </div>
  </div>
  </a>`
  
  return htmlBook
}


const btnSearchIndex = document.querySelector("#btnSearchIndex")

if(btnSearchIndex){
  btnSearchIndex.addEventListener("click", () => {
    searchbookindex(selectValue.value, inputSearch.value)
  })
}


async function searchbookindex(type, search){
  let body = {"type": type, "search": search}
  let resp = await fetch('/books', {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}})
  let datas = await resp.json()

  let divBook = document.querySelector(".d-grid-book")
  divBook.innerHTML = ''
      
  datas.forEach( data => {
    let newDiv = document.createElement("div")
    newDiv.innerHTML = creatBookCardIndex(data) 
    divBook.appendChild(newDiv)
  })
}

function creatBookCardIndex(data) {
  let htmlBook = `
  <div class="container-book"> 
    <img src="/images/bookXGH.jpg" alt="Avatar" class="image-book"> 
    <div class="overlay d-flex-book"> 
      <p>${data.title}</p> 
      <p>${data.author}</p> 
      <p>${data.category}</p> 
    </div> 
  </div>
`
  
  return htmlBook
}

const btnSearchUser = document.querySelector("#btnSearchUser")

if(btnSearchUser){
  btnSearchUser.addEventListener("click", () => {
    searchbookuser(selectValue.value, inputSearch.value)
  })
}


async function searchbookuser(type, search){
  let body = {"type": type, "search": search}
  let resp = await fetch('/users', {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}})
  let datas = await resp.json()

  let divBook = document.querySelector(".gridUser")
  divBook.innerHTML = ''
      
  datas.forEach( data => {
    let newDiv = document.createElement("div")
    newDiv.innerHTML = creatBookCardUser(data) 
    divBook.appendChild(newDiv)
  })
}

function creatBookCardUser(data) {
  let htmlBook = `
  <a href="/administrative/user/${data.id}" class="textDecorationNone">
    <div class="card shadowCard" style="width: 18rem;">
      <img src="/images/user.png" class="card-img-top" alt="...">   
      <ul class="list-group list-group-flush">
        <h5 class="card-title list-group-item m-0 textLimit"> 
         ${data.name}
          <span class="tooltip">
          ${data.name}
          </span> 
        </h5>
        <li class="list-group-item registrationCard textLimit"> 
        ${data.identifier}
          <span class="tooltip">
          ${data.identifier}
          </span> 
        </li>
        <li class="list-group-item emailCard textLimit"> 
        ${data.email}
          <span class="tooltip">
          ${data.email}
          </span> 
        </li>
      </ul>
    </div>
  </a>
`
  
  return htmlBook
}