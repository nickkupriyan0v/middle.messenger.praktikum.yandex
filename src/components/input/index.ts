import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IInputProps } from './types';

class Input extends Block {
  constructor(props: Partial<IInputProps> = {}) {
    super('input', {
      ...props,
      className: 'my-input',
      attrs: {
        name: props.name,
        type: props.type ??'text',
        placeholder: props.placeholder
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Input;
