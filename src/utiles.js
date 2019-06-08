import $ from "jquery";

export const Utils = {
  apiUrl: function() {
    if (process.env.NODE_ENV === "production") {
      return "https://ohnz26687b.execute-api.us-east-1.amazonaws.com/Prod";
    } else {
      return "http://localhost:4000";
    }
  },

  apiCall: function(url, method, data, onSuccess, onErrors) {
    console.log(data);
    $("#app__message").html("処理中...");
    $.ajax({
      url: url,
      type: method,
      data: data
    })
      .done(data => {
        const message = `<h3>Apiサーバーの読み込みに成功しました</h3>`;
        $("#app__message").html(message);
        onSuccess(data);
      })
      .fail(data => {
        const message = `<h3>Apiサーバーでエラーが発生しました</h3>`;
        $("#app__message").html(message);
        onErrors(data);
      });
  }
};
