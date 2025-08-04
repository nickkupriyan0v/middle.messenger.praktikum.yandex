import './base.scss';
import Navigation from './blocks/navigation';
import { ROUTES } from './constants/routes';

export default class App {
  headerElement: HTMLElement | null;
  appElement: HTMLElement | null;

  constructor() {
    this.headerElement = document.getElementById('header');
    this.appElement = document.getElementById('app');
  }

  render(): void {
    this.#renderHeader();
  }

  #renderHeader(): void {
    this.headerElement?.appendChild(new Navigation({ routes: ROUTES, outlet: this.appElement }).getElement() as Node);
  }
}
