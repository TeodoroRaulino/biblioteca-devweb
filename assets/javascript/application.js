let password = document.querySelector("#password")
let visibility = document.querySelector("#visibility")

visibility.addEventListener("click", function(){
  if(password.type == 'password'){
    visibility.src = '/assets/images/visibility.png'
    password.type = 'text'
  }else{
    visibility.src = '/assets/images/visibility_off.png'
    password.type = 'password'
  }
})

class headerBootstrap extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-light px-5">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="./assets/images/logo.png" alt=""></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Livros</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      `
  }
}
customElements.define('header-bootstrap', headerBootstrap);