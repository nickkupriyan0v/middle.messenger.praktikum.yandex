import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import Link from '../../components/link';
import Form from '../../blocks/form';
import { validateLogin, validatePassword } from '../../utils/validators';
import type { IFormFieldProps } from '../../components/formField/types';

const SIGN_IN_FIELDS: Partial<IFormFieldProps>[] = [
  { label: 'Логин', name: 'login', validationFn: validateLogin },
  { label: 'Пароль', name: 'password', type: 'password', validationFn: validatePassword }
];

class SignInPage extends Block {
  constructor() {
    const form = new Form({
      fields: SIGN_IN_FIELDS,
      submitButtonText: 'Войти',
      events: { submit: (event) => {
        event.preventDefault();
        if (event.currentTarget) {
          console.log(Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement).entries()));
        }
      } }
    });
    const registrationLink = new Link({ text: 'Регистрация', events: { click: (event): void => event.preventDefault() } });
    super(
      'main',
      {
        className: 'forms-page',
        form,
        registrationLink
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SignInPage;

