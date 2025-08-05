import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IChatMessageProps } from './types';

class MessageItem extends Block {
  constructor(props: Partial<IChatMessageProps>) {
    super('div', {
      ...props,
      className: `message-item ${props.isIncoming ? 'incoming' : 'outgoing'}`,
    });
  }
  
  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default MessageItem;
