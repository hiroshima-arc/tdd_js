export const view = {
  renderNotice: function() {
    const notice = `
      <div class="container">
          <h3 class="mb-3">セッション</h3>
        <div class="col-md-10">
        </div>
      </div>
        `;
    return notice;
  },

  renderApp: function() {
    document.querySelector("#app").innerHTML = this.renderNotice();
  }
};
