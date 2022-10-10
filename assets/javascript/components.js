class headerBootstrap extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-light px-5">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="/assets/images/logo.png" alt=""></a>
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

class userCard extends HTMLElement{
  
  connectedCallback(){
    this.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="/assets/images/user.png" class="card-img-top" alt="...">   
    <ul class="list-group list-group-flush">
    <h5 class="card-title list-group-item m-0 textLimit">Teo</h5>
    <li class="list-group-item registrationCard"></li>
    <li class="list-group-item emailCard textLimit"></li>
    </ul>
    </div>
    `
  }
}

customElements.define('user-card', userCard);
customElements.define('header-bootstrap', headerBootstrap);

for(let i = 0; i < user[0].infos.length-1; i++){
  let el = document.createElement('user-card')
  rowUser.append(el)
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

