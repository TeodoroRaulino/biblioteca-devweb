var requestURL = 'data/user.json'
var request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json';
request.send();

request.onload = () => {
  
}









// const userRequire = require('/data/user')
// const fetchUser = new Request('userRequire')

// fetch(fetchUser).then( (response) => {
  
// }).catch(e => {

// })