import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import FormField from '../../components/formField';
import Button from '../../components/button';
import Avatar from '../../components/avatar';

class EditPasswordPage extends Block {
  constructor() {
    const avatar = new Avatar({ letter: 'H', editable: true });
    const oldPasswordField = new FormField({ name:'oldPassword', label: 'Старый пароль', type: 'password' });
    const newPasswordField = new FormField({ name:'newPassword', label: 'Новый пароль', type: 'password' });
    const newPasswordRepeatField = new FormField({ name:'newPasswordRepeat', label: 'Повторите новый пароль', type: 'password' });
    const saveButton = new Button({ text: 'Сохранить' });

    super(
      'main',
      {
        className: 'forms-page',
        avatar,
        oldPasswordField,
        newPasswordField,
        newPasswordRepeatField,
        saveButton
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default EditPasswordPage;
