import Handlerbars from "handlebars";

export default class App {
  constructor() {
    this.appElement = document.getElementById("app");
  }

  render() {
    const button = `<button class="button">{{text}}</button>`;
    const template = Handlerbars.compile(button);
    this.appElement.innerHTML = template({
      text: "Кнопка",
    });
  }
}
