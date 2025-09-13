import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import ChatItem from '../../blocks/chat-item';
import MessageItem from '../../blocks/message-item';
import Button from '../../components/button';
import { NOOP_CALLBACK } from '../../constants/noop';
import Form from '../../blocks/form';
import { validateMessage } from '../../utils/validators';
import { ROUTES } from '../../constants/routes';
import { createChat, fetchChats } from '../../services/chats';
import withStore from '../../lib/store/utils';
import type { IAppState } from '../../lib/store/types';
import type { IChat } from '../../models/chat';
import { initWs } from '../../services/messages';
import type { IMessage } from '../../models/message';
import type { IUser } from '../../models/user';
import chatInfo from '../../blocks/chat-info';
import { normalizeTime } from '../../utils/normalize-time';
import { userName } from '../../utils/user-name';

class ChatsPage extends Block {
  sendMessage?: (message: string) => void;
  disconnect?: () => void;

  constructor() {
    const profileButton = new Button({ text: 'Профиль', icon: 'fa-user', events: { click: () => window.router.go(ROUTES.profile) } });
    const createNewChat = new Button({ text: 'Новый чат', icon: 'fa-plus', events: {
      click: () => {
        const title = prompt('Введите название чата');
        if (title) {
          createChat(title);
        }
      }
    } });
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
          const messageForm = event.currentTarget as HTMLFormElement;
          const message = new FormData(messageForm).get('message') as string;
          if (!message) {
            return;
          }
          messageForm.reset();
          this.sendMessage?.(message);
        }
      } }
    });

    super(
      'div',
      {
        className: 'chats-page',
        profileButton,
        attachButton,
        form,
        createNewChat,
      }
    );
    this.loadChats();
  }

  render() {
    const chats: IChat[] = (this.meta.props.chats ?? []) as IChat[];
    const messages: IMessage[] = (this.meta.props.messages ?? []) as IMessage[];
    const selectedChatUsers: IUser[] = (this.meta.props.selectedChatUsers ?? []) as IUser[];
    const user: IUser = (this.meta.props.user) as IUser;
    this.children['chatItems'] = chats.map(chat => new ChatItem({ chat, onClick: () => {
      this.disconnect?.();
      initWs(chat.id).then(({ sendMessage, disconnect }) => {
        this.sendMessage = sendMessage;
        this.disconnect = disconnect;
        this.children['chatInfo'] = new chatInfo();
      });
    } }));
    this.children['messageItems'] = messages.map(item => {
      return new MessageItem({ 
        ...item, 
        userName: userName(user, selectedChatUsers, item),
        time: normalizeTime(item.time),
      });
    });
    return this.compile(template, this.meta.props);
  }

  async loadChats() {
    await fetchChats();
  }

}

const mapStateToProps = ({ chats, messages, selectedChat, selectedChatUsers, user }: Partial<IAppState>) => ({ chats, messages, selectedChat, selectedChatUsers, user });

export default withStore(ChatsPage, mapStateToProps);
