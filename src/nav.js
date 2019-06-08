export const view = {
  renderAppContainer: function() {
    return `
      <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div class="container">
          <a href="index.html" class="navbar-brand">HOME</a>
          <button
            aria-controls="navbar-content"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler"
            data-target="#navbar-content"
            data-toggle="collapse"
            type="button"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbar-content">
            <ul class="navbar-nav mr-auto">
                         <li class="nav-item dropdown">
                <a
                  aria-expanded="false"
                  aria-haspopup="true"
                  href="#"
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="navbarDropdown"
                  role="button"
                >
                  イベント
                </a>
                <div aria-labelledby="navbarDropdown" class="dropdown-menu">
                  <a href="https://hfe.connpass.com/event/132112/" id="hirofuro-vol-26" class="dropdown-item" target="_blank"
                    >広島フロントエンド勉強会 Vol.26</a
                  >
                </div>
              </li>
              <li class="nav-item"><a href="#" class="nav-link">セッション</a></li>
              <li class="nav-item"><a href="#" class="nav-link" id="survey">アンケート</a></li>
           </ul>
          </div>
        </div>
      </nav>
        `;
  },

  renderApp: function() {
    document.querySelector("#nav").innerHTML = this.renderAppContainer();
  }
};
