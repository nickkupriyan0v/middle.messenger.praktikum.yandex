import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import Link from '../../components/link';
import { ROUTES } from '../../constants/routes';

class GoToChats extends Block {
  constructor() {
    const chatsLink = new Link({
      text: 'К чатам',
      events: { click: (): void => window.router.go(ROUTES.chats) }
    });
    super('div', { className: 'go-to-chats', chatsLink });
  }

  render(): DocumentFragment {
    return this.compile(template, this.meta.props);
  }
}

export default GoToChats;
