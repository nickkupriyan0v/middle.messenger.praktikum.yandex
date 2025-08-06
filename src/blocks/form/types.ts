import type { IButtonProps } from '../../components/button/types';
import type { IFormFieldProps } from '../../components/formField/types';

export interface IFromProps {
  classNames: string;
  submitButton: Partial<IButtonProps>;
  events: Record<string, (e: Event | InputEvent) => void>;
  fields: Partial<IFormFieldProps>[]
}
