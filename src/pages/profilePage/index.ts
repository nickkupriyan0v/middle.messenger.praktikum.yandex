import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import profileFields from '../../mock/profileFields';
import ProfileRow from '../../blocks/profileRow';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import { ROUTES } from '../../constants/routes';
import GoToChats from '../../blocks/go-to-chats';

class ProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ letter: 'H', editable: true });
    const rows = profileFields.map(item => new ProfileRow(item));
    const changeProfileLink = new Link({ text: 'Изменить профиль', events: { click: () => window.router.go(ROUTES.editProfile) } });
    const changePasswordLink = new Link({ text: 'Изменить пароль', events: { click: () => window.router.go(ROUTES.editPassword) } });
    const singOutLink = new Link({ text: 'Выйти', events: { click: () => window.router.go(ROUTES.signIn) } });
    const goToChats = new GoToChats();
    super(
      'main',
      {
        className: 'forms-page',
        avatar,
        rows,
        changeProfileLink,
        changePasswordLink,
        singOutLink,
        goToChats,
      }
    );
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ProfilePage;
