import Block from '../../lib/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { LinkProps } from './types';

class Link extends Block {
  constructor(props: Partial<LinkProps> = {} ) {
    super(
      'a',
      {
        ...props,
        className: 'my-link',
        attrs: { href: props.href ?? '' }
      });
  }
  public render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
};

export default Link;
