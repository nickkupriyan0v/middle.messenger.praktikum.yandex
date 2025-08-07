import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import chatItemsMock from '../../mock/chatItems';
import ChatItem from '../../blocks/chat-item';
import messageItemsMock from '../../mock/messageItems';
import MessageItem from '../../blocks/message-item';
import Button from '../../components/button';
import { NOOP_CALLBACK } from '../../constants/noop';
import Form from '../../blocks/form';
import { validateMessage } from '../../utils/validators';

class ChatsPage extends Block {
  constructor() {
    const chatItems = chatItemsMock.map(item => new ChatItem(item));
    const messageItems = messageItemsMock.map(item => new MessageItem(item));
    const profileButton = new Button({ text: 'Профиль', icon: 'fa-user' });
    const attachButton = new Button({ icon: 'fa-paperclip', events: { click: NOOP_CALLBACK } });
    const form = new Form({
      classNames: 'message-form',
      fields: [{ placeholder: 'Введите сообщение...', name: 'message', validationFn: validateMessage }],
      submitButton: { text: undefined, icon: 'fa-paper-plane' },
      events: { submit: (event) => {
        event.preventDefault();
        (form.children.fileds as Block[]).forEach(block => {
          (block.children.inputField as Block).getElement()?.blur();
        });
        if (event.currentTarget) {
          console.log(Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement).entries()));
        }
      } }
    });

    super(
      'div',
      {
        className: 'chats-page',
        chatItems,
        messageItems,
        profileButton,
        attachButton,
        form
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatsPage;
