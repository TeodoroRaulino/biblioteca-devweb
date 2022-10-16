class navbarComponent extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <div class="navSidebar d-flex containeer justify-content-between">
        <div class=""><a href="/index.html">
          <img src="/assets/images/logo.png" id="logo">
        </a></div>
        <div>
            <a class="p-2" href="#">Home</a>
            <a class="p-2" href="#">Livros</a>
        </div>
        <div class="toggle">
          <input type="checkbox" class="switch" name="theme" id="switch"">
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
          <input type="checkbox" class="switch" name="theme" id="switch"">
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
      <li class="list-group-item registrationCard textLimit"></li>
      <li class="list-group-item emailCard textLimit"></li>
    </ul>
    </div>
    </a>
    `
  }
}

customElements.define('user-card', userCard);
customElements.define('nav-bar', navbarComponent);
customElements.define('side-bar', sidebar)
customElements.define('nav-sidebar', navSidebar)