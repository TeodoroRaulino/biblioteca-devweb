let password = document.querySelector("#password")
let visibility = document.querySelector("#visibility")

visibility.addEventListener("click", function(){
  if(password.type === 'password'){
    visibility.src = '/assets/images/visibility.png'
    password.type = 'text'
  }else{
    visibility.src = '/assets/images/visibility_off.png'
    password.type = 'password'
  }
})