import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import Button from '../../components/button';
import FormField from '../../components/formField';
import Link from '../../components/link';

class SignUpPage extends Block {
  constructor() {
    const emailField = new FormField({ label: 'Почта', name: 'email' });
    const loginField = new FormField({ label: 'Логин', name: 'login' });
    const firstNameField = new FormField({ label: 'Имя', name: 'first_name' });
    const secondNameField = new FormField({ label: 'Фамилия', name: 'second_name' });
    const phoneField = new FormField({ label: 'Телефон', name: 'phone', type: 'phone' });
    const passwordField = new FormField({ label: 'Пароль', name: 'password', type: 'password' });
    const repeatPasswordField = new FormField({ label: 'Повторите пароль', name: 'repeat_password', type: 'password' });
    const signUpButton = new Button({
      text: 'Регистрация',
      type: 'submit',
      events: { click: (event): void => event.preventDefault() }
    });
    const signInLink = new Link({ text: 'Вход', events: { click: (event): void => event.preventDefault() } });
    super(
      'main',
      {
        className: 'forms-page',
        emailField,
        loginField,
        firstNameField,
        secondNameField,
        phoneField,
        passwordField,
        repeatPasswordField,
        signUpButton,
        signInLink,
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SignUpPage;

