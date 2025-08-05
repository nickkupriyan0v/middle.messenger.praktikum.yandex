import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import Avatar from '../../components/avatar';
import type { IFormFieldProps } from '../../components/formField/types';
import { validatePassword } from '../../utils/validators';
import Form from '../../blocks/form';

const EDIT_PASSWORD_FIELDS: Partial<IFormFieldProps>[] = [
  { label: 'Старый пароль', name: 'oldPassword', type: 'password', validationFn: validatePassword },
  { label: 'Новый пароль', name: 'newPassword', type: 'password', validationFn: validatePassword },
  { label: 'Повторите новый пароль', name: 'newPasswordRepeat', type: 'password', validationFn: validatePassword },
];

class EditPasswordPage extends Block {
  constructor() {
    const avatar = new Avatar({ letter: 'H', editable: true });
    const form = new Form({
      fields: EDIT_PASSWORD_FIELDS,
      submitButtonText: 'Сохранить',
      events: { submit: (event) => {
        event.preventDefault();
        if (event.currentTarget) {
          console.log(Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement).entries()));
        }
      } }
    });

    super(
      'main',
      {
        className: 'forms-page',
        avatar,
        form
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default EditPasswordPage;
