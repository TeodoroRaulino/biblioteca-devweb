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
  shadow: getStyle(html, "--shadow")
}

const darkMode = {
  green: "",
  blue: "",
  yellow: "",
  textColor: "#e5e5e5",
  placeHold: "",
  white: "black",
  navColor: "#121212",
  shadow: "0px 2px 16px rgba(255, 255, 255, 0.25)",
}

const transformKey = key => "--" + key

const changeColors = (colors) => {
  Object.keys(colors).map(key =>
      html.style.setProperty(transformKey(key), colors[key])
    )
}

let logoChange = document.querySelector("#logo")

checkbox.addEventListener("change", ({target}) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
  target.checked ? logoChange.src = '/assets/images/logoDarkMode.png' : logoChange.src = '/assets/images/logo.png'
}) 