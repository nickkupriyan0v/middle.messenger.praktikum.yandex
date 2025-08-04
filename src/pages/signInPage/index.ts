import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import Button from '../../components/button';
import FormField from '../../components/formField';
import Link from '../../components/link';

class SignInPage extends Block {
  constructor() {
    const loginField = new FormField({ label: 'Логин' });
    const passwordField = new FormField({ label: 'Пароль', type: 'password' });
    const signInButton = new Button({
      text: 'Войти',
      type: 'submit',
      events: { click: (event): void => event.preventDefault() }
    });
    const registrationLink = new Link({ text: 'Регистрация', events: { click: (event): void => event.preventDefault() } });
    super(
      'main',
      {
        className: 'forms-page',
        loginField,
        passwordField,
        signInButton,
        registrationLink
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SignInPage;

