import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import chatItemsMock from '../../mock/chatItems';
import ChatItem from '../../blocks/chat-item';
import messageItemsMock from '../../mock/messageItems';
import MessageItem from '../../blocks/message-item';
import Button from '../../components/button';
import Input from '../../components/input';
import { NOOP_CALLBACK } from '../../constants/noop';

class ChatsPage extends Block {
  constructor() {
    const chatItems = chatItemsMock.map(item => new ChatItem(item));
    const messageItems = messageItemsMock.map(item => new MessageItem(item));
    const profileButton = new Button({ text: 'Профиль', icon: 'fa-user' });
    const attachButton = new Button({ icon: 'fa-paperclip', events: { click: NOOP_CALLBACK } });
    const messageInput = new Input({ name: 'message', placeholder: 'Введите сообщение...' });
    const sendButton = new Button({ icon: 'fa-paper-plane', type:'submit', events: { click: NOOP_CALLBACK }  });

    super(
      'div',
      {
        className: 'chats-page',
        chatItems,
        messageItems,
        profileButton,
        attachButton,
        messageInput,
        sendButton
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatsPage;
