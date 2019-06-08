export const view = {
  renderNotice: function() {
    const notice = `
      <div class="container">
          <h3 class="mb-3">お知らせ</h3>
        <div class="col-md-10">
                <dl class="row">
                <dt class="col-md-3">2019年6月8日</dt>
        <dd class="col-md-9"><a href="https://hfe.connpass.com/event/132112/" target="_blank">広島フロントエンド勉強会 Vol.26</a></dd>
                </dl>
                </div>
                </div>
        `;
    return notice;
  },

  renderApp: function() {
    document.querySelector("#app").innerHTML = this.renderNotice();
  }
};
