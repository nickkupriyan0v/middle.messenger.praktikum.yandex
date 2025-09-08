import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IErroPageProps } from './types';
import Link from '../../components/link';
import { ROUTES } from '../../constants/routes';

class ErrorPage extends Block {
  constructor(props: Partial<IErroPageProps>) {
    const homeLink = new Link({
      text: 'На главную',
      events: { click: (): void => window.router.go(ROUTES.signIn) }
    });
    super('div', { ...props, className: 'error-page', homeLink });
  }

  render(): DocumentFragment {
    return this.compile(template, this.meta.props);
  }
}

export default ErrorPage;
