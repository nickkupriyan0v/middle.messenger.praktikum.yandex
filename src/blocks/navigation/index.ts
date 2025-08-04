import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { INavigationProps } from './types';
import { prepareLinks } from './utils';

class Navigation extends Block {
  constructor(props: Partial<INavigationProps> = {}) {
    const links = prepareLinks(props);
    super('nav', { ...props, className: 'navigation', links });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Navigation;
