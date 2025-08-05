import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IButtonProps } from './types';

class Button extends Block {
  constructor(props: Partial<IButtonProps> = {}) {
    super('button', {
      ...props,
      className: 'my-button',
      attrs: { type: props.type },
    });
  }
  
  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
};

export default Button;
