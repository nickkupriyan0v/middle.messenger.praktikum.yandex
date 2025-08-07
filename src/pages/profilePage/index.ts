import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import profileFields from '../../mock/profileFields';
import ProfileRow from '../../blocks/profileRow';
import Link from '../../components/link';
import Avatar from '../../components/avatar';

class ProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ letter: 'H', editable: true });
    const rows = profileFields.map(item => new ProfileRow(item));
    const changeProfileLink = new Link({ text: 'Изменить профиль', events: { click: (event) => event.preventDefault() } });
    const changePasswordLink = new Link({ text: 'Изменить пароль', events: { click: (event) => event.preventDefault() } });
    const singOutLink = new Link({ text: 'Выйти', events: { click: (event) => event.preventDefault() } });
    super(
      'main',
      {
        className: 'forms-page',
        avatar,
        rows,
        changeProfileLink,
        changePasswordLink,
        singOutLink,
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ProfilePage;
