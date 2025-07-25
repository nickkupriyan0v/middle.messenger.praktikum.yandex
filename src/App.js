import Handlebars from "handlebars";
import safeVal from "./helpers/safeVal.js";

import Button from "./ui-kit/button.js";
import Input from "./ui-kit/input.js";
import Avatar from "./ui-kit/avatar.js";
import Link from "./ui-kit/link.js";

import ProfileRow from "./components/profile-row.js";
import ChatItem from "./components/chat-item.js";
import MessageItem from "./components/message-item.js";

import { ChatsPage } from "./pages/chatsPage/index.js";
import { ErrorPage } from "./pages/errorPage";
import { SignInPage } from "./pages/signInPage";
import { SignUpPage } from "./pages/signUpPage";
import { ProfilePage } from "./pages/profilePage";
import { ChangePasswordPage } from "./pages/changePasswordPage";
import { ChangeProfilePage } from "./pages/changeProfilePage";

import chatItems from "./mock/chatItems.js";
import messageItems from "./mock/messageItems.js";

import "./base.scss";

Handlebars.registerHelper("safeVal", safeVal);

Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("Link", Link);

Handlebars.registerPartial("ProfileRow", ProfileRow);
Handlebars.registerPartial("ChatItem", ChatItem);
Handlebars.registerPartial("MessageItem", MessageItem);
export default class App {
  constructor() {
    this.appElement = document.getElementById("app");
  }

  render() {
    this.renderSignIn();
  }

  renderChatPage() {
    const template = Handlebars.compile(ChatsPage);
    this.appElement.innerHTML = template({
      chatItems: chatItems,
      messageItems: messageItems,
    });

    const profile = document.getElementById("profile");
    profile.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderProfilePage();
    });
  }

  render404() {
    const template = Handlebars.compile(ErrorPage);
    this.appElement.innerHTML = template({
      code: "404",
      text: "Вы вошли не в ту дверь",
    });
    const homePage = document.getElementById("home-link");
    homePage.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChatPage();
    });
  }

  render500() {
    const template = Handlebars.compile(ErrorPage);
    this.appElement.innerHTML = template({
      code: "500",
      text: "Наташ, мы там все уронили",
    });
    const homePage = document.getElementById("home-link");
    homePage.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChatPage();
    });
  }

  renderSignIn() {
    const template = Handlebars.compile(SignInPage);
    this.appElement.innerHTML = template({ title: "Вход" });

    const singIn = document.getElementById("sign-in");
    singIn.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChatPage();
    });
    const singUp = document.getElementById("sign-up");
    singUp.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderSignUp();
    });
  }

  renderSignUp() {
    const template = Handlebars.compile(SignUpPage);
    this.appElement.innerHTML = template({ title: "Регистрация" });

    const singUp = document.getElementById("sign-up");
    singUp.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChatPage();
    });

    const singIn = document.getElementById("sign-in");
    singIn.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderSignIn();
    });
  }

  renderProfilePage() {
    const template = Handlebars.compile(ProfilePage);
    this.appElement.innerHTML = template();
    const changePassword = document.getElementById("change-password");
    changePassword.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChangePasswordPage();
    });

    const changeProfile = document.getElementById("change-profile");
    changeProfile.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChangeProfilePage();
    });

    const logout = document.getElementById("logout");
    logout.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderSignIn();
    });
    this.listenGoToChats();
  }

  renderChangePasswordPage() {
    const template = Handlebars.compile(ChangePasswordPage);
    this.appElement.innerHTML = template();

    const savePassword = document.getElementById("save-password");
    savePassword.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderProfilePage();
    });
    this.listenGoToChats();
  }

  renderChangeProfilePage() {
    const template = Handlebars.compile(ChangeProfilePage);
    this.appElement.innerHTML = template();

    const saveProfile = document.getElementById("save-profile");
    saveProfile.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderProfilePage();
    });
    this.listenGoToChats();
  }

  listenGoToChats() {
    const goToChats = document.getElementById("go-to-chats");
    goToChats.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderChatPage();
    });
  }
}
