class headerBootstrap extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-light px-5">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="/assets/images/logo.png"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Livros</a>
              </li>
            </ul>
          </div>                           
          <div class="navSidebar">
            <div class="toggle">
              <input type="checkbox" class="switch" name="theme" id="switch">
              <label for="switch" class="label">
                <i class="fas fa-moon"></i>
                <i class="fas fa-sun"></i>
                <div class="ball"></div>
              </label>
            </div>
          </div>
        </div>
      </nav>
      `
  }
}

class sidebar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    <aside class="sidebar" style="z-index:10">
      <header class="pb-2"><img src="/assets/images/logo.png" id="logo"></header>
        <ul>
          <li><a href="/administrative.html"><i class="fa-brands fa-js"></i>Dashboard</a></li>
          <li><a href="/user/user_dashboard.html"><i class="fa-solid fa-users"></i>Usuários</a></li>
          <li><a href="#"><i class="fa-solid fa-book"></i>Livros</a></li>
        </ul>
    </aside>
    `
  }
}

class navSidebar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
      <div class="navSidebar">
        <div class="toggle">
          <input type="checkbox" class="switch" name="theme" id="switch">
          <label for="switch" class="label">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
            <div class="ball"></div>
          </label>
        </div>
      </div>
    `
  }
}

class userCard extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    <a href="/user/user_view.html" class="textDecorationNone">
    <div class="card shadowCard" style="width: 18rem;">
    <img src="/assets/images/user.png" class="card-img-top" alt="...">   
    <ul class="list-group list-group-flush">
    <h5 class="card-title list-group-item m-0 textLimit"></h5>
    <li class="list-group-item registrationCard"></li>
    <li class="list-group-item emailCard textLimit"></li>
    </ul>
    </div>
    </a>
    `
  }
}

customElements.define('user-card', userCard);
customElements.define('header-bootstrap', headerBootstrap);
customElements.define('side-bar', sidebar)
customElements.define('nav-sidebar', navSidebar)