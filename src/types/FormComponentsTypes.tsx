import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormResetField,
  UseFormSetError,
  Control,
  UseFieldArrayRemove,
} from 'react-hook-form';

interface FormComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  validationRules: any;
}

export interface FormFieldProps extends FormComponentProps {
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'datetime' | 'datetime-local' | 'month' | 'week' | 'color';
  defaultValue?: string;
  placeholder?: string;
}

export interface FormSelectProps extends FormComponentProps {
  options: string[];
}

export interface FormTextAreaProps extends FormComponentProps {
  rows: number;
  defaultValue: string;
  placeholder: string;
}

export interface FormFileUploadProps extends FormComponentProps {
  currentFile: string;
  accept: string;
  acceptSize: number;
  inputGuidelines: string;
  resetField: UseFormResetField<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}

export interface TableFormProps {
  name: string;
  defaultValues?: Object;
}

export interface TableFieldProps {
  item: Record<'id', string>;
  fieldArrayName: string;
  errors: FieldErrors;
  register: UseFormRegister<Record<string, string>[]>;
  removeField: UseFieldArrayRemove;
}

export interface FormButtonProps {
  text: string;
  loading?: boolean;
  disable?: boolean;
  type: 'button' | 'submit';
  icon?: FontAwesomeIconProps['icon'];
  onClick?: () => void;
}
