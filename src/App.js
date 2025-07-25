import Handlebars from "handlebars";
import safeVal from "./helpers/safeVal.js";

import Button from "./ui-kit/button.js";
import Input from "./ui-kit/input.js";
import Avatar from "./ui-kit/avatar.js";
import Link from "./ui-kit/link.js";

import ProfileRow from "./components/profile-row.js";
import ChatItem from "./components/chat-item.js";
import MessageItem from "./components/message-item.js";
import Navigation from "./components/navigation.js";

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
import { listenClick } from "./utils/listenClick.js";
import { renderTemplate } from "./utils/renderTemplate.js";

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
    this.headerElement = document.getElementById("header");
    this.appElement = document.getElementById("app");
  }

  render() {
    this.renderHeader();
    this.renderSignInPage();
  }

  renderHeader() {
    renderTemplate(this.headerElement, Navigation);

    listenClick("404-page", () => this.render404Page());
    listenClick("500-page", () => this.render500Page());
    listenClick("sign-up-page", () => this.renderSignUpPage());
    listenClick("sign-in-page", () => this.renderSignInPage());
    listenClick("chats-page", () => this.renderChatPage());
    listenClick("profile-page", () => this.renderProfilePage());
    listenClick("change-profile-page", () => this.renderChangeProfilePage());
    listenClick("change-password-page", () => this.renderChangePasswordPage());
  }

  renderChatPage() {
    renderTemplate(this.appElement, ChatsPage, { chatItems, messageItems });
    listenClick("profile", () => this.renderProfilePage());
  }

  render404Page() {
    renderTemplate(this.appElement, ErrorPage, {
      code: "404",
      text: "Вы вошли не в ту дверь",
    });
    listenClick("home-link", () => this.renderChatPage());
  }

  render500Page() {
    renderTemplate(this.appElement, ErrorPage, {
      code: "500",
      text: "Наташ, мы там все уронили",
    });
    listenClick("home-link", () => this.renderChatPage());
  }

  renderSignInPage() {
    renderTemplate(this.appElement, SignInPage, { title: "Вход" });

    listenClick("sign-in", () => this.renderChatPage());
    listenClick("sign-up", () => this.renderSignUpPage());
  }

  renderSignUpPage() {
    renderTemplate(this.appElement, SignUpPage, { title: "Регистрация" });

    listenClick("sign-up", () => this.renderChatPage());
    listenClick("sign-in", () => this.renderSignInPage());
  }

  renderProfilePage() {
    renderTemplate(this.appElement, ProfilePage);

    listenClick("change-password", () => this.renderChangePasswordPage());
    listenClick("change-profile", () => this.renderChangeProfilePage());
    listenClick("logout", () => this.renderSignInPage());
    listenClick("go-to-chats", () => this.renderChatPage());
  }

  renderChangePasswordPage() {
    renderTemplate(this.appElement, ChangePasswordPage);

    listenClick("save-password", () => this.renderProfilePage());
    listenClick("go-to-chats", () => this.renderChatPage());
  }

  renderChangeProfilePage() {
    renderTemplate(this.appElement, ChangeProfilePage);

    listenClick("save-profile", () => this.renderProfilePage());
    listenClick("go-to-chats", () => this.renderChatPage());
  }
}
