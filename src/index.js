import "./contents.css";
import * as nav from "./nav";
import * as notice from "./notice";
import * as survey from "./survey";
import * as session from "./session";

let apiUrl = "http://localhost:4000";

if (process.env.NODE_ENV === "production") {
  document.querySelector("#dev").style.display = "none";
  apiUrl = "";
}

const setUpLink = () => {
  document
    .querySelector("#survey")
    .addEventListener("click", survey.view.renderApp.bind(survey.view));

  document
    .querySelector("#session")
    .addEventListener("click", session.view.renderApp.bind(session.view));
};

window.onload = () => {
  nav.view.renderApp();
  notice.view.renderApp();
  setUpLink();
};
