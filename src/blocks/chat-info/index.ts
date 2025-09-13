import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import Button from '../../components/button';
import withStore from '../../lib/store/utils';
import type { IAppState } from '../../lib/store/types';
import { addUserToChat, deleteUserFromChat } from '../../services/chats';
import type { IUser } from '../../models/user';
import ChatUser from '../chat-user';
import type { IChat } from '../../models/chat';

class ChatInfo extends Block {
  constructor() {
    const addUserBtn = new Button({ icon: 'fa-plus', text: 'Добавить участников', events: { click: () => {
      const newUser = prompt('Добавление пользователей');
      addUserToChat(newUser as string, (this.meta.props.selectedChat as IChat).id);
    } } });

    super('aside', { className: 'chat-aside', addUserBtn });
  }

  render(): DocumentFragment {
    const selectedChatUsers: IUser[] = (this.meta.props.selectedChatUsers ?? []) as IUser[];
    const selectedChat: IChat = (this.meta.props.selectedChat) as IChat;
    this.children['users'] = selectedChatUsers.map(user => new ChatUser({ user, onDelete: (user) => deleteUserFromChat(user.id, selectedChat.id) }));
    return this.compile(template, this.meta.props);
  }
}

const mapStateToProps = ({ selectedChatUsers, selectedChat }: Partial<IAppState>) => ({ selectedChatUsers, selectedChat });

export default withStore(ChatInfo, mapStateToProps);
