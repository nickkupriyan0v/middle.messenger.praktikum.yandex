import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import Input from '../input';
import type { IFormFieldProps } from './types';

class FormField extends Block {
  constructor(props: Partial<IFormFieldProps> = {}) {
    const inputField = new Input({
      name: props.name,
      type: props.type,
      placeholder: props.placeholder
    });
    super('label', {
      ...props,
      className: 'input-group',
      inputField,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default FormField;
