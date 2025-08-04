import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import FormField from '../../components/formField';
import Button from '../../components/button';
import Avatar from '../../components/avatar';


class EditProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ letter: 'H', editable: true });
    const emailField = new FormField({ name:'email', label: 'Почта', type: 'email' });
    const loginField = new FormField({ name:'login', label: 'Логин' });
    const firstNameField = new FormField({ name:'first_name', label: 'Имя' });
    const secondNameField = new FormField({ name:'second_name', label: 'Фамилия' });
    const displayNameField = new FormField({ name:'display_name', label: 'Имя в чате' });
    const phoneField = new FormField({ name:'phone', label: 'Телефон', type: 'phone' });
    const saveButton = new Button({ text: 'Сохранить' });

    super(
      'main',
      {
        className: 'forms-page',
        avatar,
        emailField,
        loginField,
        firstNameField,
        secondNameField,
        displayNameField,
        phoneField,
        saveButton
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default EditProfilePage;
