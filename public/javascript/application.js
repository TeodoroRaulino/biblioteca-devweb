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
  bgLogin: getStyle(html, "--bgLogin")
}

const darkMode = {
  bgCard: getStyle(html, "--blue"),
  textColor: "#e5e5e5",
  white: "black",
  navColor: "#121212",
  shadow: "0px 2px 16px rgba(255, 255, 255, 0.50)",
  bgLogin: "#00304D"
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
  target.checked ? logoChange.src = '../images/logoDarkMode.png' : logoChange.src = '../images/logo.png'
})

window.onload = function(){
  if(!localStorage.getItem("mode")){
    changeColors(initialColors)
    logoChange.src = '../images/logo.png'
  }
  else if(localStorage.getItem("mode") == "lightMode"){
    changeColors(initialColors)
    logoChange.src = '../images/logo.png'
  }
  else{
    changeColors(darkMode)
    logoChange.src = '../images/logoDarkMode.png'
    checkbox.checked = true
  }
}