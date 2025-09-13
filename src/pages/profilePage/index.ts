import Block from '../../lib/block';
import template from './template.hbs?raw';
import '../../styles/forms-page.scss';
import ProfileRow from '../../blocks/profileRow';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import { ROUTES } from '../../constants/routes';
import GoToChats from '../../blocks/go-to-chats';
import { logout } from '../../services/auth';
import withStore from '../../lib/store/utils';
import type { IAppState } from '../../lib/store/types';
import { PROFILE_FIELDS_MAPPING, PROFILE_FILEDS } from '../../constants/profile-fields';
import type { IUser } from '../../models/user';
import { updateAvatar } from '../../services/user';

class ProfilePage extends Block {
  constructor() {
    const changeProfileLink = new Link({ text: 'Изменить профиль', events: { click: () => window.router.go(ROUTES.editProfile) } });
    const changePasswordLink = new Link({ text: 'Изменить пароль', events: { click: () => window.router.go(ROUTES.editPassword) } });
    const singOutLink = new Link({ text: 'Выйти', events: { click: (event) => {
      event.preventDefault();
      logout();
    } } });
    const goToChats = new GoToChats();
    super(
      'main',
      {
        className: 'forms-page',
        changeProfileLink,
        changePasswordLink,
        singOutLink,
        goToChats,
      }
    );
  }

  render(): DocumentFragment {
    const { user } = this.meta.props;
    if (user) {
      this.children['rows'] = Object.values(PROFILE_FILEDS).map(field => new ProfileRow({ title: PROFILE_FIELDS_MAPPING[field], value: (user as IUser)[field] }));
      this.children['avatar']  = new Avatar({ editable: true, avatar: (user as IUser).avatar, callBack: (file: File) => updateAvatar(file) });

    }
    return this.compile(template, this.meta.props);
  }
}

const mapStateToProps = ({ user }: Partial<IAppState>) => ({ user });

export default withStore(ProfilePage, mapStateToProps);

