import type { IFormFieldProps } from '../../components/formField/types';

export interface IFromProps {
  submitButtonText: string;
  events: Record<string, (e: Event | InputEvent) => void>;
  fields: Partial<IFormFieldProps>[]
}
