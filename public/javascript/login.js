let password = document.querySelector("#password")
let visibility = document.querySelector("#visibility")

visibility.addEventListener("click", function(){
  if(password.type === 'password'){
    visibility.src = '/images/visibility.png'
    password.type = 'text'
  }else{
    visibility.src = '/images/visibility_off.png'
    password.type = 'password'
  }
})