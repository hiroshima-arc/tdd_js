import { Utils } from "./utiles";

export const view = {
  renderApp: function() {
    document.querySelector("#app").innerHTML = this.renderSurvey();
    this.addEventListener();
  },

  addEventListener: function() {
    document
      .querySelector("#__form___button--send")
      .addEventListener("click", this.sendSurvey.bind(this));
  },

  renderSurvey: function() {
    return `
      <div class="container">
          <h3 class="mb-3" id="app__message">アンケート</h3>
          <form
            name="fizzBuzzForm"
            class="__form"
            method="POST"
            action="http://localhost:4000/api/survey/save"
          >
            <fieldset>
              <p class="form-group row">
                イベント名：<input
                  id="name"
                  type="text"
                  size="30"
                  name="name"
                  textinput=""
                  class="form-control"
                  value="広島フロントエンド勉強会 Vol.26"
                  readonly
                />
                <label class="col-form-label"></label>
              </p>
              <p class="form-group row">
                性別：
                <input
                  type="radio"
                  name="gender"
                  id="gender1"
                  value="男性"
                  raidoinput="3"
                /><label for="gender1">男性</label>
                <input
                  type="radio"
                  name="gender"
                  id="gender2"
                  value="女性"
                  raidoinput="3"
                /><label for="gender2">女性</label>
                <input
                  type="radio"
                  name="gender"
                  id="gender3"
                  value="その他"
                /><label for="gender3"">その他</label>
              </p>
              <p class="form-group row">
                職業：<select size="1" name="job"
                  ><option value="0"> </option
                  ><option value="学生"> 学生 </option
                  ><option value="社会人"> 社会人 </option
                  ><option value="その他"> その他 </option>
                </select>
              </p>

              <p class="form-group row">
                内容：
                <input
                  type="radio"
                  name="impression"
                  id="impression1"
                  value="良い"
                  raidoinput="3"
                /><label for="inputRadio2-1">良かった</label>
                <input
                  type="radio"
                  name="impression"
                  id="impression2"
                  value="普通"
                  raidoinput="3"
                /><label for="inputRadio2-2">普通</label>
                <input
                  type="radio"
                  name="impression"
                  id="impression3"
                  value="悪い"
                /><label for="inputRadio2-3">悪かった</label>
              </p>
              <p class="form-group row">
                きっかけ：
                <input
                  type="checkbox"
                  name="trigger"
                  id="trigger1"
                  value="SNS"
                /><label for="inputCheck1-1">SNS</label>
                <input
                  type="checkbox"
                  name="trigger"
                  id="trigger2"
                  value="検索エンジン"
                /><label for="inputCheck1-2">検索エンジン</label>
                <input
                  type="checkbox"
                  name="trigger"
                  id="trigger3"
                  value="口コミ"
                /><label for="inputCheck1-3">口コミ</label>
                <input
                  type="checkbox"
                  name="trigger"
                  id="trigger4"
                  value="その他"
                /><label for="inputCheck1-4">その他</label>
              </p>
              <p class="form-group row">
                実施されるなら参加したいイベント：<select
                  size="1"
                  name="nextevent"
                  ><option value="0"> </option
                  ><option value="PHPから始めるテスト駆動開発">
                    PHPから始めるテスト駆動開発 </option
                  ><option value="APIサービスと連携するフロントエンド開発">
                    APIサービスと連携するフロントエンド開発</option
                  ><option value="AWSから始めるフロントエンド開発">
                    AWSから始めるフロントエンド開発 </option
                  ><option value="JavaScriptから始めるオブジェクト指向">
                    JavaScriptから始めるオブジェクト指向
                  </option></select
                >
                <label class="col-form-label"></label>
              </p>
              <div>
                <p class="form-group row">
                  その他ご意見・ご要望：<textarea
                    rows="4"
                    cols="40"
                    name="message"
                    class="form-control"
                  ></textarea>
                </p>
              </div>
              <p>
                <button
                  class="btn btn-primary"
                  id="__form___button--send"
                  type="button"
                  name="buttonSubmit"
                >
                  送信
                </button>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
   `;
  },

  surveyData: () => {
    const genders = document.getElementsByName("gender");
    let gender;
    for (let i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
        gender = genders[i].value;
        break;
      }
    }

    const impressions = document.getElementsByName("impression");
    let impression;
    for (let i = 0; i < impressions.length; i++) {
      if (impressions[i].checked) {
        impression = impressions[i].value;
        break;
      }
    }

    const triggers = document.getElementsByName("trigger");
    let trigger = [];
    for (let i = 0; i < triggers.length; i++) {
      if (triggers[i].checked) {
        trigger.push(triggers[i].value);
      }
    }

    let message = document.querySelector(
      "#app > div > form > fieldset > div > p > textarea"
    ).value;

    if (message === "") message = " ";

    let job = document.querySelector(
      "#app > div > form > fieldset > p:nth-child(3) > select"
    ).value;

    let nextevent = document.querySelector(
      "#app > div > form > fieldset > p:nth-child(6) > select"
    ).value;

    return {
      name: document.querySelector("#name").value,
      gender: gender,
      job: job,
      impression: impression,
      trigger: trigger,
      nextevent: nextevent,
      message: message
    };
  },

  sendSurvey: function() {
    const apiUrl = Utils.apiUrl();

    const success = data => {
      console.log(data);
      document.querySelector(
        "#app__message"
      ).innerHTML = `<h3>アンケートを送信しました</h3>`;
    };
    const errors = data => {
      console.log(data);
    };

    Utils.apiCall(
      `${apiUrl}/api/survey/save`,
      "POST",
      this.surveyData(),
      success,
      errors
    );
  }
};
