import { UseFormRegister, FieldValues, FieldErrors, UseFormResetField, UseFormSetError } from 'react-hook-form';

interface FormComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  validationRules: any;
}

export enum FormFieldEnum {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number',
  Date = 'date',
  Time = 'time',
  Datetime = 'datetime',
  Datetime_Local = 'datetime-local',
  Month = 'month',
  Week = 'week',
  Color = 'color',
}

export interface FormFieldProps extends FormComponentProps {
  type: FormFieldEnum;
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
  currentFile: any;
  accept: string;
  acceptSize: number;
  inputGuidelines: string;
  resetField: UseFormResetField<FieldValues>;
  setError: UseFormSetError<FieldValues>;

}
