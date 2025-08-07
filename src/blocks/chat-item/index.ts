import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IChatItemProps } from './types';
import Avatar from '../../components/avatar';

class ChatItem extends Block {
  constructor(props: Partial<IChatItemProps>) {
    const avatar = new Avatar({ letter: 'H' });
    super('article', {
      ...props,
      className: 'chat-item',
      avatar,
    });
  }
  
  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default ChatItem;
