import Handlebars from "handlebars";
import safeVal from "./helpers/safeVal.js";

import Button from "./components/button.js";
import Input from "./components/input.js";
import Avatar from "./components/avatar.js";
import Link from "./components/link.js";

import ProfileRow from "./blocks/profile-row.js";
import ChatItem from "./blocks/chat-item.js";
import MessageItem from "./blocks/message-item.js";
import Navigation from "./blocks/navigation.js";

import { ChatsPage } from "./pages/chatsPage/index.js";
import { ErrorPage } from "./pages/errorPage/index.js";
import { SignInPage } from "./pages/signInPage/index.js";
import { SignUpPage } from "./pages/signUpPage/index.js";
import { ProfilePage } from "./pages/profilePage/index.js";
import { ChangePasswordPage } from "./pages/changePasswordPage/index.js";
import { ChangeProfilePage } from "./pages/changeProfilePage/index.js";

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
  headerElement: HTMLElement | null;
  appElement: HTMLElement | null;

  constructor() {
    this.headerElement = document.getElementById("header");
    this.appElement = document.getElementById("app");
  }

  render(): void {
    this.renderHeader();
    this.renderSignInPage();
  }

  renderHeader(): void {
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

  renderChatPage(): void {
    renderTemplate(this.appElement, ChatsPage, { chatItems, messageItems });
    listenClick("profile", () => this.renderProfilePage());
  }

  render404Page(): void {
    renderTemplate(this.appElement, ErrorPage, {
      code: "404",
      text: "Вы вошли не в ту дверь",
    });
    listenClick("home-link", () => this.renderChatPage());
  }

  render500Page(): void {
    renderTemplate(this.appElement, ErrorPage, {
      code: "500",
      text: "Наташ, мы там все уронили",
    });
    listenClick("home-link", () => this.renderChatPage());
  }

  renderSignInPage(): void {
    renderTemplate(this.appElement, SignInPage, { title: "Вход" });

    listenClick("sign-in", () => this.renderChatPage());
    listenClick("sign-up", () => this.renderSignUpPage());
  }

  renderSignUpPage(): void {
    renderTemplate(this.appElement, SignUpPage, { title: "Регистрация" });

    listenClick("sign-up", () => this.renderChatPage());
    listenClick("sign-in", () => this.renderSignInPage());
  }

  renderProfilePage(): void {
    renderTemplate(this.appElement, ProfilePage);

    listenClick("change-password", () => this.renderChangePasswordPage());
    listenClick("change-profile", () => this.renderChangeProfilePage());
    listenClick("logout", () => this.renderSignInPage());
    listenClick("go-to-chats", () => this.renderChatPage());

    this.listenAvatar();
  }

  renderChangePasswordPage(): void {
    renderTemplate(this.appElement, ChangePasswordPage);

    listenClick("save-password", () => this.renderProfilePage());
    listenClick("go-to-chats", () => this.renderChatPage());

    this.listenAvatar();
  }

  renderChangeProfilePage(): void {
    renderTemplate(this.appElement, ChangeProfilePage);

    listenClick("save-profile", () => this.renderProfilePage());
    listenClick("go-to-chats", () => this.renderChatPage());

    this.listenAvatar();
  }

  listenAvatar(): void {
    const avatarInput = document.getElementById("avatar-uploader-input");
    const avatarUploader = document.getElementById("avatar-uploader");
    if (!avatarInput || !avatarUploader) {
      return;
    }

    avatarUploader.addEventListener("click", () => {
      avatarInput.click();
    });

    avatarInput.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = ({ target }): void => {
        if (target) {
          const img = avatarUploader.querySelector("img");
          if (img) {
            img.src = target.result as string;
            img.style.display = "block";
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }
}
