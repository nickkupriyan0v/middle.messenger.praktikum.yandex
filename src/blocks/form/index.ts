import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IFromProps } from './types';
import FormField from '../../components/formField';
import Button from '../../components/button';

class Form extends Block {
  constructor(props: Partial<IFromProps>) {
    const fileds = props.fields?.map(f => new FormField(f));
    const submitButton = new Button({ text: props.submitButtonText ?? 'Отправить', type: 'submit' });
    super('form', {
      ...props,
      className: 'my-form',
      fileds,
      submitButton,
    });
  }
  
  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Form;
